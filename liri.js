var fs = require("fs");

var keys = [];

var action = process.argv[2]
var request = process.argv[3]

fs.readFile("keys.js", "utf8", function(err, data){
    if(err){
        console.log(err)
    }
    keys = data;
})



switch (action) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifyThisSong();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;
}


function myTweets(){

   var twitter = require('twitter');
 
    var client = new twitter({
        consumer_key: keys.twitterkeys[0],
        consumer_secret: keys.twitterkeys[1],
        access_token_key: keys.twitterkeys[2],
        access_token_secret: keys.twitterkeys[3]
    });

    console.log(client)
}

myTweets();


function spotifyThisSong(){

}

function movieThis(){

}

function doWhatItSays(){

}
