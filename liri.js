var fs = require("fs");

var keys = [];

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
        spotifyThisSong("The Sign")
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
        consumer_key: 'fKM34DyPHFedY24MUSHJ6bgEP',
        consumer_secret: 'bIeKfX5lWhgKjFTtIXkomUg5EQuoedzLRDqVjpmiCX3s2Z2btX',
        access_token_key: '891103805378633728-AsK47LsoX69p4YNVq1y5llCzg3rxggH',
        access_token_secret: 'jYVmOZqD50c42HQkaIgQ7ioT238EB22Br5nk5jY0th6HF'
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
        id: '8a597cac843c4678a7c169b7eb9b9626',
        secret: '3fbe195219b944bb88c5ebf971ff81d1'
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
    fs.writeFile("random.txt", `${process.argv[3]},${process.argv[4]}`, function(err){
        if (err){
            return console.log(err);
        }
        console.log("random.txt was updated!")
    });
}

fs.appendFile("log.txt", "utf8", function(err){
    if (err){
        console.log(err);
    }

    console.log("Activity was logged to log.txt")
})