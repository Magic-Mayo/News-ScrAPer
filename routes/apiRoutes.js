const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const db = require('../models');

module.exports = (app) => {
    app.get('/articles', (req, res)=>{
        const articles = [];
        axios.get('https://www.apnews.com/apf-topnews').then(news=>{
            const $ = cheerio.load(news.data);
            $('div.FeedCard').each((i,elem)=>{
                const title = $(elem).children('.CardHeadline').children('.headline').text() || $(elem).children('a').children('.CardHeadline').children('.headline').text();
                const summary = $(elem).children('a').children('.content').text() || 'No summary, please follow link';
                const link = `https://apnews.com/apf-topnews${$(elem).children('a').attr('href')}`;
                const author = () => {
                    if ($(elem).children('.CardHeadline').children('.signature').children('.byline').text() !== ''){
                        return $(elem).children('.CardHeadline').children('.signature').children('.byline').text().split('By ')[1];
                    } else if ($(elem).children('a').children('.CardHeadline').children('.signature').children('.byline').text() !== '') {
                        return $(elem).children('a').children('.CardHeadline').children('.signature').children('.byline').text().split('By ')[1];
                    } else {
                        return 'Unknown'
                    }
                }
                const date = $(elem).children('.CardHeadline').children('.signature').children('.Timestamp').attr('data-source');
        
                db.Article.create({
                    title: title,
                    summary: summary,
                    link: link,
                    author: author(),
                    date: moment(date).format("dddd, MMMM Do YYYY, HH:mm"),
                    comment: []
                })

                articles.push({
                    title: title,
                    summary: summary,
                    link: link,
                    author: author(),
                    date: moment(date).format("dddd, MMMM Do YYYY, HH:mm")
                })
            })
            
            db.Article.find({}).then(post=>{
                res.json({comments: post.filter(comment=>{return comment.comments.length > 0}), news: articles})
            })
        })
    })

    app.post('/articles/comments', (req,res)=>{
        const comment = req.body;
        db.Article.findOneAndUpdate({title: comment.title}, {$push: {comments: {post: comment.post, date: moment()}}}, {new: true}).then(post=>{console.log(post);res.json(post)})
    })
}