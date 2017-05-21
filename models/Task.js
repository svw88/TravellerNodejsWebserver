var db = require('../dbconnection');

var Task = {

	getEvents : function(date, country, state, city, id, callback) {

		return db.query("Select * from events where Date >= ? AND Country = ? AND State = ? AND City = ? AND Id > ?", [date, country, state, city, id], callback);

	},
	getUserEvents : function(date, alias, id, callback) {

		return db.query("Select * from events Where Date >= ? AND Alias = ?  AND Id > ?", [date, alias, id], callback);

	},
	getSearchEvents : function(date, country, state, city, id, find, callback) {
		find = "%"+find+"%";
		return db.query("Select * from events where Date >= ? AND Country = ? AND State = ? AND City = ? AND Id > ? AND (Name like ? OR Description like ? OR Alias like ?)", [date, country, state, city, id, find, find, find], callback);

	},
	getFilterEvents : function(date, country, state, city, id, type, callback) {
		return db.query("Select * from events where Date >= ? AND Country = ? AND State = ? AND City = ? AND Id > ? AND Type = ?", [date, country, state, city, id, type], callback);

	},
	getMyEvents : function(userId, date, callback) {
		return db.query("select events.Id,events.Name,events.Description,events.Type,events.Country,events.State,events.City,events.Addr,events.Site,events.Image,events.Date,events.Price,events.Currency,events.Alias from events join users on users.alias = events.alias  WHERE users.Id = ? AND events.Date >=?", [userId, date], callback);

	},
	createEvent : function(Task, callback) {
		console.log("inside service");
		console.log(Task);
		return db.query("insert into events(Name,Description,Type,Country,State,City,Addr,Site,Image,Date,Price,Currency,Alias) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [Task.Name, Task.Description, Task.Type, Task.Country, Task.State, Task.City, Task.Addr, Task.Site, Task.Image, Task.Date, Task.Price, Task.Currency, Task.Alias], callback);
	},
	removeEvent : function(id, callback) {
		return db.query("delete from events where Id=?", [id], callback);
	},
	createUser : function(Task, callback) {
		console.log("inside service");
		console.log(Task.Name);
		return db.query("insert into users(Name,Surname,Alias,Email,Password) values(?,?,?,?,?)", [Task.Name, Task.Surname, Task.Alias, Task.Email, Task.Password], callback);
	},
	login : function(email, password, callback) {

		return db.query("Select id,alias from users Where Email = ? AND Password = ?", [email, password], callback);

	},
	getCountries : function(callback) {

		return db.query("Select id,name from countries", callback);

	},
	getStates : function(countryid, callback) {

		return db.query("Select id,name from states where country_id = ?", [countryid], callback);

	},
	getCities : function(stateid, callback) {

		return db.query("Select id,name from cities where state_id = ?", [stateid], callback);

	}
};
module.exports = Task;
