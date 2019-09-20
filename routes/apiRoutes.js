const axios = require('axios');
const cheerio = require('cheerio');

// module.exports = (app) => {
//     app.get('/articles', (req,res)=>{
//         axios.get('https://www.apnews.com/apf-topnews').then(news=>{
//             const $ = cheerio.load(news.data);
//             const articles = [];

//             $('div.FeedCard').each((i,elem)=>{
//                 const title = elem.firstChild().text();
//                 const summary = elem.children('a.');
//                 const link = elem.firstChild().href();
//                 const img = elem.children('img').href();

//                 articles.push({
//                     title: title,
//                     summary: summary,
//                     link: link,
//                     picture: img
//                 })
//             })
//         })
//     })
// }

axios.get('https://www.apnews.com/apf-topnews').then(news=>{
    const $ = cheerio.load(news.data);
    const articles = [];
    console.log($('div.FeedCard').children('a').children('.LazyImage').attr())
    $('div.FeedCard').each((i,elem)=>{
        const title = $(elem).children('.CardHeadline').children('.headline').text();
        const summary = $(elem).children('a').children('.content').text();
        const link = $(elem).children('.CardHeadline').children('.headline').attr('href');
        const img = $(elem).children('a').children('.LazyImage').find('img').attr('data-cfsrc');

        articles.push({
            title: title,
            summary: summary,
            link: link,
            picture: img
        })

        // console.log(articles)
    })
}
)