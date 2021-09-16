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
        const friendData2 = await Friendship.destroy({
            where: {
                user_id: req.params.id,
                friend_id: req.session.user_id
            },
        });

        res.status(200).json(friendData);

    } catch (err) {
        res.status(500).json(err);
    }
});

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
