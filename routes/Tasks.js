var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

router.get('/events/:date/:country/:state/:city/:id', function(req, res, next) {

	Task.getEvents(req.params.date, req.params.country, req.params.state, req.params.city, req.params.id, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/events/:id', function(req, res, next) {

	Task.getEvent(req.params.id, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/events/:date/:alias/:id', function(req, res, next) {

	Task.getUserEvents(req.params.date, req.params.alias, req.params.id, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/events/:date/:country/:state/:city/:id/search/:find', function(req, res, next) {

	Task.getSearchEvents(req.params.date, req.params.country, req.params.state, req.params.city, req.params.id, req.params.find, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/events/:date/:country/:state/:city/:id/search/:type/:find', function(req, res, next) {

	Task.getSearchFilterEvents(req.params.date, req.params.country, req.params.state, req.params.city, req.params.id, req.params.type, req.params.find, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/events/:date/:country/:state/:city/:id/:type', function(req, res, next) {

	Task.getFilterEvents(req.params.date, req.params.country, req.params.state, req.params.city, req.params.id, req.params.type, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/events/:userid/:date', function(req, res, next) {

	Task.getMyEvents(req.params.userid, req.params.date, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.post('/create', function(req, res, next) {

	Task.createEvent(req.body, function(err, count) {

		//console.log(req.body);
		if (err) {
			res.json(err);
		} else {
			res.json(req.body);
			//or return count for 1 & 0
		}
	});
});

router.delete('/remove/:id', function(req, res, next) {

	Task.removeEvent(req.params.id, function(err, count) {

		if (err) {
			res.json(err);
		} else {
			res.json(count);
		}

	});
});

router.post('/register', function(req, res, next) {

	Task.createUser(req.body, function(err, count) {

		//console.log(req.body);
		if (err) {
			res.json(err);
		} else {
			res.json(req.body);
			//or return count for 1 & 0
		}
	});
});

router.get('/login/:email/:password', function(req, res, next) {

	Task.login(req.params.email, req.params.password, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/check/:email/:alias', function(req, res, next) {

	Task.checkUser(req.params.email, req.params.alias, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/countries', function(req, res, next) {

	Task.getCountries(function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/states/:countryid', function(req, res, next) {

	Task.getStates(req.params.countryid, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

router.get('/cities/:stateid', function(req, res, next) {

	Task.getCities(req.params.stateid, function(err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});

});

module.exports = router;
