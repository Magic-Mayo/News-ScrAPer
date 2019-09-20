const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    
    articleTitle: {
        type: String,

    },

    articleSummary: {
        type: String,

    },

    articleDate: {
        type: Date,
        
    }
})