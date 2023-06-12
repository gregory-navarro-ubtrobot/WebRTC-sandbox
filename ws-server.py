import asyncio
import websockets

async def handle_websocket(websocket, path):
    # This function will handle incoming WebSocket connections and messages
    try:
        while True:
            message = await websocket.recv()
            # Process the received message
            # You can add your custom logic here
            print(f"Received message: {message}")

            # Send a response back to the client
            response = f"Server received message: {message}"
            await websocket.send(response)
            print(f"Sent response: {response}")

    except websockets.exceptions.ConnectionClosedOK:
        print("WebSocket connection closed")

# Create and run the WebSocket server
start_server = websockets.serve(handle_websocket, 'localhost', 8765)

async def run_server():
    async with start_server:
        print("WebSocket server started at ws://localhost:8765")
        await start_server.serve_forever()

# Start the event loop
asyncio.run(run_server())
