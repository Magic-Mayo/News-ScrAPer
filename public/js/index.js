$(document).ready(()=>{
    (() => {
        $.get('/articles', articles => {
            articles.map(article=>{
                console.log(article)
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
                                <p class="article-content"><a href="${article.link}">
                                    ${article.summary}
                                </a></p>
                            </span>
                        </div>
                        <nav class="level">
                                <a class="level-item">
                                    <span class="icon">${postNum}&ensp;<i class="fas fa-comment-alt" value=""></i></span>
                                </a>
                        </nav>
                    </article>`
                )
            })
        })
    })()


})