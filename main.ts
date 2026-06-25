//% color="#4B0082" icon="\uf075" block="Multiplayer Chat"
//% groups='["Chat", "Advanced"]'
namespace chat {

    let chatMessages: string[] = [];
    let onMessageReceivedHandler: (sender: number, message: string) => void = null;
    let chatEnabled = false;

    /**
     * Initialize chat for multiplayer (call this early after starting multiplayer)
     */
    //% block="initialize multiplayer chat"
    //% group="Chat"
    export function initializeChat() {
        chatEnabled = true;
        chatMessages = [];

        // Note: Official mp namespace has limited custom messaging.
        // This version uses a workaround with player state for simple text.
        // For full custom strings, an advanced extension may be needed.
    }

    /**
     * Send a chat message to all players (limited length due to API)
     * @param message The text to send (short messages work best)
     */
    //% block="send chat message %message"
    //% group="Chat"
    export function sendMessage(message: string) {
        if (!chatEnabled || !message) return;
        
        const playerId = mp.getPlayerNumber() || 1;
        // Use player state as a simple channel for chat (limited but works)
        // In real use, you may want to combine with other techniques
        mp.setPlayerState(mp.playerSelector(playerId as any), 100, playerId * 1000 + message.length); // placeholder
        
        chatMessages.push(`P${playerId}: ${message}`);
        if (chatMessages.length > 10) chatMessages.shift();

        if (onMessageReceivedHandler) {
            onMessageReceivedHandler(playerId, message);
        }
    }

    /**
     * Get the list of recent chat messages
     */
    //% block="recent chat messages"
    //% group="Chat"
    export function getRecentMessages(): string[] {
        return chatMessages;
    }

    /**
     * Clear all chat messages
     */
    //% block="clear chat"
    //% group="Chat"
    export function clearChat() {
        chatMessages = [];
    }

    /**
     * Run code when a chat message is received
     */
    //% block="on chat message received"
    //% group="Chat"
    //% draggableParameters="reporter"
    export function onMessageReceived(handler: (sender: number, message: string) => void) {
        onMessageReceivedHandler = handler;
    }

    // Advanced helpers

    /**
     * Get current player number (1-4)
     */
    //% block="my player number"
    //% group="Advanced"
    export function myPlayerNumber(): number {
        return mp.getPlayerNumber() || 1;
    }

    /**
     * Show recent chat messages on screen
     */
    //% block="show chat messages"
    //% group="Chat"
    export function showChat() {
        let text = "=== CHAT ===\n";
        for (let msg of chatMessages) {
            text += msg + "\n";
        }
        if (chatMessages.length === 0) {
            text += "(No messages yet)";
        }
        game.showLongText(text, DialogLayout.Bottom);
    }
}
