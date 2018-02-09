// bot.js
var twit = require('twit');
var twitterBot = require('node-twitterbot').twitterBot;

var Bot = new twitterBot ({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
})

var Twitter = new twit (Bot);

//Retweet #Hogibs
    var retweet = function(){
        var params = {
            q: '#Hogib, #hogib',
            result_type: 'recent'
        }
        Twitter.get('search/tweets', params, function(err, data) {
            if (!err) {
                var retweetId = data.statuses[0].id_str;
                Twitter.post ('statuses/retweet/:id', {
                    id: retweetId
                }, function(err, responce) {
                    if (responce) {
                        console.log('Retweeted!!!');
                    }
                    if (err) {
                        console.log('Somthing went wrong while retweeting. Dupe...');
                    }
                });
            }
            else {
                console.log('Somthing went wrong while searching...')
            }
        });
    }
    //loop
    setInterval(function() {
	
        retweet();
        console.log('loop restarted')
    
       }, 5000);
  