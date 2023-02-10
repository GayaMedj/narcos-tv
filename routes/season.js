var express = require('express');
const request = require('request');

var router = express.Router();

function checkId(req, res, next) {
    const id = parseInt(req.params.seasonId);
    if (id<1 || id>3) {
        res.status(404);
        res.json({msg: "Season not found"});
    } else {
        next();
    }
}

router.get('/:seasonId', checkId, (req, res, next) => {

    request.get('http://api.tvmaze.com/singlesearch/shows?q=narcos&embed=seasons', (error, response, data) => {

        const parsedData = JSON.parse(data)._embedded.seasons
        const season = parsedData.find((season) => season.number == req.params.seasonId)

        request.get('http://api.tvmaze.com/singlesearch/shows?q=narcos&embed=episodes', (error, response, data) => {
            const parsedData = JSON.parse(data)._embedded.episodes;
            const episodes = parsedData.filter((episode) => episode.season == season.number);
            res.render('season', { ...season, episodes })
        })

    })
})

module.exports = router;