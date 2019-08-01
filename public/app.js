const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const modal2 = document.getElementById("myModal2");
const btn2 = document.getElementById("myBtn2");

const span = document.getElementById("close");
const span2 = document.getElementById("close2");

const banner = document.getElementsByClassName('banner');

const memeImgs = [];



document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, {});
});

btn.onclick = function() {
  modal.style.display = "block";
}
btn2.onclick = function() {
  modal2.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
span2.onclick = function() {
  modal2.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal2.style.display = "none";
  }
}
