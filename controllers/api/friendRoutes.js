const router = require('express').Router();
const { User, Game, Ownership, Friendship , Request } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const friendData = await User.findAll({
            where: {
                id: req.session.user_id
            },
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

router.post('/request/', withAuth, async (req, res) => {
    try {
        const newRequest = await Request.create({
            ...req.body,
            origin_user_id: req.session.user_id,
        });

        res.status(200).json(newRequest);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
