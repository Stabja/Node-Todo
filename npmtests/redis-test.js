//var redis = require('redis');
//var client = redis.createClient();

/*client.on('connect', function(){
    console.log('connected');
});


client.set('framework', 'ReactJS', function(err, val){
    if(err) throw err;
    console.log(val); 
});
client.get('framework', function(err, value){
    if(err) throw err;
    console.log(value);
});


client.hmset('companies', {
    'microsoft': 'windows',
    'google': 'searchengine',
    'facebook': 'socialnetwork',
    'amazon': 'ecommerce',
    'apple': 'electronics'
});
client.hgetall('companies', function(err, obj){
    if(err) throw err;
    console.log(obj);
});


client.rpush(['frameworks2', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply);
});
client.lrange('frameworks2', 0, -1, function(err, reply) {
    console.log(reply);
});


client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
    console.log(reply);
});
client.smembers('tags', function(err, reply) {
    console.log(reply);
});


client.exists('frameworks2', function(err, res){
    if(err) throw err;
    if(res === 1){
        console.log('exists');
    } else {
        console.log('doesnt exist');
    }
});*/

var arr = [4,9,16,25,36,49];

var arr2 = arr.map(u => {
    return u+2;
})

const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Tox', lastName: 'Dagger' },
               { id: 2, username: 'test2', password: 'test2', firstName: 'Tox', lastName: 'Threat' }];


var getAll = () => {
    return users.map(u => {
        const { username, password, ...rest } = u;
        return rest;
    });
}

console.log(getAll());





