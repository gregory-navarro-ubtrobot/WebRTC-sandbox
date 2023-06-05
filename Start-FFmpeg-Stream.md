FFmpeg is often used to setup video streams from linux devices. This document will demonstrate how to use FFMpeg to stream both pre-recorded and live video from a linux host onto a local area network.

## Installation on Ubuntu Linux

1. Install FFmpeg:

```apt install ffmpeg```

## Example: Streaming pre-recorded video from a linux device

The following example will stream pre-recorded video from a linux device to a local area network. The video file can be any format that FFmpeg supports; in this example, the video file is an mp4 file, and FFmpeg will be used to convert the video file to a format that can be streamed over the local area network, mpegts.

1. Determine which video file to use, and note the file path.  In this example, the video file is `/home/user/video.mp4`.

2. Run the following command to stream the video file to the local area network:

```
ffmpeg -re -i /home/user/video.mp4 -f mpegts udp://localhost:1234
```

3. To verify that the video is streaming, open vlc player and select `Media->Open Network Stream...` and enter the following network address: `udp://localhost:1234`. The video should begin playing.

## Example: Streaming video from a linux device webcam 

The following example will stream video from a linux device webcam to a local area network. 

1. Determine which webcam device to use.  See [Enumerate-Camera.md](Enumerate-Camera.md) for more information.

2. Run the following command to stream video from the webcam device to the local area network, note that the specified webcam device is `/dev/video0` in this example:

```
ffmpeg -i /dev/video0 -preset ultrafast -tune zerolatency -vcodec libx264 -an -f rtp rtp://<ip address>:<port>
```