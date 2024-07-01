const mongoose = require('mongoose');

//define the person schema

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age :{
        type:Number,
    },
    work:{
            type: String,
            enum: ['chef','waiter','manager'] ,
            required:true
    },
    mobile :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
         unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:String,
        requied:true
    }
},
	{
		timestamps: { 
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		},
		versionKey : false
	})

//create person model
const Person = mongoose.model('person',personSchema);
module.exports = Person;