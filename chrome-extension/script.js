let articleFound = false;

function search(element) {
    if (!articleFound) {
        if (element.tagName === 'ARTICLE') {
            alert('Yoo this an article');
        } else if (element.hasChildNodes()) {
            element.childNodes.forEach(search);
        }
    }
}

search(document.body);

if (articleFound) {
    alert('Yoo found an article');
}