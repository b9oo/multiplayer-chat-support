//% importForExtension="arcade-chat" color="#4B0082"
// Test / Demo for the arcade-chat extension

// =============================================
// Multiplayer Chat Demo
// =============================================

scene.setBackgroundColor(0x000000)

chat.initializeChat()

// Example: Send message with A button
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    chat.sendMessage("Hello! 👋 I'm player " + chat.myPlayerNumber())
})

// Example: Show recent messages with B button
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    chat.showChat(10, 20)
})

// Optional: React when someone sends a message
chat.onMessageReceived(function (sender: number, message: string) {
    // You can add effects here, like sound or screen flash
    music.playTone(523, 100)
    info.changeScoreBy(1)
})

// Basic instructions
game.splash("Multiplayer Chat Test", 
    "A = Send message\n" +
    "B = Show chat\n\n" +
    "Host or join a multiplayer game first!"
)

// Keep the game running
game.onUpdateInterval(5000, function () {
    // Optional auto demo
})
