const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts   /api/thought
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // GET a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findByIdAndUpdate(
                    req.body.userId,
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id.' });
                }
                res.json({ message: 'Thought created successfully.' });
            })
            .catch((err) => {
                res.status(500).json(err);
                console.log(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        const { thoughtText } = req.body
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    addReaction(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => {
                const newReaction = new Reaction({
                    reactionText: req.body.reactionText,
                    username: req.body.username,
                });

                thought.reactions.push(newReaction);

                return thought.save();
            })
            .then((thought) => {
                res.json(thought);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    removeReaction(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with that ID' })
                } else {
                    for (i = 0; i < thought.reactions.length; i++) {
                        if (thought.reactions[i]._id == req.params.reactionId) {
                            thought.reactions.splice(i, 1)
                        }
                        thought.save()
                            .then(updatedThought => {
                                res.status(200).json(updatedThought)
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    }
                }
            })
            .catch((err) => res.status(500).json(err))
    },
}