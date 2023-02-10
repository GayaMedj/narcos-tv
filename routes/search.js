var express = require('express');
const request = require('request');

var router = express.Router();

router.get('/', (req, res, next) => {

    if (!req.query.query) {
        res.status(500)
        res.json({ msg: "query Required"})
    } else {
        const searchTerm = req.query.query;
        request.get('http://api.tvmaze.com/singlesearch/shows?q=narcos&embed=episodes', (error, response, data) => {

            const parsedData = JSON.parse(data)._embedded.episodes;
            const results = parsedData.filter((episode) => episode.summary.includes(searchTerm) || episode.name.includes(searchTerm))
            res.locals.query = req.query.query;

            res.render('search', { results })
        })
    }

})

module.exports = router;