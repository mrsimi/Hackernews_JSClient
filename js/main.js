window.addEventListener('load', init);

const app = document.getElementById('root');
const newsBox = document.createElement('div');

app.appendChild(newsBox);

const next = document.getElementById('next');

const stories = {
    best : "beststories",
    top : "topstories",
    newstory : "newstories"
};

const story = stories.best;

function init(){
    
    getNews();
    getNewsContent();
}


function getNews(){
    fetch('https://hacker-news.firebaseio.com/v0/'+story+'.json')
    .then(response => response.json())
    .then(json => localStorage.setItem('newsID', JSON.stringify(json)))
    .catch(err => {
        const errInfo = document.createElement('p');
        errInfo.textContent = 'please check your internet connection';
        newsBox.appendChild(errInfo);
        setTimeout(getNews(), 10000);
    });   
}

function getNewsContent(){
    let start = 0; 
    let end = 20;

    let newsIds = JSON.parse(localStorage.getItem('newsID'));
    for(let i=start; i < end; i++){
        fetch('https://hacker-news.firebaseio.com/v0/item/'+newsIds[i]+'.json')
        .then(data => data.json())
        .then(json => {
            let dateCreated = new Date(json.time * 1000).toLocaleDateString('en-US');
            let timeCreated = new Date(json.time * 1000).toLocaleTimeString('en-US');
            let dateTimeCreation = dateCreated + " " + timeCreated;

            const title = document.createElement('a');
            title.textContent = json['title'];
            title.setAttribute('href', json.url);
            const newsDate = document.createElement('p');
            newsDate.textContent = dateTimeCreation;

            const hrline = document.createElement('hr');
            newsBox.appendChild(title);
            newsBox.appendChild(newsDate);
            newsBox.appendChild(hrline);
        })
        .catch(err => {
            setTimeout(getNews(), 3000);
        });   
    }
}



function addHtml(jsonData){
   console.log(jsonData)
}

    
