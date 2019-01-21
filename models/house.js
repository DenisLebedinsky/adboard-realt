const mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    id : {
        type:String,
        unique: true,
        required:true
    },
    categoryId : {
        type: String,
        required: true
    },
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:false
    },
    status:{
        type:Boolean,
        required:false
    },
    tel : {
        type:String,
        required:false
    },
    description : {
        type:String,
        required:true
    },
    price : {
        type:Number
    },
    image : {
        type:String,
        unique: false
    },
    imgArr:[
        {
            type:String,
            required:false
        },
        {
            type:String,
            required:false
        }
    ],
    created:{
        type:Date,
        default: Date.now
    }
});

schema.statics.findOnList = function(id, callback){
    let house = this;
    house.findOne({id:id}, callback);
};

schema.statics.findCheck = function(callback){
    let house = this;
    house.find({status:false}, callback);
};

schema.statics.findall = function(callback){
    let house = this;
    house.find({status:true}).limit(6).exec(callback);
};

schema.statics.findMore = function(skip,callback){
    let house = this;
    house.find({status:true }).skip(parseInt(skip)).limit(3).exec(callback);
};

schema.statics.findMoreCategori = function(skip,categorid,callback){
    let house = this;
    house.find({categoryId: categorid,status:true}).skip(parseInt(skip)).limit(3).exec(callback);
};

schema.statics.findOnName = function(str,callback){
    let house = this;
    let query = new RegExp(str,'i');
    house.find({name:{"$regex":query}}).limit(30).exec(callback);
};

exports.House = mongoose.model('House',schema);