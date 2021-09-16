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

router.get('/feed', async (req, res) => {
    const list = [];
 
    try{

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
                    
                    }
                ],
        });
        // console.log(friendData)

        const myfriends = friendData.map((user) => user.get({ plain: true }));
        console.log(myfriends[0].friends)

        myfriends[0].friends.forEach(element => {
            console.log(element.id)
            list.push(element.id)
        });

        console.log(list)


        const feedData = await Ownership.findAll({
            where: {user_id: list},
            // include: [{model: User, through: {Ownership}, as: 'details'}],
            order: [['id', 'desc']],
           
        });

        res.status(200).json(feedData);
        // res.render('homepage', {
        //     data,
        //     logged_in: req.session.logged_in
        // });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/game/:id',  async (req, res) => {
    try {
        const gameDetails = await Game.findByPk(req.params.id);
        res.status(200).json(gameDetails);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/user/:id',  async (req, res) => {
    try {
        const gameDetails = await User.findByPk(req.params.id);
        res.status(200).json(gameDetails);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;
