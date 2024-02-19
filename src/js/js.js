let knapptexter = ["Kvack kvack! Här är din and.", "Kvack kvack! Kvack Kvack! Många änder!!! Här är dina ankor också.", "Förstår, det är för många ankor och änder. Vi finns här för dig och kommer snart till undsättning.", "Wow, du är en riktig fågelvän! Här är dina gäss. De jagar bort ankor och änder. Ditt liv är nu räddat av oss och våra tappra gäss."];


document.getElementById("duckButton").addEventListener("click", function() {
    alert(knapptexter[0]);
  });
  
  document.getElementById("ducksButton").addEventListener("click", function() {
    alert(knapptexter[1]);
  });

  document.getElementById("helpButton").addEventListener("click", function() {
    alert(knapptexter[2]);
  });

  document.getElementById("geeseButton").addEventListener("click", function() {
    alert(knapptexter[3]);
  });





// Hämta alla element med klassen 'animation_text'
let elements = document.getElementsByClassName("animation_text");

// Loopa igenom alla hämtade element
for (let i = 0; i < elements.length; i++) {
  // Lägg till en klick-händelselyssnare till varje element
  elements[i].addEventListener("click", function() {
    alert(knapptexter[i]);
    
  });
}