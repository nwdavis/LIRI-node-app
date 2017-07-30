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

function spotifyThisSong(){

}

function movieThis(){

}

function doWhatItSays(){

}
