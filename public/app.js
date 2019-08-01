const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");

const modal2 = document.getElementById("myModal2");
const btn2 = document.getElementById("myBtn2");

const modal3 = document.getElementById("myModal3");
const btn3 = document.getElementById("myBtn3");

const modal4 = document.getElementById("myModal4");
const btn4 = document.getElementById("myBtn4");

const span = document.getElementById("close");
const span2 = document.getElementById("close2");
const span3 = document.getElementById("close3");
const span4 = document.getElementById("close4");

const banner = document.getElementsByClassName('banner');

const memeImgs = [];



document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, {});
});

if(btn) {
btn.onclick = function() {
  modal.style.display = "block";
  }
}

if(btn2) {
btn2.onclick = function() {
  modal2.style.display = "block";
  }
}

if(btn3) {
btn3.onclick = function() {
  modal3.style.display = "block";
  }
}

if(btn4) {
  btn4.onclick = function() {
    modal4.style.display = "block";
  }
}

if(span) {
span.onclick = function() {
  modal.style.display = "none";
  }
}

if(span2) {
span2.onclick = function() {
  modal2.style.display = "none";
  }
}

if(span3) {
span3.onclick = function() {
  modal3.style.display = "none";
  }
}

if(span4) {
span4.onclick = function() {
  modal4.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modal2) {
    modal2.style.display = "none";
  } else if (event.target == modal3) {
    modal3.style.display = "none";
  } else if (event.target == modal4) {
    modal4.style.display = "none";
  }
}

