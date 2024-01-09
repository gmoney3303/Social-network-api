const names = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Emily',
  'Frank',
  // Add more names as needed
];

const thoughtTexts = [
  'This is a thought.',
  'Another thought here.',
  'Thinking about various things.',
  'Random musings.',
  'Deep thoughts.',
  // Add more thought texts
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () => getRandomArrItem(names);

// Gets a random thought text
const getRandomThoughtText = () => getRandomArrItem(thoughtTexts);

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThoughtText };