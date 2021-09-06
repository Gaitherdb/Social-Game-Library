const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/library', async (req, res) => {
    try {
        res.render('library');
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;