    window.addEventListener('load', init);


const app = document.getElementById('root');
const newsBox = document.createElement('div');
newsBox.setAttribute('class', 'row');
app.appendChild(newsBox);

const nextButton = document.getElementById('next-button');



function init(){
    //console.log('hola');
    let startTimer = performance.now();
    let newsIdReturned = loadNews();
    //console.log(newsIdReturned.length);

    loadNewsContent(newsIdReturned);

    let endTimer= performance.now();
    console.log('time taken is '+ (endTimer - startTimer));
}


function loadNews(){   
    let request = new XMLHttpRequest();

    request.open('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json', true);

    request.onload = function(){
        let newsData = JSON.parse(this.response);
        if(request.status >= 200 && request.status < 400){
            //newsIds = newsIds[newsData];
            localStorage.setItem('newsArray', JSON.stringify(newsData));              
        }else {
            console.log('error');
        }        
    }
    request.send(); 

    let newsIds = JSON.parse(localStorage.getItem('newsArray'));
    return newsIds;    
}

function loadNewsContent(news){

        for(let i = 0; i<20; i++){
            let contentId = news[i];
            console.log(contentId);  
            
            let innerRequest = new XMLHttpRequest();
            innerRequest.open('GET', 'https://hacker-news.firebaseio.com/v0/item/'+contentId+'.json', true);

            innerRequest.onload = function(){
                newsContent = JSON.parse(this.response);
                if(innerRequest.status >= 200 && innerRequest.status < 400){
                    let dateCreated = new Date(newsContent.time * 1000).toLocaleDateString('en-US');
                    let timeCreated = new Date(newsContent.time * 1000).toLocaleTimeString('en-US');
                    let dateTimeCreated = dateCreated +" " + timeCreated;          
                    
                    console.log(newsContent);                            
            
                    //adding the html function 
                    const newsTitle = document.createElement('h1');
                    newsTitle.textContent = newsContent['title'];
            
                    const author = document.createElement('p');
                    author.textContent = newsContent['by'];
            
                    const newsUrl = document.createElement('a');
                    newsUrl.href = newsContent['url'];
            
                   const newsDateTime = document.createElement('p');
                   newsDateTime.textContent = dateTimeCreated;

                   newsBox.appendChild(newsTitle);
                   newsBox.appendChild(author);
                   newsBox.appendChild(newsDateTime);
                   newsBox.appendChild(newsUrl);
                }else {
                  console.log('error');
                }    
            }
            innerRequest.send();
        }
} 
    
    
