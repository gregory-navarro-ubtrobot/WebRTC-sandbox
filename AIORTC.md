# AIORTC

## What is AIORTC?

aiortc is a Python library that provides a WebRTC implementation built on top of asyncio, Python's standard asynchronous I/O framework.  For our purposesit can be used to create a WebRTC peer connection between a browser and a Python application for the purposes of streaming video and audio or sending/recieving data.

This document will sum up the process of installing and troubleshooting aiortc, and then provide a simple example of how to use it to stream video from a Python application to a browser on a peer to peer, local network basis.

## Installation on Ubuntu Linux

Note: older distributions of Ubuntu may not have all the required dependencies.  See troubleshooting section below.

1. Install dependencies:

```apt install libavdevice-dev libavfilter-dev libopus-dev libvpx-dev pkg-config```

2. Install aiortc:

```pip3 install aiortc```

## Troubleshooting on Ubuntu Linux

Older distributions of Ubuntu may not have all the required dependencies. In particular, the required FFmpeg version may not be installed, and there are problems with certain versions of the python cryptography library.

### FFmpeg

The FFmpeg version required by aiortc is not available in the Ubuntu 18.04 repositories.  To install the required version, you can use the [Rob Savoury PPA](https://launchpad.net/~savoury1/+archive/ubuntu/ffmpeg4).  To install the PPA and the required version of FFmpeg, run the following commands:

```
sudo add-apt-repository ppa:savoury1/ffmpeg4
sudo apt-get update
sudo apt-get upgrade && sudo apt-get dist-upgrade
sudo apt-get install ffmpeg
``` 

### Python cryptography library

The cryptography library is required by aiortc, but there are problems with certain versions of the library.  If you are using Ubuntu 18.04, you will need to use a version other 39.x.x, in testing version 38.0.4 was satisfactory.  To do this, run the following commands:

```
pip uninstall -y cryptography
pip install cryptography==38.0.4
```

## Example: Streaming video from a Python application to a browser

The following example will stream video from a Python application to a browser on a peer to peer, local network basis.  The example is an extension of the [aiortc webcam example](https://github.com/aiortc/aiortc/tree/main/examples/webcam).

1. Install aiortc as described above.
2. Install additional dependency: aiohttp

```pip3 install aiohttp```    

3. Download the example code from the aiortc repository:

```
git clone https://github.com/aiortc/aiortc.git
cd aiortc/examples/webcam
```

4. Run the example:

```python3 server.py```

5. Open a browser and navigate to the following URL: `http://localhost:8080`.  The browser should display the video stream from any attached webcam.

7. Test from another host on the same network: `http://<ip address of host running server.py>:8080`. The browser should display the video stream from any a webcam on the host running server.py.