const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/library', withAuth, async (req, res) => {
    try {
        res.render('library');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/social', withAuth, async (req, res) => {
    try {
        res.render('social');
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