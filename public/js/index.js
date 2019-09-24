$(document).ready(()=>{
    const getArticle = () => {
        $.get('/articles', articles => {
            let commentCount = articles.comments.reduce((a,b)=>{
                return a.comments.length + b.comments.length;
            });

            $('.article-post-count').text(`${articles.news.length} articles | ${commentCount} comments`);
            console.log(articles)
            articles.news.map(article=>{
                
                for (let i=0; i<articles.comments.length; i++){
                    if (articles.comments[i].title === article.title){
                        const comment = articles.comments[i].comments;
                        let postNum = articles.comments[i].length;
                        $('.container').append(`
                        <article class="media">
                            <div class="media-content">
                            <div class="content">
                                <span>
                                    <b class="article-title">${article.title}</b>&emsp;<small>${article.date}</small>
                                    <br>
                                    <strong class="article-content">Author: </strong>${article.author}
                                    <p class="article-content"><a href="${article.link}" target="_blank">
                                        ${article.summary}
                                    </a></p>
                                </span>
                            </div>
                            <nav class="level">
                                    <button class="level-item post-btn">
                                        <span class="icon post-num">${postNum}&ensp;<i class="fas fa-comment-alt"></i></span>
                                    </button>
                            </nav>
                        </article>
                        <article class="media hide add-comment">
                        <div class="media-content">
                            <div class="field">
                                <p class="control">
                                    <textarea class="textarea" placeholder="Add a comment..."></textarea>
                                </p>
                            </div>
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <button class="button is-info" id="add-comment">Submit</button>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        </article>`
                        );
                        
                        comment.map(comment=>{
                            $('.media-content').append(
                                `<article class="media hide">
                                    <div class="media-content">
                                    <div class="content">
                                        <p class="comment">${comment.post}</p>
                                        <small>${moment(comment.date).format("dddd, MMMM Do YYYY, HH:mm")}</small>
                                    </div>
                                </article>`
                            )
                        })
                    } else {
                        postNum = '';
                        $('.container').append(`
                        <article class="media">
                            <div class="media-content">
                            <div class="content">
                                <span>
                                    <b class="article-title">${article.title}</b>&emsp;<small>${article.date}</small>
                                    <br>
                                    <strong class="article-content">Author: </strong>${article.author}
                                    <p class="article-content"><a href="${article.link}" target="_blank">
                                        ${article.summary}
                                    </a></p>
                                </span>
                            </div>
                            <nav class="level">
                                    <button class="level-item post-btn">
                                        <span class="icon post-num">${postNum}&ensp;<i class="fas fa-comment-alt"></i></span>
                                    </button>
                            </nav>
                        </article>
                        <article class="media hide add-comment">
                        <div class="media-content">
                            <div class="field">
                                <p class="control">
                                    <textarea class="textarea" placeholder="Add a comment..."></textarea>
                                </p>
                            </div>
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <button class="button is-info" id="add-comment">Submit</button>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        </article>`
                        );
                    }
                }
            })
        })
    };

    getArticle();

    $(document).on('click', '.post-btn', function(e){
        e.preventDefault();
        $(this).parent().parent().parent().next().toggleClass('hide');
        $(this).parent().siblings('.media').toggleClass('hide');
    })

    $(document).on('click', '#add-comment', function(e){
        e.preventDefault();
        const comment = $(this).parents('.media-content').children('.field').children().children().val().trim();
        const title = $(this).parents('.media-content').parent().prev().children().children().children().children('b').text();
        $.post('/articles/comments', {post: comment, title: title}).then(post=>{
            console.log(post)
            let comment = post.comments;
            let date;
            if (post.comments.length === 1){
                comment = post.comments[0].post;
                date = moment(post.comments[0].date).format("dddd, MMMM Do YYYY, HH:mm");
            } else {
                comment = post.comments.pop().post;
                date = moment(post.comments.pop().date).format("dddd, MMMM Do YYYY, HH:mm");
            }

            $(this).parents('.media').prev().children().append(
                `<article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p class="comment">${comment}</p>
                        <small>${date}</small>
                    </div>
                </article>`
            );
        })
        $(this).parents('.media-content').children('.field').children().children().val('')
    })
})