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
    

}