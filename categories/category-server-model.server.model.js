'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

function validateLength (v) {
    // a custom validation function for checking string length to be used by the model
    return v.length <= 15;
}
/**
 * CategoryServerModel Schema
 */
var CategoryServerModelSchema = new Schema({
    created:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        default:'',
        trin:true
    },
    name: {
        type: String,
        default: '',
        trim: true,
        unique : true,
        // make this a required field
        required: 'name cannot be blank',
        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
        validate: [validateLength, 'name must be 15 chars in length or less']
    }
  // CategoryServerModel model fields
  // ...
});

mongoose.model('CategoryServerModel', CategoryServerModelSchema);
