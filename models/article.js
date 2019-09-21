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

ArticleSchema.methods.addComment = function(post){
    this.comments.push({post: post, date: moment(Date.now()).format('MM/DD/YYYY HH:mm')});
}

const Article = mongoose.model('ArticleSchema', ArticleSchema);
module.exports = Article;