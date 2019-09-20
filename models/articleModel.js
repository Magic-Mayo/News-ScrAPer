const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    
    title: String,
    summary: String,
    date: String,
})

ArticleSchema.methods.addComment = function(post){
    this.comments.push({post: post, date: Date.now()});
}

const Article = mongoose.model('ArticleSchema', ArticleSchema);
module.exports = Article;