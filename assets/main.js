//                                                            Language selection
////////////////////////////////////////////////////////////////////////////////

// add language buttons (English language by default)
$(".header").append("<p class='language-button'>EN</p>")
$(".header").append("<p class='language-button'>FR</p>")

// if no language cookie exists
if (!getCookie("language")) {
  // stores the language cookie with default value for 1 day
  setCookie("language", "EN", 1);
};

// highlight button of selected language
$(".language-button").filter(function(){
  return this.innerHTML == getCookie("language");
}).addClass("selected");

// change page title
document.title = $("title."+getCookie("language")).text();

// hide both version of the website
$(".FR, .EN").css("display", "none");

// display the selected language version of the website
$("."+getCookie("language")).css("display", "inline-block");

// select language callback
$(".language-button").on("click", function(event) {
  // change window title
  document.title = $("title."+this.innerHTML).text();
  // unselect both languages
  $(".language-button").removeClass("selected");
  // hide both version of the website
  $(".FR, .EN").css("display", "none");
  // current language button in bold
  $(this).addClass("selected");
  // display the selected language version of the website
  $("."+this.innerHTML).css("display", "inline-block");
  // remember the language selection
  setCookie("language", this.innerHTML, 1);
});

////////////////////////////////////////////////////////////////////////////////

function shuffle(array) {
  // https://bost.ocks.org/mike/shuffle/
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// Element to move, time in ms to animate
function scrollTo(element, duration) {
    var e = document.documentElement;
    if(e.scrollTop===0){
        var t = e.scrollTop;
        ++e.scrollTop;
        e = t+1===e.scrollTop--?e:document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if(typeof from === "object")from=from.offsetTop;
    if(typeof to === "object")to=to.offsetTop;

    scrollToX(element, from, to, 0, 1/duration, 20, easeOutCuaic);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed<= 0) {
        element.scrollTop = xTo;
        return;
    }
    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;

    setTimeout(function() {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}
function easeOutCuaic(t){
    t--;
    return t*t*t+1;
}

var downloadFile = function(json) {
  window.URL = window.webkitURL || window.URL;
  $("#downloadLink").html("");

  var bb = new Blob([JSON.stringify(json)], {type:'text/plain'});

  var a = document.createElement('a');
  a.download = "entertaining_things.json";
  a.href = window.URL.createObjectURL(bb);
  a.textContent = 'Download ready';

  a.style.fontSize = "2em";

  a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');

  $("#downloadLink").css("padding-top", "3em");
  $("#downloadLink").append(a);

  a.onclick = function(e) {
    if ('disabled' in this.dataset) {
      return false;
    }

    // cleanUp(this);
  };
};

// http://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
} 