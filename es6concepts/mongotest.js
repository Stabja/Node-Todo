var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    created_at: { 
        type: Date
    },
    updated_at: { 
        type: Date
    }
});

//Custom Methods
userSchema.methods.dudify = function() {
    this.name = this.name + '-dude';
    return this.name;
};

//Add 'created_at' fields to the schema 
userSchema.pre('save', function(next){
    var currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at){
        this.created_at = currentDate;
    }
    next();
});

//Connect to MongoDB
var User = mongoose.model('User', userSchema, 'users');
mongoose.connect('mongodb://localhost:27017/basic');
mongoose.connection.on('connected', () => {
    console.log('Connected');
})
mongoose.connection.on('error', err => {
    console.log('Error');
});

//Create new Schema
var newUser = new User({
    name: "Kushagra",
    email: "kush@gmail.com",
    phone: "1263279836"
});

//Dudify It
newUser.dudify(function(err, data){
    console.log('New name is ' + data);
});

//Save the Schema
newUser.save(function(err, data){
    if(err) throw err;
    console.log(data);
});



/* City.find(function(err, cities){
    if(err) throw err;
    console.log(cities);
}) */

/* var s = {
    _id: "5c7cdd4295d199008e497475"
}

City.findOne(s, function(err, city){
    if(err) throw err;
    var { imsId, state, countryCode } = city;
    console.log(imsId);
    console.log(state);
    console.log(countryCode);
}); */


/* createCity: async (req, res, next) => {
    let response = new genericSuccessMessage();
    let params = req.body;
    let cityPayload = {
        aliasName : params.aliasName,
        state : params.state,
        countryCode : params.countryCode,
        imsId : params.imsId        
    };
    
    cityPayload.updatedByEmail = await cityService.getUpdateUserDetails(req);

    await cityService.createCity(cityPayload);
    await cityService.flushCityCacheEntry();
    responseHelper(res)({ statusCode: response.code, response });
}

var inner = function(){
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return fn.apply(void 0, args)["catch"](args[2]);
};
var top = function(fn){
    return inner();
};
top(createCity);


var func = (a, b, c) => {
    console.log(a+b+c);
};
var WRAP = function(fn){
    return function(){
        return fn(...arguments);
    };
};
var x = WRAP(func);
x(1,2,3);
func(1,2,3); */