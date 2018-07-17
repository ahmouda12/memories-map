const express = require('express');
const mapRoutes  = express.Router();
const Place = require('../models/place');

// mapRoutes.get('/map', (req, res, next) => {
//   res.render('map/map-page');
// });

mapRoutes.get('/map', (req, res, next) => {
	Place.find((error, places) => {
    // console.log(places);
		if (error) { next(error); } 
		else { res.render('map/map-page', { places });}
	});
});

mapRoutes.post('/map', (req, res, next) => {
  // Get Params from POST
  let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new Place with location
  const newPlace = new Place({
		name:        req.body.name,
		description: req.body.description,
		location:    location
	});

  // Save the place to the Database
  newPlace.save((error) => {
		if (error) { next(error); }
		else { res.redirect('/map');
		}
	});
});

mapRoutes.get('/api', (req, res, next) => {
	Place.find((error, places) => {
		if (error) { next(error); } 
		else { res.status(200).json({ places });}
	});
});


module.exports = mapRoutes;