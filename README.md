
3. **Send Messages**  
   Use `send chat message "Hello everyone!"` (e.g. on button A press).

4. **Display Messages**  
   - Use `recent chat messages` to get the list  
   - Or call `show chat messages` for a quick popup

5. **React to Messages**  
   Use the `on chat message received` event.

## Example

```typescript
// In on start
chat.initializeChat()

// Send message on button press
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    chat.sendMessage("Hello from player " + chat.myPlayerNumber())
})

// Show chat
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    chat.showChat()
})
```

## Requirements
- MakeCode Arcade project with online multiplayer enabled

## Publishing
This extension is ready to publish. Just commit to GitHub and share the repo URL.

Made with ❤️ for the MakeCode community.
