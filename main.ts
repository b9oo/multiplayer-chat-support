//% color="#4B0082" icon="\uf075" block="Multiplayer Chat"
//% groups='["Chat", "Advanced"]'
namespace chat {

    let chatMessages: string[] = [];
    let onMessageReceivedHandler: (sender: number, message: string) => void = null;
    let chatEnabled = false;

    /**
     * Initialize chat for multiplayer (call this early in your game, after multiplayer setup)
     */
    //% block="initialize multiplayer chat"
    //% group="Chat"
    export function initializeChat() {
        chatEnabled = true;
        chatMessages = [];
        
        multiplayer.onReceivedString(function (str: string) {
            if (!chatEnabled) return;
            
            // Format: "playerId:message text"
            const parts = str.split(":", 2);
            if (parts.length === 2) {
                const sender = parseInt(parts[0]);
                const text = parts[1];
                
                chatMessages.push(`P${sender}: ${text}`);
                if (chatMessages.length > 12) chatMessages.shift(); // Keep last 12 messages
                
                if (onMessageReceivedHandler) {
                    onMessageReceivedHandler(sender, text);
                }
            }
        });
    }

    /**
     * Send a chat message to all other players
     * @param message The text to send
     */
    //% block="send chat message %message"
    //% group="Chat"
    export function sendMessage(message: string) {
        if (!chatEnabled || !message || message.length > 100) return;
        
        const playerId = multiplayer.getPlayerNumber() || 1;
        const payload = `${playerId}:${message}`;
        
        multiplayer.sendString(payload);
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
     * Run code when any chat message is received
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
        return multiplayer.getPlayerNumber() || 1;
    }

    /**
     * Show recent chat messages on screen (basic version)
     */
    //% block="show chat messages at x %x y %y"
    //% group="Chat"
    export function showChat(x: number = 5, y: number = 5) {
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
