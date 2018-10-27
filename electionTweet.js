var fs = require('fs');
var l = fs.readFileSync("/tmp/elections");

// previous version of file. Initialize with {}
var last = JSON.parse(l);

// npm install twit
var Twit = require('twit');

// npm install request
var request = require("request")

// populate with Twitter dev account details
var T = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
    timeout_ms: 60*1000})


var url = "https://results.citywindsor.ca/api/elections";

request({
    url: url,
    json: true
}, function (error, response, body) {
    var flag = 0;
    if (!error && response.statusCode === 200) {
        for (var race in body)[]

            var test = "";
            if (last.length >= race){
               test = last[race]["PollCount"];
            }

// check if new data is different
        if (test != body[race]["PollCount"]){
            flag = 1;

            var pollsReporting = body[race]["PollCount"];
            var pollTotal = body[race]["PollTotal"];
            var name = body[race]["OptionDisplayName"];

// compose tweet
            var outputString = "#YQGElection " + name + "\n" + pollsReporting + "/" + pollTotal + " Polls Reported\n\n";


            for (candidate in body[race]["ElectionItems"]){
                outputString+=body[race]["ElectionItems"][candidate]["Name"] + ":" + body[race]["ElectionItems"][candidate]["Value"] + " (" + body[race]["ElectionItems"][candidate]["PercentageString"] + ")\n";

            }

            console.log(outputString);
            T.post('statuses/update', {status: outputString}, function(err,data,response){
            console.log(data)
            });

        }
        if (flag){
            fs.writeFileSync("/tmp/elections",JSON.stringify(body));
        }
    }

})
