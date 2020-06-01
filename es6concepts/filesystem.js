var fs = require('fs');


fs.open('config/posts.json', 'r', (err, fd) => {
    if(err) throw err;
    console.log(fd);
    fs.close(fd, (err) => {
        if(err) throw err;
    })
});

fs.readFile('config/posts.json', 'utf8', function(err, data){
    if(err) throw err;
    console.log(data);
});


