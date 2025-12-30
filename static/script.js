function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = userInput.value.trim();

    if (message === "") return;

    // 1. Add User Message to Chat
    appendMessage(message, "user-message");
    userInput.value = ""; // Clear input

    // 2. Send to Flask Backend
    fetch("/get_response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // 3. Add Bot Response to Chat
        appendMessage(data.response, "bot-message");
    })
    .catch(error => console.error("Error:", error));
}

function appendMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);

    // Auto-scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow pressing "Enter" to send
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});