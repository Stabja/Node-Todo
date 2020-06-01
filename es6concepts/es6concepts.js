//THIS and SCOPE of variables
var name = "This is Global";
var myobj1 = {
    name: 'Jade',
    hello: function () {
        return 'Hello ' + this.name;
    }
}
console.log(myobj1.hello());
console.log(name);

//Creating OBJECTS
var person1 = function(name, age){
    this.name = name;
    this.age = age;
}
var jade = new person1('Jade', 30);
console.log(jade);

//PROTOTYPING
var person2 = function(){
}
person2.prototype.name = 'n/a';
person2.prototype.age = 0;
var jade = new person2();
console.log(jade.name + " => " + jade.age);

//CALL and BIND
var myObj = {
    num: 2,
    num1: 3,
    num2: 4
}
var sayHello = function(num1, num2){
    var ans = this.num + num1 + num2;
    console.log(ans);
}
var myfunc = function(){
    var ans = this.num1 + this.num2;
    console.log(ans);
}
sayHello.call(myObj, 3, 4);
var added = myfunc.bind(myObj);
added();

//CLASSES
class person3{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log('Hello ' + this.name);
    }
}
var tom = new person3('Tom', 27);
tom.hello();

//CLOSURES
var add = function(num1) {
    return function (num2) {
        return num1 + num2;
    }
}
var add2 = new add(8);
console.log(add2(5));

//PROMISES
var mypromise = new Promise(function(resolved, rejected){
    if (true) {
        resolved(1234);
    } else {
        rejected();
    }
});
mypromise.then(function(value){
    console.log("Promise successful " + value);
}).catch(function(){
    console.log("Promise Failed.");
});

//CALLBACKS
function calculate(num, callback){
    return callback(num);
}
square = (a) => {
    return a*a;
}
console.log(calculate(4, square));

//PROMISE EXAMPLE
var promise2 = new Promise(function(req, res){
    var request = new XMLHttpRequest();
    request.open('get', 'https://randomuser.me/api');
    request.onload = req;
    request.onerror = res;
    request.send();
});
promise2.then(function(data){
    var x = data.target.response;
    console.log(x);
}).catch(function(){
    console.log('No Response from server.');
});


