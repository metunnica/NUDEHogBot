// bot.js
var 
    twit = require('twit');
    config = require('./config');

var Twitter = new twit (config);

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
  