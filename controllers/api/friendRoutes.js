const router = require('express').Router();
const { User, Game, Ownership, Friendship , Request } = require('../../models');
const withAuth = require('../../utils/auth');

// Remove a friend (both friendships)
router.delete('/:id', async (req, res) => {
    try {
        const friendData = await Friendship.destroy({
            where: {
                user_id: req.session.user_id,
                friend_id: req.params.id,
            },
        });

        res.status(200).json(friendData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
