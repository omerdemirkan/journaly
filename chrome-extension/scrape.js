const anchorList = [];

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
    const wrapperDiv = document.createElement("div");
    wrapperDiv.setAttribute("style","width: 400px; height: 400px; position: fixed; top: 300px; left: 0; background-color: #484848; color: white; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; z-index: 500; box-shadow: 4px 4px 10px 1px rgba(0,0,0,0.25);");

    // Header Div
    const headerDiv = document.createElement("div");
    headerDiv.setAttribute('style', "padding: 15px;");

    const journalistNameElement = document.createElement('h1');
    journalistNameElement.innerText = info.name;
    headerDiv.appendChild(journalistNameElement)
    
    const journalistEmployerElement = document.createElement('h3');
    journalistEmployerElement.innerText = info.employer;
    headerDiv.appendChild(journalistEmployerElement);

    wrapperDiv.appendChild(headerDiv);

    
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

    wrapperDiv.appendChild(mainDiv);

    document.body.appendChild(wrapperDiv);

}