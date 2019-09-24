const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    
    title: String,
    summary: String,
    date: String,
    comments: [{
        post: {
            type: String,
            trim: true,
        }, date: {
            type: Date
        }
    }]
})

const Article = mongoose.model('ArticleSchema', ArticleSchema);
module.exports = Article;