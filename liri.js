var fs = require("fs");
var keys = require("./keys.js")


var action = process.argv[2]
var ask = process.argv[3]

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
    if (typeof ask != "undefined"){
        spotifyThisSong(ask);
    } else {
        spotifyThisSong("The Sign Ace Of Base")
    };
    break;

    case "movie-this":
    if (typeof ask != "undefined"){
        movieThis(ask);
    } else {
        movieThis("Mr. Nobody")
    };
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;

    case "change-random":
    changeRandom();
    break;
}


function myTweets(ask){

    var twitter = require('twitter');
 
    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret,
    });

    var params = {screen_name: 'LIRIPlacehold'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
           tweets.forEach(function(tweet, index, tweets){
                console.log(tweets[index].text);
           })           
        }

    });
}


function spotifyThisSong(ask){

    var Spotify = require("node-spotify-api");

    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
    });
 
    spotify.search({ type: 'track', query: ask, limit: 1}, function(err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songArr = response.tracks.items;

        console.log(songArr[0].artists[0].name)
        console.log(songArr[0].name)
        console.log(songArr[0].href)
        console.log(songArr[0].album.name)
    

});

}


function movieThis(ask){

    var request = require("request");

    request(`http://www.omdbapi.com/?t=${ask}&y=&plot=short&apikey=40e9cece`, function(error, response, body) {

    if (!error && response.statusCode === 200) {
    
    console.log(`${ask}'s official title is: ${JSON.parse(body).Title}`);
    console.log(`${ask} was released in: ${JSON.parse(body).Year}`);
    console.log(`${ask}'s imdb rating is: ${JSON.parse(body).imdbRating}`);
    console.log(`${ask}'s Rotten Tomatoes rating is: ${JSON.parse(body).Ratings[1].Value}`);
    console.log(`${ask} was produced in: ${JSON.parse(body).Country}`);
    console.log(`${ask}'s language(s) is/are: ${JSON.parse(body).Language}`);
    console.log(`In short, ${ask} is about: ${JSON.parse(body).Plot}`);
    console.log(`${ask} stars: ${JSON.parse(body).Actors}`);
  }
});

}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            console.log(err)
        }
        var dataArr = data.split(",");
        
        switch(dataArr[0]){

            case "my-tweets":
            myTweets();
            break;

            case "spotify-this-song":
            spotifyThisSong(dataArr[1]);
            break;

            case "movie-this":
            movieThis(dataArr[1]);
            break;
        }
    })
}

function changeRandom(){
    fs.writeFile("random.txt", `${process.argv[3]},"${process.argv[4]}"`, function(err){
        if (err){
            return console.log(err);
        }
        console.log("random.txt was updated!")
    });
}

fs.appendFile("log.txt", `,${process.argv[2]},"${process.argv[3]}"`, function(err){
    if (err){
        console.log(err);
    }

    console.log("Activity was logged to log.txt")
})