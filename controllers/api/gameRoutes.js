const router = require('express').Router();
const { Game, User, Ownership } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all games of the logged in user
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
        const user = userData.get({ plain: true });
        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
    // try {
    //     if (req.session.logged_in) {
    //         const userID = req.session.user_id;
    //         const gameData = await Game.findAll({
    //             where: {
    //                 user_id: userID
    //             },
    //             order: [
    //                 ['id', 'DESC'],
    //             ],
    //         });
    //         const games = gameData.map((game) => game.get({ plain: true }));
    //         res.render('library', {
    //             games,
    //             logged_in: req.session.logged_in
    //         });
    //     }
    //     else {
    //         res.render('login');
    //     }
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json(err);
    // }
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