const router = require('express').Router();
const { Game, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/library', withAuth, async (req, res) => {
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
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

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

module.exports = router;