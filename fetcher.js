// Asynchronous Operations

// There are two operations in this problem which will take an unknown amount of time:
//    You need to make an http request and wait for the response.
//    After the http request is complete, you need to take the data you receive and write it to a file in your local filesystem.

const request = require('request');
const fs = require('fs');
const userInput = (process.argv).slice(2);

if (userInput.length === 0) console.log('Parameters, please!');

request(userInput[0], (error, response, body) => {
  if (error) console.log('Request error!', error);

  let fileSize = 0;

  console.log('Status Code: ', response.statusCode);

  fs.writeFile(userInput[1], body, err => {
    if (err) {
      console.log('Writing error: ', err);
      return;
    }
    
    fs.stat(userInput[1], (err, stats) => {
      if (err) console.log('File stats error: ', err)
      fileSize = stats.size;
      // console.log('REALLY!', fileSize);
      return fileSize;
    });

  })
  // I don't know how to get size out of fs.stat, sorry!
  console.log(`Downloaded and saved ${fileSize} bytes to ${userInput[1]}`);
});

// Expected outpute
// node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html