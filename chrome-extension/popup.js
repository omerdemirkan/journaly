const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function () {
    // alert(input.value);
    fetch('https://baconipsum.com/api/?type=meat-and-filler')
    .then(res => {
        alert(res)
    })
    .catch(err => {
        console.log(err);
        alert(err);
    });
});