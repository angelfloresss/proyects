function scrollToSection(sectionId, yOffset) {
  var section = document.getElementById(sectionId);
  
  if (section) {
    var y = section.getBoundingClientRect().top + window.pageYOffset 
    + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
  
function addScrollEvent(linkId, sectionId, yOffset) {
  document.getElementById(linkId).addEventListener('click', function (e) {
    e.preventDefault();
    scrollToSection(sectionId, yOffset);
  });
}
  
addScrollEvent('scrollBtn', 'acerca', -68);
addScrollEvent('aboutLink', 'acerca', -68);
addScrollEvent('portfolioLink', 'portafolio', -68);
addScrollEvent('contactLink', 'contacto', -68);

((d) => {
   const $form = d.querySelector(".contact-form"),
     $loader = d.querySelector(".contact-form-loader"),
     $response = d.querySelector(".contact-form-response");
 
   $form.addEventListener("submit", (e) => {
     e.preventDefault();
     $loader.classList.remove("none");
     fetch("https://formsubmit.co/ajax/achavarria16@alumnos.uaq.mx", {
       method: "POST",
       body: new FormData(e.target),
     })
       .then((res) => (res.ok ? res.json() : Promise.reject(res)))
       .then((json) => {
         console.log(json);
         location.hash = "#gracias";
         $form.reset();
       })
       .catch((err) => {
         console.log(err);
         let message =
           err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
         $response.querySelector("h3")
         .innerHTML = `Error ${err.status}: ${message}`;
       })
       .finally(() => {
         $loader.classList.add("none");
         setTimeout(() => {
           location.hash = "#close";
         }, 3000);
       });
   });
})(document);