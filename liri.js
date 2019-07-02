require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


var concertThis = function (artist) {

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
      function (response) {


        if (response.data.length) {
          console.log("\n\n" + "Artist searched: ", artist)
          console.log("\n" + "Artist will be playing next at: " + response.data[0].venue.name);
          console.log("The venue is located at: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
          console.log("\n" + "All artists being featured at this event: " + response.data[0].lineup)
          console.log("\n" + "The date and time of this event: " + moment(response.data[0].datetime).format("MMMM Do YYYY, h:mm a"));
          console.log("Tickets are available for purchase at: " + response.data[0].offers[0].url);
          console.log("Tickets for this event is currently: " + response.data[0].offers[0].status);
          console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-" + "\n")

          var text = [
            "Artist searched: " + artist,
            "\n" + "Artist will be playing next at: " + response.data[0].venue.name,
            "\n" + "The venue is located at: " + response.data[0].venue.city + ", " + response.data[0].venue.country,
            "\n" + "All artists being featured at this event: " + response.data[0].lineup,
            "\n" + "The date and time of this event: " + moment(response.data[0].datetime).format("MMMM Do YYYY, h:mm a"),
            "\n" + "Tickets are available for purchase at: " + response.data[0].offers[0].url,
            "\n" + "Tickets for this event is currently: " + response.data[0].offers[0].status,

            "\n" + "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-" + "\n\n\n"
          ];
          fs.appendFile("log.txt", text, function (err) {


            if (err) {
              console.log(err);
            }

            console.log("Content was also added to the log!");

          });

        } else {
          console.log("This search did not yield a result. Please try another artist's name.");
        }
      }
    )

    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

};

var movieThis = function (movieName) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


  axios.get(queryUrl).then(
      function (response) {
        console.log("Title of the movie: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMBD Rating: " + response.data.Rated);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Countries that the movie was produced: " + response.data.Country);
        console.log("Language that the movie was produced in: " + response.data.Language);
        console.log("Plot of the move (SPOILER ALERT): " + response.data.Plot);
        console.log("Actors in the movie: " + response.data.Actors);
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-" + "\n")

// TA Dave has helped with object destructuring 
//         let {Title, Year, Rated} = response.data
//         console.log(
// `
// Title of the movie: ${Title}
// Release Year: ${Year}
// IMBD Rating ${Rated}
// `);
        

        var text = [
          "Title of the movie: " + response.data.Title,
          "\n" + "Release Year: " + response.data.Year,
          "\n" +"IMBD Rating: " + response.data.Rated,
          "\n" +"Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
          "\n" +"Countries that the movie was produced: " + response.data.Country,
          "\n" + "Language that the movie was produced in: " + response.data.Language,
          "\n" + "Plot of the move (SPOILER ALERT): " + response.data.Plot,
          "\n" + "Actors in the movie: " + response.data.Actors,
          "\n" + "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-" + "\n\n\n"
       
        ];
        fs.appendFile("log.txt", text, function (err) {


          if (err) {
            console.log(err);
          }

          console.log("Content was also added to the log!");

        });

      })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

}


var runSpotify = function (songName) {
  spotify.search({
    type: 'track',
    query: songName,
    limit: 5
  }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    // console.log(data);
    // console.log(data.tracks.items[0])
    var songs = data.tracks.items;


    for (var i = 0; i < songs.length; i++) {
      console.log(i + 1);
      console.log("Artist: " + songs[i].artists[0].name)
      console.log("Song name: " + songs[i].name);
      console.log("Preview songs: " + songs[i].preview_url);
      console.log("Album: " + songs[i].album.name);
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"+"\n")
      var text = [
        "Song# " + (i + 1),
        "\n" + "Artist: " + songs[i].artists[0].name,
        "\n" + "Song name: " + songs[i].name,
        "\n" + "Preview songs: " + songs[i].preview_url,
        "\n" + "Album: " + songs[i].album.name,
        "\n" + "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-" +
        "\n\n\n",
      ];

      fs.appendFile("log.txt", text, function (err) {


        if (err) {
          console.log(err);
        }

      });

    };
    console.log("Content was also added to the log!");
  });
};

var runRandomTxt = function () {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) throw err;
    var randomTxtArr = data.split(',');

    if (randomTxtArr != 0) {
      runThis(randomTxtArr[0], randomTxtArr.slice(1).join(" "))
    }

  })
}

var userPick = function (userInput, userChoices) {
  switch (userInput) {
    case 'spotify-this-song':
      runSpotify(userChoices);
      break;

    case 'do-what-it-says':
      runRandomTxt(userChoices);
      break;
    case 'concert-this':
      concertThis(userChoices);
      break;
    case 'movie-this':
      movieThis(userChoices);
      break;
    default:
      console.log("This isn't a programmed LIRI BOT function. Please use 'spotify-this-song', 'concert-this', 'movie-this', or 'do-what-it-says'.");

  }
}


var runThis = function (arg1, arg2) {
  userPick(arg1, arg2);
}
runThis(process.argv[2], process.argv.slice(3).join(" "));