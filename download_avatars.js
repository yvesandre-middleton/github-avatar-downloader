var request = require("request");
var receiveToken = require("./secrets.js");
var fs = require("fs");
console.log("Welcome to the GitHub Avatar Downloader!");

let owner = process.argv[2];
let name = process.argv[3];

// This function grabs the user names
function getRepoContributors(repoOwner, repoName, cb) {
 var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
   headers: {
     "User-Agent": "request",
      Authorization: "token " + receiveToken.GITHUB_TOKEN
   }
 };

// This callback gets our request from the URL
 request(options, function(err, res, body) {
   cb(err, body);
 });
}

// This function grabs the images relating to each username and downloads them
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on("error", function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
}

// This section parses the usernames so we can access them
// It also chooses how it finds the images, where it puts them and what it names them
getRepoContributors(owner, name, function(err, result) {
  if (err) {
    console.log("Errors:", err);
  }
  else {
    var data = JSON.parse(result);
     // console.log(data);
    for (i of data) {
      downloadImageByURL(i.avatar_url, "./avatars/" + i.login + ".jpg")
      // console.log(i);
    }
  }
});