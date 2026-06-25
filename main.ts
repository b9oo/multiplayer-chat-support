//% color="#4B0082" icon="\uf075" block="Multiplayer Chat"
//% groups='["Chat", "Advanced"]'
namespace chat {

    let chatMessages: string[] = [];
    let onMessageReceivedHandler: (sender: number, message: string) => void = null;
    let chatEnabled = false;

    /**
     * Initialize multiplayer chat (call this early)
     */
    //% block="initialize multiplayer chat"
    //% group="Chat"
    export function initializeChat() {
        chatEnabled = true;
        chatMessages = [];
    }

    /**
     * Send a chat message to all players
     * @param message text to send (keep it short)
     */
    //% block="send chat message %message"
    //% group="Chat"
    export function sendMessage(message: string) {
        if (!chatEnabled || !message) return;

        const playerId = mp.getPlayerNumber();  // This is the correct function
        if (playerId === 0) return; // Not in multiplayer

        // For now: local echo + you can extend with mp.setPlayerState for syncing
        const fullMsg = `P${playerId}: ${message}`;
        chatMessages.push(fullMsg);
        if (chatMessages.length > 12) chatMessages.shift();

        if (onMessageReceivedHandler) {
            onMessageReceivedHandler(playerId, message);
        }

        // TODO: Use mp.setPlayerState() with a custom state for real syncing across players
    }

    /**
     * Get list of recent messages
     */
    //% block="recent chat messages"
    //% group="Chat"
    export function getRecentMessages(): string[] {
        return chatMessages;
    }

    /**
     * Clear chat
     */
    //% block="clear chat"
    //% group="Chat"
    export function clearChat() {
        chatMessages = [];
    }

    /**
     * Run code when a message is received
     */
    //% block="on chat message received"
    //% group="Chat"
    //% draggableParameters="reporter"
    export function onMessageReceived(handler: (sender: number, message: string) => void) {
        onMessageReceivedHandler = handler;
    }

    /**
     * My player number (1-4)
     */
    //% block="my player number"
    //% group="Advanced"
    export function myPlayerNumber(): number {
        return mp.getPlayerNumber();
    }

    /**
     * Show chat on screen
     */
    //% block="show chat messages"
    //% group="Chat"
    export function showChat() {
        let text = "=== MULTIPLAYER CHAT ===\n\n";
        for (let msg of chatMessages) {
            text += msg + "\n";
        }
        if (chatMessages.length === 0) {
            text += "(No messages yet)";
        }
        game.showLongText(text, DialogLayout.Bottom);
    }
}
