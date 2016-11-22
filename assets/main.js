////////////////////////////////////////////////////////////////////////////////
//                                                          Header callbacks  //
////////////////////////////////////////////////////////////////////////////////

// add home and github buttons (English language by default)
$(".header").append("<a class='header-button home' href='https://francois-thierry.github.io/'><img src='../assets/img/home.svg'></a>")
$(".header").append("<a class='header-button github'><img src='../assets/img/mark-github.svg'></a>")

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
//                                                          Row-Plot actions  //
////////////////////////////////////////////////////////////////////////////////

$(".infos-action").on("click", function(){
  if ($(".caption.infos").hasClass("visible")) {
    $(".caption.infos").removeClass("visible");
    $(".caption.infos").css("visibility", "hidden");
  } else {
    $(".caption.infos").addClass("visible");
    $(".caption.infos").css("visibility", "visible");
  }
})

////////////////////////////////////////////////////////////////////////////////
//                                                                    Details //
////////////////////////////////////////////////////////////////////////////////

// $(".detailsSection h3").on("click", function(){
//   if ($(".detailsSection .details").hasClass("visible")) {
//     $(".detailsSection .details").removeClass("visible");
//     $(".detailsSection .details").css("display", "none");
//   } else {
//     $(".detailsSection .details").addClass("visible");
//     $(".detailsSection .details").css("display", "block");
//   }
// })

    $(".detailsSection h3").on('click', function () {
      if ($('.detailsSection .details').hasClass('active')) {
        $('.detailsSection .details').slideToggle(300);
        $('.detailsSection .details').removeClass('active');
      } else {
        $('.detailsSection .details').addClass('active');
        $('.detailsSection .details').slideToggle(500);
      }
      //   $('div.CV-content').slideToggle(1000);
      //   $('html, body').animate({scrollTop:$("#CV-link").offset().top+4}, 1000);
      //   if ($('div.CV-content').hasClass('active')) {
      //   $('div.CV-content').removeClass('active');
      // } else {
      //   $('div.CV-content').addClass('active');
      // }
    });

////////////////////////////////////////////////////////////////////////////////
//                                                                      Misc  //
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

// http://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

// Author:  Jacek Becela
// Source:  http://gist.github.com/399624
// License: MIT

jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {
  return this.each(function(){
    var clicks = 0, self = this;
    jQuery(this).click(function(event){
      clicks++;
      if (clicks == 1) {
        setTimeout(function(){
          if(clicks == 1) {
            single_click_callback.call(self, event);
          } else {
            double_click_callback.call(self, event);
          }
          clicks = 0;
        }, timeout || 300);
      }
    });
  });
}

// http://jsfiddle.net/cpbwx5vr/1/
function makeDoubleClick(doubleClickCallback, singleClickCallback) {
    var clicks = 0, timeout;
    return function() {
        clicks++;
        if (clicks == 1) {
            singleClickCallback && singleClickCallback.apply(this, arguments);
            timeout = setTimeout(function() { clicks = 0; }, 400);
        } else {
            timeout && clearTimeout(timeout);
            doubleClickCallback && doubleClickCallback.apply(this, arguments);
            clicks = 0;
        }
    };
}

// getNextKey = function(key) {
//   // http://stackoverflow.com/questions/2256607/how-to-get-the-next-letter-of-the-alphabet-in-javascript
//   if (key === 'Z' || key === 'z') {
//     return String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25); // AA or aa
//   } else {
//     var lastChar = key.slice(-1);
//     var sub = key.slice(0, -1);
//     if (lastChar === 'Z' || lastChar === 'z') {
//       // If a string of length > 1 ends in Z/z,
//       // increment the string (excluding the last Z/z) recursively,
//       // and append A/a (depending on casing) to it
//       return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
//     } else {
//       // (take till last char) append with (increment last char)
//       return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
//     }
//   }
//   return key;
// };