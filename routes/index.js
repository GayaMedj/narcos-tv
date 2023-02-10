var express = require('express');
const request = require('request');

var router = express.Router();

// GET all episodes
// return : seasons = { number:int , episodes: {...} }
router.get('/', (req, res, next) => {

  request.get('http://api.tvmaze.com/singlesearch/shows?q=narcos&embed=episodes', (error, response, data) => {
    let allEpisodes = JSON.parse(data)._embedded.episodes
    
    const episodes1 = allEpisodes.filter((episode)=> episode.season == 1).slice(0, 4);
    const episodes2 = allEpisodes.filter((episode)=> episode.season == 2).slice(0, 4);
    const episodes3 = allEpisodes.filter((episode)=> episode.season == 3).slice(0, 4);
    
    request.get('http://api.tvmaze.com/singlesearch/shows?q=narcos&embed=seasons', (error, response, data) => {
      let allSeasons = JSON.parse(data)._embedded.seasons;
      
      const saison1 = allSeasons.find((saison) => saison.number==1)
      const saison2 = allSeasons.find((saison) => saison.number==2)
      const saison3 = allSeasons.find((saison) => saison.number==3)

      res.render('index', { 
         seasons: [ 
           {...saison1, episodes: episodes1},
           {...saison2, episodes: episodes2},
           {...saison3, episodes: episodes3}
         ] 
      });

      // res.json({ 
      //   seasons: [ 
      //     {...saison1, episodes: episodes1},
      //     {...saison2, episodes: episodes2},
      //     {...saison3, episodes: episodes3}
      //   ] 
      // });

    })
    
  });
});

module.exports = router;
