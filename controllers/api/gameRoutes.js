const router = require('express').Router();
const { Game, User, Ownership } = require('../../models');
const withAuth = require('../../utils/auth');

// Insomnia Testing: Get all games of the logged in user
router.get('/', withAuth, async (req, res) => {
    try {
        const userID = req.session.user_id;
        const userData = await User.findAll({
            where: {
                id: userID
            },
            order: [
                ['id', 'DESC'],
            ],
            include:
                [
                    // Include their list of games
                    {
                        model: Game,
                        through: { Ownership, attributes: [] },
                        as: "owned_games",
                    },

                    // Include their list of friends
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
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Adding a new game to the logged in user's library
router.post('/', async (req, res) => {
    try {
        // Create the game
        const gameData = await Game.create({
            ...req.body,
        });

        // Create the ownership between new game and logged in user
        const ownerData = await Ownership.create({
            game_id: gameData.id, 
            user_id: req.session.user_id,
          });

        res.status(200).json(ownerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;