$(document).ready(()=>{
    (() => {
        console.log('something')
        $.get('/articles', async articles => {
            // articles.reduce((post)=>{
            //     console.log(post)
            // })            
            // $('.article-post-count').text(`${articles.length} articles | ${articles}`)
            articles.map(article=>{
                let postNum;
                !!article.posts ? postNum = article.posts.length : postNum = '';
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
                                <a class="level-item">
                                    <span class="icon">${postNum}&ensp;<i class="fas fa-comment-alt"></i></span>
                                </a>
                        </nav>
                    </article>`
                );

                if(article.comments){
                    $('.media-content').append(
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

    $(document).on('click', '.fa-comment-alt', function(e){
        e.preventDefault();
        const title = $(this).parent().parent().parent().siblings('.content').children().children('.article-title').text();

        (()=>{
            $(this).parents('.media').after(
                `<article class="media">
                    <div class="media-content">
                        <div class="field">
                            <p class="control">
                                <textarea class="textarea" placeholder="Add a comment..."></textarea>
                            </p>
                        </div>
                        <nav class="level">
                            <div class="level-left">
                                <div class="level-item">
                                <a class="button is-info">Submit</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </article>`
            )
        })();
    })
})