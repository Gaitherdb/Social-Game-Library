const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Game, Friend_Tag } = require('../models');

router.get('/', async (req, res) => {
    try {
        const data = await User.findAll({
            where: {
                id: req.session.user_id
            },
            include: [{ model: User, through: Friend_Tag, as: 'u1' }],
          });    
        const projects = data.map((el) => el.get({ plain: true }))
        console.log(...projects);
        res.render('homepage', {
            projects,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/library', withAuth, async (req, res) => {
    try {
        res.render('library', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
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