$(document).ready(()=>{
    (() => {
        $.get('/articles', articles => {
            // console.log(articles)
            // let postCount = articles.reduce((a,b)=>{
            //     return a.posts.length + b.posts.length;
            // })

            // $('.article-post-count').text(`${articles.length} articles | ${postCount} comments`)
            
            articles.map(article=>{
                let postNum;
                // !!articles.posts ? postNum = articles.posts.length : postNum = '';
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
                                    <span class="icon">${postNum}&ensp;<i class="fas fa-comment-alt"></i></span>
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

                if(article.comments){
                    $('.media-content').first().append(
                        `<article class="media">
                            <div class="media-content">
                            <div class="content">
                                <p class="comment">${article.comment.post}</p>
                            </div>
                        </article>`
                    )
                }
            })
        });
    })();

    $(document).on('click', '.post-btn', function(e){
        e.preventDefault();
        $(this).parent().parent().parent().next().toggleClass('hide');
    })

    $(document).on('click', '#add-comment', function(e){
        e.preventDefault();
        const comment = $(this).parents('.media-content').children('.field').children().children().val().trim();
        const title = $(this).parents('.media-content').parent().prev().children().children().children().children('b').text();
        $.post('articles/comments', {post: comment, title: title}).then(post=>{
            console.log(post)
            $('.media-content').first().append(
                `<article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p class="comment">${post.comment}</p>
                        <small>${post.date}</small>
                    </div>
                </article>`
            );
        })
        $(this).parents('.media-content').children('.field').children().children().val('')
    })
})