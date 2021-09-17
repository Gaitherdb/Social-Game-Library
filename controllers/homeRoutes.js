const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Game, Friendship, Ownership, Request } = require('../models');
const { request } = require('express');

router.get('/', async (req, res) => {
    try {
        // If the user is already logged in, get all info about them
        if (req.session.logged_in) {

            // Get all the info about them for the friendslist
            const userData = await User.findAll({
                where: {
                    id: req.session.user_id
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

            // Check how many requests they have waiting for them
            const requestData = await Request.findAll({
                where: {
                    destination_user_id: req.session.user_id,
                },
            })

            const requests = requestData.map((request) => request.get({ plain: true }));

            let user_ids = [];

            requests.map((request) => user_ids.push(request.origin_user_id))

            const senderData = await User.findAll({
                where: {
                    id: user_ids
                }
            })

            const senders = senderData.map((user) => user.get({ plain: true }));

            res.render('homepage', {
                senders, // For the notification badge
                users,  // Populates friendslist
                logged_in: req.session.logged_in    // Log in status
            });

            // If they aren't logged in, they don't need all that info
        } else {
            res.render('homepage');
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//Renders library parameter with the logged in user's catalog of game entries- sorted by descending game id order
router.get('/library/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
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
                        ],
                    }
                ],
            order: [['owned_games', 'id', 'desc']]

        });
        const users = userData.map((user) => user.get({ plain: true }));

        // Check how many requests they have waiting for them
        const requestData = await Request.findAll({
            where: {
                destination_user_id: req.session.user_id,
            },
        })

        const requests = requestData.map((request) => request.get({ plain: true }));

        let user_ids = [];

        requests.map((request) => user_ids.push(request.origin_user_id))

        const senderData = await User.findAll({
            where: {
                id: user_ids
            }
        })

        const senders = senderData.map((user) => user.get({ plain: true }));

        res.render('library', {
            users,
            senders,
            logged_in: req.session.logged_in,
            f_none: "text-light bg-primary"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//filter the games library by currently_playing
router.get('/library/currently_playing', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
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
            order: [['owned_games', 'currently_playing', 'desc']]
        });
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('library', {
            users,
            logged_in: req.session.logged_in,
            f_current: "text-light bg-primary"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//filter the games library by beaten
router.get('/library/beaten', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
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
            order: [['owned_games', 'beaten', 'desc']]
        });
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('library', {
            users,
            logged_in: req.session.logged_in,
            f_beaten: "text-light bg-primary"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//filter the games library by Platform
router.get('/library/platform', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
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
            order: [['owned_games', 'platform', 'asc']]
        });
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('library', {
            users,
            logged_in: req.session.logged_in,
            f_plat: "text-light bg-primary"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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

// Profile route - Shows the selected user's profile - filtered newest to oldest
router.get('/profile/:id', async (req, res) => {
    try {
        // Get all the info about the logged in user for the friendslist
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
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

        const friendData = await User.findByPk(req.params.id, {
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
                order: [['owned_games', 'id', 'desc']]
        });

        const friend = friendData.get({ plain: true });

        // Check how many requests they have waiting for them
        const requestData = await Request.findAll({
            where: {
                destination_user_id: req.session.user_id,
            },
        })

        const requests = requestData.map((request) => request.get({ plain: true }));

        let user_ids = [];

        requests.map((request) => user_ids.push(request.origin_user_id))

        const senderData = await User.findAll({
            where: {
                id: user_ids
            }
        })

        const senders = senderData.map((user) => user.get({ plain: true }));

        res.render('profile', {
            senders,
            users,
            ...friend,
            logged_in: req.session.logged_in,
            f_none: "text-light bg-primary"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Shows the selected user's profile - filtered by currently_playing 
router.get('/profile/:id/currently_playing', async (req, res) => {
    try {
        // Get all the info about the logged in user for the friendslist
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
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

        const friendData = await User.findByPk(req.params.id, {
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
                order: [['owned_games', 'currently_playing', 'desc']]
        });

        const friend = friendData.get({ plain: true });

        // Check how many requests they have waiting for them
        const requestData = await Request.findAll({
            where: {
                destination_user_id: req.session.user_id,
            },
        })

        const requests = requestData.map((request) => request.get({ plain: true }));

        let user_ids = [];

        requests.map((request) => user_ids.push(request.origin_user_id))

        const senderData = await User.findAll({
            where: {
                id: user_ids
            }
        })

        const senders = senderData.map((user) => user.get({ plain: true }));

        res.render('profile', {
            senders,
            users,
            ...friend,
            logged_in: req.session.logged_in,
            f_current: "text-light bg-primary"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Shows the selected user's profile - filtered by games beaten
router.get('/profile/:id/beaten', async (req, res) => {
    try {
        // Get all the info about the logged in user for the friendslist
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
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

        const friendData = await User.findByPk(req.params.id, {
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
                order: [['owned_games', 'beaten', 'desc']]
        });

        const friend = friendData.get({ plain: true });

        // Check how many requests they have waiting for them
        const requestData = await Request.findAll({
            where: {
                destination_user_id: req.session.user_id,
            },
        })

        const requests = requestData.map((request) => request.get({ plain: true }));

        let user_ids = [];

        requests.map((request) => user_ids.push(request.origin_user_id))

        const senderData = await User.findAll({
            where: {
                id: user_ids
            }
        })

        const senders = senderData.map((user) => user.get({ plain: true }));

        res.render('profile', {
            senders,
            users,
            ...friend,
            logged_in: req.session.logged_in,
            f_beaten: "text-light bg-primary"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Shows the selected user's profile - filtered by game platform
router.get('/profile/:id/platform', async (req, res) => {
    try {
        // Get all the info about the logged in user for the friendslist
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
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

        const friendData = await User.findByPk(req.params.id, {
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
                order: [['owned_games', 'platform', 'asc']]
        });

        const friend = friendData.get({ plain: true });

        // Check how many requests they have waiting for them
        const requestData = await Request.findAll({
            where: {
                destination_user_id: req.session.user_id,
            },
        })

        const requests = requestData.map((request) => request.get({ plain: true }));

        let user_ids = [];

        requests.map((request) => user_ids.push(request.origin_user_id))

        const senderData = await User.findAll({
            where: {
                id: user_ids
            }
        })

        const senders = senderData.map((user) => user.get({ plain: true }));

        res.render('profile', {
            senders,
            users,
            ...friend,
            logged_in: req.session.logged_in,
            f_plat: "text-light bg-primary"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;