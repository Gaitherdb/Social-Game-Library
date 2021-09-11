const router = require('express').Router();
const { Game, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all games of the logged in user
router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in) {
            const userID = req.session.user_id;
            const gameData = await Game.findAll({
                where: {
                    user_id: userID
                },
                order: [
                    ['id', 'DESC'],
                ],
            });
            const games = gameData.map((game) => game.get({ plain: true }));
            res.render('library', {
                games,
                logged_in: req.session.logged_in
            });
        }
        else {
            res.render('login');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



// Adding a game
router.post('/', withAuth, async (req, res) => {
    let userID = req.session.user_id;
    try {
        const gameData = await Game.create({
            ...req.body,
            user_id: userID
        });

        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;