const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    
    title: String,
    summary: String,
    date: Date,
    comments: [{post: String, date: Date}]
})

ArticleSchema.methods.addComment = function(post, date){
    this.comments.push({post: post, date: date});
}

const Article = mongoose.model('ArticleSchema', ArticleSchema);
module.exports = Article;