let currentMessageIndex = 0;
let currentConversationIndex = 0;
let ping = new Audio('ping.wav');
let dc = new Audio('dc.wav');

const userMessages = [
  "hey teacher!",
  "i know that the deadline for the final project is in an hour, but can i get an extension for next week?",
  "but my dog ate my homework!",
  "i'm not lying! i swear!",
  "okay! ill come clean. i didn't do the project because i was too busy playing fortnite.",
  "i'm sorry! i'll be on time next time! i promise!"
];

const botMessages = [
  "Hello, how can I help you?",
  "I'm sorry, but the deadline is in an hour. You can't get an extension.",
  "this is a coding project....?",
  "your dog ate your laptop? really? even i could come up with a better excuse than that!",
  "manage your time better!",
  "i hope you will."
];

const userInputField = document.getElementById("user-input");
let lastKeyPressed = "";
let keyPressCount = 0;

window.onload = function() {
  document.getElementById("user-input").value = "";
};


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
      
      displayMessage("Teacher: " + botMessages[currentConversationIndex]);

     ping.play();
    
      currentConversationIndex++;
      console.log(currentConversationIndex);

      if (currentConversationIndex >= userMessages.length) {
        // Disable input field once the conversation ends       
        userInputField.disabled = true;
        dc.play();
        
        
        // Change input field text
        userInputField.value = "Ding Dong! The chat is closed";
        
        document.getElementById("send-btn").remove(); // Remove send button
        // Change chat-banner style and text
        var chatBanner = document.getElementsByClassName("chat-banner")[0];
        chatBanner.style.backgroundColor = "red"; // Change banner background to red
        chatBanner.textContent = "session closed"; // Change banner text to "Blocked"
      }
    }, 1200); // Corrected timeout duration
    currentMessageIndex = 0;
    userInputField.value = "";
    lastKeyPressed = "";
    keyPressCount = 0;
  }
}


function displayMessage(message) {
  var chatBox = document.getElementById("chat-box");
  var newMessage = document.createElement("div");

  if (message.startsWith("You: ")) {
      newMessage.className = "user-message";
  } else if (message.startsWith("Teacher: ")) {
      newMessage.className = "bot-message";
  }

  newMessage.textContent = message;
  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

