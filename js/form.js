document.addEventListener("DOMContentLoaded", function() {
    // Obtenemos los elementos del formulario y los botones de navegación
    var form = document.getElementById("msform");
    var fieldsets = form.querySelectorAll("fieldset");
    var progressBar = document.getElementById("progressbar");
    var nextButtons = form.querySelectorAll(".next");
    var prevButtons = form.querySelectorAll(".previous");

    var currentFieldset = 0;

    // Función para avanzar al siguiente paso
    function nextStep() {
        if (currentFieldset < fieldsets.length - 1) {
            fieldsets[currentFieldset].style.display = "none";
            progressBar.children[currentFieldset].classList.remove("active");
            currentFieldset++;
            fieldsets[currentFieldset].style.display = "block";
            progressBar.children[currentFieldset].classList.add("active");
        }
    }

    // Función para retroceder al paso anterior
    function prevStep() {
        if (currentFieldset > 0) {
            fieldsets[currentFieldset].style.display = "none";
            progressBar.children[currentFieldset].classList.remove("active");
            currentFieldset--;
            fieldsets[currentFieldset].style.display = "block";
            progressBar.children[currentFieldset].classList.add("active");
        }
    }

    // Asociamos las funciones a los eventos de clic
    nextButtons.forEach(function(button) {
        button.addEventListener("click", nextStep);
    });

    prevButtons.forEach(function(button) {
        button.addEventListener("click", prevStep);
    })
})