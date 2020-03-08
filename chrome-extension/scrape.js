const anchorList = [];

// Styling
const sidebarStyle = {
    closed: "width: 400px; height: 400px; position: fixed; top: 200px; left: 0; background-color: #484848; color: white; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; z-index: 500; box-shadow: 4px 4px 10px 1px rgba(0,0,0,0.25); transform: translate(-340px); height: 60px; transition: 0.3s;",
    open: "width: 400px; height: 400px; position: fixed; top: 200px; left: 0; background-color: #484848; color: white; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; z-index: 500; box-shadow: 4px 4px 10px 1px rgba(0,0,0,0.25); transition: 0.3 ease; transition: 0.3s;"
};

function searchText(element) {
    if (element.tagName === 'A') {
        if (element.innerText.match(/^[a-zA-Z ]+$/)) {
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

    const sideDrawerElement = document.createElement("div");
    sideDrawerElement.setAttribute("style", sidebarStyle.closed);

    // Header Div
    const headerDiv = document.createElement("div");
    headerDiv.setAttribute('style', "padding: 15px;");

    const journalistNameElement = document.createElement('h1');
    journalistNameElement.innerText = info.name;
    headerDiv.appendChild(journalistNameElement);
    
    const journalistEmployerElement = document.createElement('h3');
    journalistEmployerElement.innerText = info.employer;
    headerDiv.appendChild(journalistEmployerElement);

    const closeIconElement = document.createElement('img');
    closeIconElement.src = chrome.extension.getURL('images/open.png');
    closeIconElement.setAttribute('style', "position: absolute; top: 20px; right: 20px; width: 20px; height: 20px; color: white; cursor: pointer");
    closeIconElement.addEventListener('click', function() {
        if (sideDrawerOpen) {
            closeIconElement.src = chrome.extension.getURL('images/open.png');
            sideDrawerElement.setAttribute("style", sidebarStyle.closed);

            sideDrawerOpen = false;
        } else {
            closeIconElement.src = chrome.extension.getURL('images/close.png');
            sideDrawerElement.setAttribute("style", sidebarStyle.open);
            sideDrawerOpen = true;
        }
    });
    headerDiv.appendChild(closeIconElement);

    sideDrawerElement.appendChild(headerDiv);

    
    // Main Div
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute('style', "padding: 15px;");

    const journalistScoreDescriptionElement = document.createElement('span');
    journalistScoreDescriptionElement.innerText = 'User Rating';
    mainDiv.appendChild(journalistScoreDescriptionElement);

    const journalistScore = info.userRatings.reduce((cumulator, rating) => {
        return cumulator + rating;
    }) / info.userRatings.length;

    console.log(info.userRatings);

    const journalistScoreElement = document.createElement('h1');
    journalistScoreElement.innerText = journalistScore;
    mainDiv.appendChild(journalistScoreElement);

    sideDrawerElement.appendChild(mainDiv);

    document.body.appendChild(sideDrawerElement);

}