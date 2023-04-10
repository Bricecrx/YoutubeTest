const express = require('express');
const pg = require("pg");
const app = express();

var conString = 'postgres://Brice_crx:Jeanchopper666@localhost:5432/YoutubeTest';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default to accept all requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function getSQLResult(req, res, sqlRequest, values) {
  var client = new pg.Client(conString);
  client.connect(function (err) {
    if (err) {
      // Cannot connect
      console.error('cannot connect to postgres', err);
      res.status(500).end('Database connection error!');
    } else {
      // Connection is OK
      client.query(sqlRequest, values, function (err, result) {
        if (err) {
          // Request fails
          console.error('bad request', err);
          res.status(500).end('Bad request error!');
        } else {
          // Build result array from SQL result rows var results = [];
          results = []
          for (var ind in result.rows) {
            results.push(result.rows[ind]);
          }
          // Convert object to a JSON string and send it back 
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(results));
          client.end();
        }
      });
    }
  });
}

app.post("/geturls", function (req, res) {
  var sqlRequest = "SELECT url_video_url FROM url_video";
  var values = [];
  getSQLResult(req, res, sqlRequest, values);
});

app.post("/addurl", function (req, res) {
  var url = req.body.url;
  var sqlRequest = "INSERT INTO url_video (url_video_url, url_video_bookmark)"
    + "VALUES ($1, false)"
    + " RETURNING url_video_url";
  values = [url];
  getSQLResult(req, res, sqlRequest, values);
});

app.post("/addurlhistory", function (req, res) {
  var url = req.body.url;
  var timestamp = req.body.timestamp;
  var sqlRequest = "INSERT INTO url_history (url_history_time, url_video_url)"
    + "VALUES (to_timestamp($2 / 1000.0), $1)"
    + " RETURNING url_history_id";
  values = [url, timestamp];
  getSQLResult(req, res, sqlRequest, values);
});

app.post("/getlasturlfromhistory", function (req, res) {
  var sqlRequest = "SELECT url_video_url FROM url_history ORDER BY url_history_time DESC LIMIT 1";
  var values = [];
  getSQLResult(req, res, sqlRequest, values);
});

app.post("/addToFavourite", function (req, res) {
  var url = req.body.url;
  var sqlRequest = "";
  var values = [];
  sqlRequest = "UPDATE url_video SET"
    + " url_video_bookmark= true"
    + " WHERE url_video_url=$1"
    + " RETURNING url_video_url";
  values = [url];
  getSQLResult(req, res, sqlRequest, values);
});

app.post("/findAllFavourites", function (req, res) {
  var sqlRequest = "SELECT url_video_url FROM url_video WHERE url_video_bookmark = true";
  var values = [];
  getSQLResult(req, res, sqlRequest, values);
});

app.post("/countFavourites", function (req, res) {
  var sqlRequest = "SELECT COUNT(url_video_url) FROM url_video WHERE url_video_bookmark = true";
  var values = [];
  getSQLResult(req, res, sqlRequest, values);
});

app.post("/deleteBookmark", function (req, res) {
  var url = req.body.url;
  var sqlRequest = "";
  var values = [];
  sqlRequest = "UPDATE url_video SET"
    + " url_video_bookmark= false"
    + " WHERE url_video_url=$1"
    + " RETURNING url_video_url";
  values = [url];
  getSQLResult(req, res, sqlRequest, values);
});

app.post("/findAllHistoriesLimit10", function (req, res) {
  var sqlRequest = "SELECT * FROM url_history ORDER BY url_history_time DESC LIMIT 10 ";
  var values = [];
  getSQLResult(req, res, sqlRequest, values);
});

// Must be LAST instruction of the file
// Listen to port 8000
app.listen(8000, () => {
  console.log('Server started!')
});

