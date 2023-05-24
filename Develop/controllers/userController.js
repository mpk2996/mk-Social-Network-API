const { User, Thought } = require('../models');

module.exports = {
    // GET all users at /api/users
    getUsers(req, res) {
        User.find({})
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // GET a single user  
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user found with this id.' })
                    : res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },

    // POST create a new user /api/users
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // PUT /api/users/:id
    updateUser(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id.' });
                }
                res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },

    // DELETE /api/users/:id
    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.userId)
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user found with that id.' })
                    : res.json(user)

                // Remove user's associated thoughts
                return Thought.deleteMany({ username: user.username });
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted successfully.' }))
            .catch((err) => res.status(500).json(err));
    },

    // POST /api/users/:userId/friends/:friendId
    addFriend(req, res) {
        console.log('You are adding a friend!');
        User.findByIdAndUpdate(
            req.params.userId,
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with that ID.' });
                }
                res.json({ message: 'Friend added successfully.' });
            })
            .catch((err) => res.status(500).json(err));
    },

    // DELETE /api/users/:userId/friends/:friendId
    removeFriend(req, res) {
        console.log('You are removing a friend');
        User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with that ID.' });
                }
                res.json({ message: 'Friend removed successfully.' });
            })
            .catch((err) => res.status(500).json(err));
    },
}