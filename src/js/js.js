let knapptexter = ["Kvack kvack! Här är din and.", "Kvack kvack! Kvack Kvack! Många änder!!! Här är dina ankor också.", "Förstår, det är för många ankor och änder. Vi finns här för dig och kommer snart till undsättning."];
let texttexter = ["Nej, du ska inte trycka här! Tryck på andknapparna!", "Kvack kvack! Kvack Kvack! Önskar du dig verkligen ankor? ;)", "Behöver du undsättas? Be då om en gåsattack!"];

document.getElementById("duckButton").addEventListener("click", function () {
  alert(knapptexter[0]);
});

document.getElementById("ducksButton").addEventListener("click", function () {
  alert(knapptexter[1]);
});

document.getElementById("helpButton").addEventListener("click", function () {
  alert(knapptexter[2]);
});

document.getElementById("geeseButton").addEventListener("click", function () {
  var element = document.getElementById('geese_attack');
  element.classList.remove('change_size_animation');

  setTimeout(function () {
    element.classList.add('change_size_animation');
  }, 0);

});


// Hämta alla element med klassen 'animation_text'
let elements = document.getElementsByClassName("animation_text");

// Loopa igenom alla hämtade element
for (let i = 0; i < elements.length; i++) {
  // Lägg till en klick-händelselyssnare till varje element
  elements[i].addEventListener("click", function () {
    alert(texttexter[i]);

  });
}