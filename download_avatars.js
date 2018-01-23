var request = require('request');
var receiveToken = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
 var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
   headers: {
     'User-Agent': 'request',
      Authorization: 'token ' + receiveToken.GITHUB_TOKEN
   }
 };

 request(options, function(err, res, body) {
   cb(err, body);
 });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  var data = JSON.parse(result);
   // console.log(data);
  for (i of data) {
    console.log(i.avatar_url)
  }
 console.log("Errors:", err);
 // console.log("Result:", result);
});