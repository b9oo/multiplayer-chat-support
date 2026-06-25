//% color="#4B0082" icon="\uf075" block="Multiplayer Chat"
//% groups='["Chat", "Advanced"]'
namespace chat {

    let chatMessages: string[] = [];
    let onMessageReceivedHandler: (sender: number, message: string) => void = null;
    let chatEnabled = false;

    /**
     * Initialize multiplayer chat (call this in on start)
     */
    //% block="initialize multiplayer chat"
    //% group="Chat"
    export function initializeChat() {
        chatEnabled = true;
        chatMessages = [];
    }

    /**
     * Send a chat message (currently local echo - real sync needs state tricks)
     * @param message The message to send
     */
    //% block="send chat message %message"
    //% group="Chat"
    export function sendMessage(message: string) {
        if (!chatEnabled || !message || message.length > 60) return;

        // Get current player (using mp blocks - you can replace with your player variable)
        const playerId = 1; // Default - change to your actual player number variable

        const fullMsg = `P${playerId}: ${message}`;
        chatMessages.push(fullMsg);
        if (chatMessages.length > 12) chatMessages.shift();

        if (onMessageReceivedHandler) {
            onMessageReceivedHandler(playerId, message);
        }
    }

    /**
     * Get recent chat messages
     */
    //% block="recent chat messages"
    //% group="Chat"
    export function getRecentMessages(): string[] {
        return chatMessages;
    }

    /**
     * Clear all messages
     */
    //% block="clear chat"
    //% group="Chat"
    export function clearChat() {
        chatMessages = [];
    }

    /**
     * On chat message received
     */
    //% block="on chat message received"
    //% group="Chat"
    //% draggableParameters="reporter"
    export function onMessageReceived(handler: (sender: number, message: string) => void) {
        onMessageReceivedHandler = handler;
    }

    /**
     * My player number (use your own variable or mp blocks)
     */
    //% block="my player number"
    //% group="Advanced"
    export function myPlayerNumber(): number {
        return 1; // Replace with your player number in the game
    }

    /**
     * Show chat messages on screen
     */
    //% block="show chat messages"
    //% group="Chat"
    export function showChat() {
        let text = "=== CHAT ===\n\n";
        for (let msg of chatMessages) {
            text += msg + "\n";
        }
        if (chatMessages.length === 0) {
            text += "(No messages yet)";
        }
        game.showLongText(text, DialogLayout.Bottom);
    }
}
