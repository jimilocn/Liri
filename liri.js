require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);






var runSpotify = function (songName) {
    spotify.search({
        type: 'track',
        query: songName,
        limit:5
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // console.log(data);
        // console.log(data.tracks.items[0])
        var songs = data.tracks.items;


        for (var i = 0; i < songs.length; i++) {
            console.log(i+1);
            console.log("Artist: " + songs[i].artists[0].name)
            console.log("Song name: " + songs[i].name);
            console.log("Preview songs: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
            var text = [
                "Song# "+(i+1),
                "\n"+ "Artist: "+songs[i].artists[0].name,
                "\n"+"Song name: " +songs[i].name,
                "\n"+ "Preview songs: " + songs[i].preview_url,
                "\n"+"Album: " +songs[i].album.name,
                "\n"+"-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
                +"\n\n\n",];
    
            fs.appendFile("log.txt", text, function (err) {


                if (err) {
                    console.log(err);
                }

            });

        };
        console.log("Content was also added to the log!");
    });
};

var runRandomTxt = function(){
    fs.readFile('random.txt', 'utf8', function(err,data){
        if(err) throw err;
        var randomTxtArr=data.split(',');

        if(randomTxtArr!=0){
            runThis(randomTxtArr[0], randomTxtArr.slice(1).join(" "))
        }

    })
}

var userPick = function (caseData, functionData) {
    switch (caseData) {
        case 'spotify-this-song':
            runSpotify(functionData);
            break;

        case 'do-what-it-says':
            runRandomTxt(functionData);
            break;
        default:
            console.log("This isn't a programmed LIRI function. Please use 'spotify-this-song', 'concert-this', 'movie-this', or 'do-what-it-says'.");

    }
}


var runThis = function (arg1, arg2) {
    userPick(arg1, arg2);
}
runThis(process.argv[2], process.argv.slice(3).join(" "));