//% color="#4B0082" icon="\uf075" block="Multiplayer Chat"
//% groups='["Chat", "Advanced"]'
namespace chat {

    let chatMessages: string[] = [];
    let onMessageReceivedHandler: (sender: number, message: string) => void = null;
    let chatEnabled = false;

    /**
     * Initialize multiplayer chat
     */
    //% block="initialize multiplayer chat"
    //% group="Chat"
    export function initializeChat() {
        chatEnabled = true;
        chatMessages = [];
        // Note: Full custom string sending is limited in core mp.
        // This extension provides UI + local handling.
        // For real syncing across players, combine with arcade-mp extension.
    }

    /**
     * Send a chat message (local for now - see note below)
     */
    //% block="send chat message %message"
    //% group="Chat"
    export function sendMessage(message: string) {
        if (!chatEnabled || !message) return;
        
        const playerId = 1; // Placeholder - improve with arcade-mp
        chatMessages.push(`P${playerId}: ${message}`);
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
     * Clear chat history
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
     * My player number (placeholder)
     */
    //% block="my player number"
    //% group="Advanced"
    export function myPlayerNumber(): number {
        return 1; // Replace with mp logic from arcade-mp extension if added
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
            text += "No messages yet...";
        }
        game.showLongText(text, DialogLayout.Bottom);
    }
}
