const input = document.getElementById('input');
const submitButton = document.getElementById('submit');

let journalistInfo;

submitButton.addEventListener('click', function () {
    // alert(input.value);
    fetch('http://localhost:5000/api/journalist/?name=Christiane+Amanpour')
    .then(res => res.json())
    .then(data => {
        journalistInfo = data;
        alert(journalistInfo);
    })
    .catch(err => {
        console.log(err);
    });
});

