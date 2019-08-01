const password = document.getElementById("password")
const confirm_password = document.getElementById("password-confirm");

const checkPassword = () => {
    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        password.setCustomValidity('');
        confirm_password.setCustomValidity('');
    }
}
confirm_password.addEventListener("focusout", checkPassword, true);

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;