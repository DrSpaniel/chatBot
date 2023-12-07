let currentMessageIndex = 0;
let currentConversationIndex = 0;
const userMessages = [
  "hello! how r u?",
  "how's the family?",
  "did you get my email?",
];
const botMessages = ["great!", "they're alright.", "nope."];

const userInputField = document.getElementById("user-input");
let lastKeyPressed = "";
let keyPressCount = 0;

userInputField.addEventListener("keydown", function (e) {
  if (currentConversationIndex >= userMessages.length) {
    // Prevent further typing once the conversation ends
    e.preventDefault();
    return;
  }

  if (e.key === "Backspace" && currentMessageIndex > 0) {
    // Allow user to delete characters
    currentMessageIndex--;
    this.value = userMessages[currentConversationIndex].substring(
      0,
      currentMessageIndex
    );
    e.preventDefault();
  } else if (e.key !== "Enter") {
    // Check if the same key is being pressed repeatedly
    if (lastKeyPressed === e.key) {
      keyPressCount++;
    } else {
      lastKeyPressed = e.key;
      keyPressCount = 1;
    }

    // Add next character from the user message if the same key hasn't been pressed 4 times in a row
    if (
      currentMessageIndex < userMessages[currentConversationIndex].length &&
      keyPressCount < 4
    ) {
      this.value = userMessages[currentConversationIndex].substring(
        0,
        currentMessageIndex + 1
      );
      currentMessageIndex++;
    }
    e.preventDefault(); // Prevents any other typing
  }
});

document.getElementById("send-btn").addEventListener("click", function () {
  if (currentMessageIndex === userMessages[currentConversationIndex].length) {
    sendMessage();
  }
});

userInputField.addEventListener("keypress", function (e) {
  if (
    e.key === "Enter" &&
    currentMessageIndex === userMessages[currentConversationIndex].length
  ) {
    sendMessage();
  }
});

function sendMessage() {
  var userInput = userInputField.value;
  if (userInput) {
    displayMessage("You: " + userInput);
    setTimeout(function () {
      displayMessage("Bot: " + botMessages[currentConversationIndex]);
      currentConversationIndex++;

      if (currentConversationIndex >= botMessages.length) {
        // Remove the send button, and change the HTML of the input field to "you cannot send a message"
        document.getElementById("send-btn").remove();
        userInputField.placeholder = "You cannot send a message.";
        //change the chat banner to red, and say "blocked by: Bot"
       // document.getElementById("chat-banner").style.backgroundColor = "red";

        // Disable input field
        userInputField.disabled = true;
      }
    }, 500);
    currentMessageIndex = 0;
    userInputField.value = "";
    lastKeyPressed = "";
    keyPressCount = 0;
  }
}

function displayMessage(message) {
  var chatBox = document.getElementById("chat-box");
  var newMessage = document.createElement("div");
  newMessage.textContent = message;
  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}
