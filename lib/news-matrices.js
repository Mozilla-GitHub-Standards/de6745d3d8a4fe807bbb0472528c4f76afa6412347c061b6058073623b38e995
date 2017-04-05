#! /usr/bin/env node

var path = require(`path`);
var FS = require(`q-io/fs`);
var argv = require(`minimist`)(process.argv.slice(2));

var config = {
  "dest": argv.dest || `dist`,
  "src": argv.src || `news-matrices`
};

function getNewsMatrices() {
  return new Promise((resolve, reject)=> {
    FS.list(path.join(process.cwd(), config.src)).then((newsMatrices) => {
      return resolve(newsMatrices);
    }).catch((e) => {
      console.log(e);
      reject(e);
    });
  });
}

function writeFile(entries) {
  var dictionary = entries.reduce((prevEntry, entry) => {
    prevEntry[entry.fileName.replace(".html", "").replace("news-matrix-", "")] = entry.content;
    return prevEntry;
  }, {});
  var publicPath = path.join(process.cwd(), config.dest);
  var newsMatrixPath = path.join(publicPath, `news-matrices.json`);

  FS.makeTree(publicPath).then(() => {
    FS.write(newsMatrixPath, JSON.stringify(dictionary, null, 2))
    .then(() => {
      console.log(`Done compiling locales at: ${newsMatrixPath}`);
    }).catch((e) => {
      console.log(e);
    });
  }).catch((e) => {
    console.log(e);
  });
}

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    FS.read(path.join(process.cwd(), config.src, fileName)).then(function(content) {
      resolve({fileName, content});
    });
  });
}

function readFiles(fileNames) {
  /*To ignore the .DS_Store file that breaks everything*/
  fileNames.splice(fileNames.indexOf(".DS_Store"), 1);
  return new Promise((resolve, reject) => {
    Promise.all(fileNames.map(readFile)).then((contents) => {
      resolve(contents);
    });
  });
}

getNewsMatrices().then(readFiles).then(writeFile).catch((err)=> {
  console.error(err);
});
