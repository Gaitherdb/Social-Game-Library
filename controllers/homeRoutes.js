const router = require('express').Router();
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