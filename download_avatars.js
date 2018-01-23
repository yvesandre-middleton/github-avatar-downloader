var request = require('request');
var receiveToken = require('./secrets.js')
var fs = require('fs');

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

function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
  .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));               // Note 4
}

getRepoContributors("jquery", "jquery", function(err, result) {
  var data = JSON.parse(result);
   // console.log(data);
  for (i of data) {
    downloadImageByURL(i.avatar_url, './avatars/avatar' + i.login + '.jpg')
    // console.log(i)
  }
 console.log("Errors:", err);
 // console.log("Result:", result);
});