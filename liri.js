//Required Files
require("dotenv").config()
var keys = require("./keys");
var fs = require("fs")
var inquirer = require("inquirer")
var Twitter = require('twitter')
var Spotify = require('node-spotify-api');

//keys needed for Spotify and Twitter
var spotify = new Spotify(keys.spotify)
var client = new Twitter(keys.twitter)

//get from command lines
var command = process.argv[2]
var searchTerm = process.argv[3]
var enter = "\n"

//Twitter
if (command === "my-tweets") {

    var params = {
        screen_name: 'dhrandy',
        count: 20
    }
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text + "\n------")
                var tweetLines = (tweets[i].text)
                fs.appendFile("log.txt", enter + tweetLines + enter, function(err) {
                    if (err) throw err;
                  });
            }
        }
    })
    
}

//Spotify
if (command === "spotify-this-song") {
    var Spotify = require('node-spotify-api');
    spotify.search({
        type: 'track',
        query: searchTerm,
        limit: 1
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var spotify1 = data.tracks.items
        for (var i = 0; i < spotify1.length; i++)
            var spotifyOutput = ("Artist: " + spotify1[i].artists[i].name + 
            "\nTrack Name: " + spotify1[0].name + 
            "\nSpotify Link: " + spotify1[0].href + 
            "\nAlbum Name: " + spotify1[0].album.name)
            console.log(spotifyOutput)

            fs.appendFile("log.txt", enter+ spotifyOutput + enter, function(err) {
                if (err) throw err
              })
    });
}
//What To Display
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from


//OMDB Movie
if (command === "movie-this") {
    if (!searchTerm) {
        searchTerm = "Lord Of War";
    }
    var request = require('request');
    request('http://www.omdbapi.com/?t=' + searchTerm + '&apikey=98491c3', function(error, response, body) {
        var body = JSON.parse(body);
        var movies = ("Title: " + body.Title +
            "\nYear: " + body.Year +
            "\nIMDB Rating: " + body.imdbRating +
            "\nCountry: " + body.Country +
            "\nLanguage: " + body.Language +
            "\nPlot: " + body.Plot +
            "\nActors: " + body.Actors)
            console.log(movies)

            fs.appendFile("log.txt", enter+ spotifyOutput + movies, function(err) {
                if (err) throw err
              })

        //  * Title of the movie.
        //  * Year the movie came out.
        //  * IMDB Rating of the movie.
        //  * Rotten Tomatoes Rating of the movie.
        //  * Country where the movie was produced.
        //  * Language of the movie.
        //  * Plot of the movie.
        //  * Actors in the movie.
    });
}

if (command === "do-what-it-says") {
	fs.readFile('random.txt', "utf8", function(error, data){
	  var SpotifyDo = data.split(",")
  
    // console.log(SpotifyDo[1])

    spotify.search({
        type: 'track',
        query: SpotifyDo[1]
    }, 
    function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            spotifyOutput =
                "Song Name: " + "'" + data.tracks.items[0].name + "\n" +
                "Album Name: " + data.tracks.items[0].album.name + "\n" +
                "Artist Name: " + data.tracks.items[0].album.artists[0].name + "\n" +
                "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n";
            console.log(spotifyOutput);

            fs.appendFile("log.txt", enter+ spotifyOutput + enter, function(err) {
                if (err) throw err
              })

        }
    });
	});
  }