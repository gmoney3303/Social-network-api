const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data'); // Assuming you have mock user and thought data

mongoose.connect('mongodb://localhost:27017/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', async () => {
  console.log('Connected to MongoDB!');

  try {
    // Remove existing data if present
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed users
    const users = await User.create(userData);

    // Assign thoughts to users
    const thoughtsWithUsers = thoughtData.map((thought) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      thought.userId = randomUser._id;
      return thought;
    });

    // Seed thoughts
    await Thought.create(thoughtsWithUsers);

    console.log('Seeding complete! 🌱');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection after seeding
    mongoose.connection.close();
  }
});