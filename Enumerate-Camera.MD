# How to enumerate all cameras on a linux system

When streaming video from a peripheral camera, it is important to know the device name of the camera, especially on systems with multiple cameras.  The following methods can be used to enumerate all cameras on a linux system.

# ## Method 1: ls /dev/video*

The ls command can be used to list all video devices on a linux system.  To list all video devices on the system, run the following command:

 ```
 ls /dev/video*
 ```

Any cameras should have a name such as `/dev/video0`.

# ## Method 1: v4l2-ctl

The v4l2-ctl command line tool can be used to list all cameras on a linux system.  To install v4l2-ctl and list all cameras on the system, run the following commands:

 ```
 sudo apt install v4l-utils
 v4l2-ctl --list-devices
 ```

Any cameras should have a name such as `/dev/video0`.

# ## Method 3: lsusb

If methods 1 & 2 fail, listing all usb devices on the system may help identify the camera.

The lsusb command line tool can be used to list all usb devices on a linux system.  To list all usb devices on the system, run the following command:

 ```
 lsusb
 ```

Any cameras should have a name such as `Bus 001 Device 004: ID 046d:0825 Logitech, Inc. Webcam C270`.
