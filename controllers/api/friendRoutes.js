const router = require('express').Router();
const { User, Game, Ownership, Friendship } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const friendData = await User.findAll({
            include:
                [
                    {
                        model: User,
                        through: { Friendship, attributes: [] },
                        as: "friends",
                        //Include the games owned by the friend
                        include: [
                            {
                                model: Game,
                                through: { Ownership, attributes: [] },
                                as: "owned_games",
                            }
                        ]
                    }
                ],
        });
        res.status(200).json(friendData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
