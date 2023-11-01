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
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'centre';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'centre';
}

function closeModal() {
    var modal = document.getElementById('myModal');
    var overlay = document.getElementById('overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}