// export async function handleVideoAnswerMessage(peerConnection, message) {
//     const desc = new RTCSessionDescription(message.sdp)
//     console.log("about to set remote description")
//     await peerConnection.setRemoteDescription(desc).catch((e) => alert(e)) // TODO add error catch
//     console.log("remote description set")
//   }

export async function handleNewICECandidateMsg(peerConnection, msg) {
  var candidate = new RTCIceCandidate(msg.candidate);

  console.log(
    "*** Adding received ICE candidate: " + JSON.stringify(candidate)
  );
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (err) {
    console.log(err);
  }
}

export function initializePeerConnection() {
  console.log("initing peer connection");
  const peerConnection = new RTCPeerConnection({
    sdpSemantics: "unified-plan",
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });
  peerConnection.addTransceiver("video", { direction: "recvonly" });
  peerConnection.addTransceiver("audio", { direction: "recvonly" });
  peerConnection.addEventListener("track", function (evt) {
    if (evt.track.kind == "video") {
      document.getElementById("video").srcObject = evt.streams[0];
    }
  });
  return peerConnection;
}
