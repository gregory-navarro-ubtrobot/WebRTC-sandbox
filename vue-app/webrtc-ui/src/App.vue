<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div > 
        <!-- TODO: add conditional rendering for outer div -->
        <!-- A "Start Video Feed" button which calls the start() function -->
        <button @click="toggleVideo">{{ videoButtonText }}</button>
        <!-- HTML5 video element for viewing streaming video from robot -->
        <!-- TODO make video player autoplay and remove controls -->
        <video id="video" v-if="showVideo" autoplay="true" playsinline="true"></video>
      </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import { initializePeerConnection } from "@/libraries/webrtc";
import { initializePeerConnection, handleNewICECandidateMsg } from "@/libraries/webrtc";


async function handleVideoAnswerMessage(peerConnection, message) {
    console.log("about to set description")
    // const desc = new RTCSessionDescription(message.sdp)
    console.log("about to set remote description")
    await peerConnection.setRemoteDescription(message).catch((e) => alert(e)) // TODO add error catch
    console.log("remote description set")
}

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      showVideo: false,
      videoButtonText: 'Start Video Feed'
    }
  },
  methods: {
    toggleVideo() {
      this.showVideo = !this.showVideo
      this.videoButtonText = this.showVideo ? 'Stop Video Feed' : 'Start Video Feed'
      if (this.showVideo) {
        this.start()
      } else {
        this.stop()
      }
    },
    start() {
      console.log('start')
      // const video = document.getElementById('video')
      console.log("Opening websocket connection");
      const controlChannel = new WebSocket("ws://192.168.174.163:8765");
      // create a new RTCPeerConnection
      const peerConnection = initializePeerConnection()
      peerConnection.addEventListener('track', function(evt) {
        console.log("track received")
        if (evt.track.kind == 'video') {
            document.getElementById('video').srcObject = evt.streams[0];
        } 
      })

      // set up onmessage handler for the websocket
      console.log("Setting up onmessage handlers")
      controlChannel.onmessage = async function(evt) {
        const message = JSON.parse(evt.data)
        console.log(`Received message: ${message}`)

        switch(message.type) {
          case "answer": // Callee has answered our offer
            console.log("answer logic!!!")
            console.log(message.answer)
            handleVideoAnswerMessage(peerConnection, message.answer)
            break;
          case "new-ice-candidate": // A new ICE candidate has been received
            console.log("TODO: handle new ice candidate logic!!!")
            handleNewICECandidateMsg(peerConnection, message)
            break;
          case "end": // Callee has ended call
            console.log("TODO: handle call end")
            peerConnection.close()
            break;
          default:
            console.log(`Unknown WS message received: ${message}`)
        }
      }
      // Now that we are prepared to handle incoming websocket messages, initiate connection
      console.log("Initiating connection")
      peerConnection.createOffer().then(function (offer) {
        return peerConnection.setLocalDescription(offer)
      }).then(function() {
        // wait for ICE gathering to complete
        return new Promise(function(resolve) {
            if (peerConnection.iceGatheringState === 'complete') {
                resolve();
            } else {
                var checkState = function() {
                    if (peerConnection.iceGatheringState === 'complete') {
                        peerConnection.removeEventListener('icegatheringstatechange', checkState);
                        resolve();
                    }
                }
                peerConnection.addEventListener('icegatheringstatechange', checkState);
            }
        });
      }).then(function () {
        console.log("Sending websocket offer")
        var offer = peerConnection.localDescription
        controlChannel.send(JSON.stringify({
          sdp: offer.sdp,
          type: offer.type
        }))
        console.log("Webrtc offer sent")
      }).catch(function (e) { alert(e) })
  
    },
    stop() {
      console.log('stop')
      // const video = document.getElementById('video')
      // video.srcObject.getTracks().forEach((track) => {
      //   track.stop()
      // })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
