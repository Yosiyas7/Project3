// Import the v4 function from the 'uuid' package
const uuidv4 = require('uuid/v4');

// Function to create a user object
const createUser = ({ name = "", socketId = null } = {}) => (
  {
    id: uuidv4(),  // Generate a unique ID using uuidv4
    name,         // Assign the provided name to the user object
    socketId      // Assign the provided socketId to the user object
  }
);

// Function to create a message object
const createMessage = ({ message = "", sender = "" } = {}) => (
  {
    id: uuidv4(),                         // Generate a unique ID using uuidv4
    time: getTime(new Date(Date.now())),  // Get the formatted time using the getTime function
    message,                              // Assign the provided message to the message object
    sender                                // Assign the provided sender to the message object
  }
);

// Function to create a chat object
const createChat = ({ messages = [], name = "Community", users = [] } = {}) => (
  {
    id: uuidv4(),       // Generate a unique ID using uuidv4
    name,              // Assign the provided name to the chat object
    messages,          // Assign the provided messages to the chat object
    users,             // Assign the provided users to the chat object
    typingUsers: []     // Initialize the typingUsers array as an empty array
  }
);

// Function to get the formatted time
const getTime = (date) => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
}

// Export the functions as a module
module.exports = {
  createMessage,
  createChat,
  createUser
};
