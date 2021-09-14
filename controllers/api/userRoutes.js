const router = require('express').Router();
const validator = require('validator');
const { User, Game, Ownership, Friendship, Request } = require('../../models');

// Insomnia testing: Get all users and complete info for them
router.get('/test/', async (req, res) => {
    try {
        const userData = await User.findAll({
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
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Insomnia testing: Get all info about one user
router.get('/test/:id', async (req, res) => {
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

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Insomnia testing: Get all requests that are sent to a user
router.get('/request/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        const requestData = await Request.findAll({
            where: {
                destination_user_id: userData.id,
            }
        })

        res.status(200).json(requestData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Insomnia testing: Approve a friend request
router.post('/request/:id', async (req, res) => {
    try {
        const requestData = await Request.findByPk(req.params.id);
        const friendshipData = await Friendship.create({
            user_id: requestData.origin_user_id,
            friend_id: requestData.destination_user_id
        });

        res.status(200).json(friendshipData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Creates new User
router.post('/', async (req, res) => {
    try {
        // Check if email and password are valid
        if (validator.isEmail(req.body.email) && validator.isStrongPassword(req.body.password)) {
            const userData = await User.create(req.body);

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                res.status(200).json(userData);
            });

            // If it isn't an email, throw an error
        } else if (!(validator.isEmail(req.body.email))) {
            res.statusMessage = "The email isn't good";
            throw (err);

            // If it isn't a strong password, throw an error
        } else if (!(validator.isStrongPassword(req.body.password))) {
            res.statusMessage = "The password isn't good";
            throw (err);
        }

    } catch (err) {
        res.status(400).json(err);
    }
});

// Logs in user (if correct email and password are entered)
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// Deletes user's current active session
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
            console.log("You have been logged out")
        });
    } else {
        console.log("Nobody's logged in")
        res.status(404).end();
    }
});

module.exports = router;