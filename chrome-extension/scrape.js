
const anchorList = [];

function searchText(element) {
    if (element.tagName === 'A') {
        if (element.innerText.match('/^[A-Za-z]+$/')) {
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