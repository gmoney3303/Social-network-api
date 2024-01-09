const { Thought, User } = require('../models'); // Import the Thought and User models

const thoughtsController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;

      // Create the thought
      const thought = await Thought.create({ thoughtText, username });

      // Push the created thought's _id to the associated user's thoughts array field
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.thoughts.push(thought._id);
      await user.save();

      res.status(201).json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { thoughtText } = req.body;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;

      const deletedThought = await Thought.findByIdAndDelete(thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Remove the thought from associated users
      await User.updateMany({}, { $pull: { thoughts: thoughtId } });

      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtsController;