$(document).ready(()=>{
    const landingPage = () => {
        $.get('/articles', articles => {
            articles.map(article=>{
                let postNum;
                !!article.posts ? postNum = article.posts.length : postNum = '';
                $('.container').append(`
                    <article class="media">
                        <div class="media-content">
                        <div class="content">
                            <span>
                                <strong>Author: </strong>${article.author} &emsp;<small>${article.date}</small>
                                <p class="article-content"><a href="${article.link}">
                                    ${article.summary}
                                </a></p>
                            </span>
                        </div>
                        <nav class="level">
                                <a class="level-item">
                                    <span class="icon is-small">${postNum}&ensp;<i class="fas fa-comment-alt"></i></span>
                                </a>
                        </nav>
                    </article>`
                )
            })
        })
    }
    landingPage();
})