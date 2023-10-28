function validateForm(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmpassword').value;
    if (password !== confirmPassword) {
        openModal();
        event.preventDefault();
    }
}


function openModal() {
    var modal = document.getElementById('myModal');
    var overlay = document.getElementById('overlay');
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('myModal');
    var overlay = document.getElementById('overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}