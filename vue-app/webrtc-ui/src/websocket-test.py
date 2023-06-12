#!/usr/bin/env python

import asyncio
from websockets.sync.client import connect

def hello():
    with connect("ws://192.168.174.163:8765") as websocket:
        websocket.send("Hello world!")
        message = websocket.recv()
        print(f"Received: {message}")

hello()