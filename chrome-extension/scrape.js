const anchorList = [];

// Styling
const sidebarStyle = {
    closed: "font-family: 'Montserrat', sans-serif; width: 400px; height: 60px; position: fixed; top: 200px; left: 0; background-color: #484848; color: white; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; z-index: 500; box-shadow: 4px 4px 10px 1px rgba(0,0,0,0.15); transform: translate(-340px); transition: 0.3s; overflow: hidden;",
    open: "font-family: 'Montserrat', sans-serif; width: 400px; height: 220px; position: fixed; top: 150px; left: 0; background-color: #484848; color: white; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; z-index: 500; box-shadow: 4px 4px 10px 1px rgba(0,0,0,0.15); transition: 0.3 ease; transition: 0.3s; overflow: hidden;"
};

const ratingSidebarStyle = {
    closed: "font-family: 'Montserrat', sans-serif; width: 400px; height: 60px; position: fixed; top: 200px; right: 0; background-color: #484848; color: white; border-top-left-radius: 1rem; border-bottom-left-radius: 1rem; z-index: 500; box-shadow: 4px 4px 10px 1px rgba(0,0,0,0.15); transform: translate(340px); transition: 0.3s;",
    open: "font-family: 'Montserrat', sans-serif; width: 400px; height: 400px; position: fixed; top: 200px; right: 0; background-color: #484848; color: white; border-top-left-radius: 1rem; text-align:center; border-bottom-left-radius: 1rem; z-index: 500; box-shadow: 4px 4px 10px 1px rgba(0,0,0,0.15); transition: 0.3 ease; transition: 0.3s;"
}

const sidebarHeaderStyle = {
    closed: "padding: 15px;",
    open: "padding: 15px; background-color: #333333"
}

const toggleIconStyle = {
    closed: "position: absolute; top: 10px; right: 10px; width: 40px; height: 40px; padding: 10px; color: white; cursor: pointer; transition: 0.3s ease;",
    open: "position: absolute; top: 15px; right: 25px; width: 40px; height: 40px; padding: 10px; color: white; cursor: pointer; transition: 0.3s ease;"
}

function searchText(element) {
    if (element.tagName === 'A') {
        if (element.innerText.match(/^[a-zA-Z ]+$/) && element.innerText.split(' ').length <= 3) {
            anchorList.push(element.innerText);
        }
    } else if (element.hasChildNodes()) {
        element.childNodes.forEach(searchText);
    }
}

const article = document.querySelector('article');

if (article) {
    searchText(article);
    console.log(anchorList);
}

if (anchorList.length > 0) {
    fetch('http://localhost:5000/api/journalist/', {
        headers: {
            searchList: anchorList
        }
    })
    .then(res => res.json())
    .then(data => {
        journalistInfo = data;
        display(journalistInfo);
    })
    .catch(err => {
        console.log(err);
    });
}

function display(info) {
    let sideDrawerOpen = false;

    const fontLinkElement = document.createElement('link');
    fontLinkElement.href = "https://fonts.googleapis.com/css?family=Montserrat:300,400,500&display=swap";
    fontLinkElement.rel = 'stylesheet';
    document.head.appendChild(fontLinkElement);

    const sideDrawerElement = document.createElement("div");
    sideDrawerElement.setAttribute("style", sidebarStyle.closed);

    // Header Div
    const headerDiv = document.createElement("div");
    headerDiv.setAttribute('style', sidebarHeaderStyle.closed);

    const journalistNameElement = document.createElement('h1');
    journalistNameElement.setAttribute('style', 'font-weight: 600; font-size:18px');
    journalistNameElement.innerText = info.name;
    headerDiv.appendChild(journalistNameElement);
    
    const journalistEmployerElement = document.createElement('h3');
    journalistEmployerElement.innerText = info.employer;
    journalistEmployerElement.setAttribute('style', 'font-weight: 300; font-size:10px');
    headerDiv.appendChild(journalistEmployerElement);

    const toggleIconElement = document.createElement('img');
    toggleIconElement.src = chrome.extension.getURL('images/open.png');
    toggleIconElement.setAttribute('style', toggleIconStyle.closed);
    toggleIconElement.addEventListener('click', function() {
        if (sideDrawerOpen) {
            toggleIconElement.src = chrome.extension.getURL('images/open.png');
            toggleIconElement.setAttribute('style', toggleIconStyle.closed);
            sideDrawerElement.setAttribute("style", sidebarStyle.closed);
            headerDiv.setAttribute('style', sidebarHeaderStyle.closed);

            sideDrawerOpen = false;
        } else {
            toggleIconElement.src = chrome.extension.getURL('images/close.png');
            toggleIconElement.setAttribute('style', toggleIconStyle.open);
            sideDrawerElement.setAttribute("style", sidebarStyle.open);
            headerDiv.setAttribute('style', sidebarHeaderStyle.open);

            sideDrawerOpen = true;
        }
    });
    headerDiv.appendChild(toggleIconElement);

    sideDrawerElement.appendChild(headerDiv);

    
    // Main Div
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute('style', "padding: 15px; display: flex; flex-flow:column; align-items:center");

    const journalistScoreDescriptionElement = document.createElement('span');
    journalistScoreDescriptionElement.innerText = 'User Rating';

    mainDiv.appendChild(journalistScoreDescriptionElement);

    const journalistScore = info.userRatings.reduce((cumulator, rating) => {
        return cumulator + rating;
    }) / info.userRatings.length;

    console.log(info.userRatings);

    const journalistScoreElement = document.createElement('h1');
    journalistScoreElement.innerText = journalistScore.toFixed(1);
    mainDiv.appendChild(journalistScoreElement);



    const seeMoreBtn = document.createElement("a")
    seeMoreBtn.innerText =  "More Info"
    seeMoreBtn.setAttribute('style', "text-align:center; color:white;background-color:#333333;width:60%;padding:15px 5px;margin-top:20px; border:none; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); transition: all 0.3s cubic-bezier(.25,.8,.25,1);");
    seeMoreBtn.href = "http://localhost:3000/rate/" + info._id
    seeMoreBtn.target = '_blank'
    mainDiv.appendChild(seeMoreBtn)
   


    sideDrawerElement.appendChild(mainDiv);

    document.body.appendChild(sideDrawerElement);


    
}