'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
    topic: {
        type: String
    },
    rate:{
        type:Number,
        default: 0.0
    },
    vote:{
        type:Number,
        default:0
    },
    max:{
        type:Number,
        default:5
    },
    isReadonly:{
        type:Boolean,
        default:false
    },
    userName:{
        type : String,
        default:''
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	blog:{
		type: Schema.ObjectId,
		ref:'Blog'
	}
});

mongoose.model('Article', ArticleSchema);
