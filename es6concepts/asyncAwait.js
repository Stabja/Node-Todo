const fs = require('fs');


var readFileUsingPromise = () => {
    console.log('Reading File');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.readFile('./public/posKts.json', 'utf8', (err, data) => {
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }, 2000);
    });
}

function runFileWithPromise(){
    console.log('Running with promise.');
    readFileUsingPromise().then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

async function runWithAsyncAwait(){
    console.log('Running with async/await');
    try{
        var data = await readFileUsingPromise();
        console.log(data);
        
    } catch (err) {
        console.log(err);
    }
}

runFileWithPromise();
runWithAsyncAwait();