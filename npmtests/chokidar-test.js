var express = require('express');
var router = express.Router();
const chokidar = require('chokidar');


const watcher = chokidar.watch('seeders', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

var watcher2 = chokidar.watch('routes', {
  ignored: /[\/\\]\./, 
  persistent: true
});


const log = console.log.bind(console);

watcher
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`))
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))


watcher2
  .on('add', (path) => console.log('File', path, 'has been added'))
  .on('change', (path) => console.log('File', path, 'has been changed'))
  .on('unlink', (path) => console.log('File', path, 'has been removed'))
  .on('addDir', (path) => console.log('Directory', path, 'has been added'))
  .on('unlinkDir', (path) => console.log('Directory', path, 'has been removed'))
  .on('error', (error) => console.error('Error happened', error))
  

watcher.on('change', (path, stats) => {
  if (stats) console.log(`File ${path} changed size to ${stats.size}`);
});



module.exports = router;