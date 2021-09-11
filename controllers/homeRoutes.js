const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Game, Friendship, Ownership } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// router.get('/library', withAuth, async (req, res) => {
//     try {
//         const userID = req.session.user_id;
//         const userData = await User.findAll({
//             where: {
//                 id: userID
//             },
//             order: [
//                 ['id', 'DESC'],
//             ],
//             include:
//                 [
//                     // Include their list of games
//                     {
//                         model: Game,
//                         through: { Ownership, attributes: [] },
//                         as: "owned_games",
//                     },
//                     // Include their list of friends
//                     {
//                         model: User,
//                         through: { Friendship, attributes: [] },
//                         as: "friends",
//                         //Include the games owned by the friend
//                         include: [
//                             {
//                                 model: Game,
//                                 through: { Ownership, attributes: [] },
//                                 as: "owned_games",
//                             }
//                         ]
//                     }
//                 ],
//         });
//         const user = userData.get({ plain: true });
//         res.render('library', {
//             ...user,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
//     // try {
//     //     if (req.session.logged_in) {
//     //         const userID = req.session.user_id;
//     //         const gameData = await Game.findAll({
//     //             where: {
//     //                 user_id: userID
//     //             },
//     //             order: [
//     //                 ['id', 'DESC'],
//     //             ],
//     //         });
//     //         const games = gameData.map((game) => game.get({ plain: true }));
            
//     //         res.render('library', {
//     //             games,
//     //             logged_in: req.session.logged_in
//     //         });
//     //     }
//     // } catch (err) {
//     //     console.log(err);
//     //     res.status(500).json(err);
//     // }
// })
router.get('/library/', async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {
                // id: req.session.user_id
                id:1
            },
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
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('library', {
            users,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/social', withAuth, async (req, res) => {
    try {
        res.render('social', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
})

// Profile route - Shows the selected user's profile
router.get('/profile/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
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
});

module.exports = router;