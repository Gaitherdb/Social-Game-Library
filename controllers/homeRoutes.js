const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Game, Friendship, Ownership, Request } = require('../models');
const { request } = require('express');

router.get('/', async (req, res) => {

    try {
        const list = await Friendship.findAll({
            where: {user_id: req.session.user_id}
        })
        res.status(200).json(list)
        console.log(list)
    } catch(err){
        res.status(500).json(err);
    }

    try {

        const feedData = await Ownership.findAll({
            where: {user_id: [1,2]},
            order: [['id', 'desc']]
            // include: [
            //     {
            //         model: User,
            //         through: {Ownership},
            //         on: 'user_id'
                
            //     }
            // ]
        });

        const data = feedData.map((user) => user.get({ plain: true }));
        console.log(data)
        res.status(200).json(feedData);
        // res.render('homepage', {
        //     data,
        //     logged_in: req.session.logged_in
        // });
    } catch (err) {
        res.status(500).json(err);
    }
})

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
        const requestData = await Request.findAll({
            where: {
                destination_user_id: req.session.user_id,
            },
        })

        console.log(req.session.user_id);
        console.log(requestData);

        const requests = requestData.map((request) => request.get({ plain: true }));

        let user_ids = [];

        requests.map((request) => user_ids.push(request.origin_user_id))

        const userData = await User.findAll({
            where: {
                id: user_ids
            }
        })

        const senders = userData.map((user) => user.get({ plain: true }));

        console.log(senders);

        res.render('social', {
            senders,
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
        if(user.friends.length){
            friends.array.forEach(element => {
                
            });
        }
        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;