const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function () {
    // alert(input.value);
    fetch('http://localhost:5000/api/journalist/?name=Christiane+Amanpour')
    .then(res => res.json())
    .then(json => alert(JSON.stringify(json)))
    .catch(err => {
        console.log(err);
        alert(err);
    });
});