// OBTENER REFERENCIAS A LOS BOTONES Y ELEMENTOS DEL SLIDER
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');
let countryLink = document.getElementById('country-link');

// MOVER EL PRIMER ELEMENTO MINIATURA AL FINAL
thumbnail.appendChild(thumbnailItems[0]);

// ASIGNAR EVENTO CLICK AL BOTÓN SIGUIENTE
nextBtn.onclick = function() {
    moveSlider('next');
}

// ASIGNAR EVENTO CLICK AL BOTÓN ANTERIOR
prevBtn.onclick = function() {
    moveSlider('prev');
}

// FUNCIÓN PARA CAPITALIZAR PALABRAS
function capitalizeWords(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

// FUNCIÓN PARA NORMALIZAR STRING
function normalizeString(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ACTUALIZAR ENLACE DEL PAÍS
function updateCountryLink() {
    let currentItem = sliderList.querySelector('.item:nth-child(1)'); 
    let countryName = currentItem.querySelector('.type').textContent; 
    let formattedCountryName = capitalizeWords(countryName);
    let normalizedCountryName = normalizeString(countryName);
    countryLink.textContent = formattedCountryName;
    countryLink.href = `./pages/${normalizedCountryName.toLowerCase().replace(/ /g, '-')}.html`; 
}

// FUNCIÓN PARA MOVER EL SLIDER
function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');
    
    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    // ELIMINAR CLASES Y ACTUALIZAR EL ENLACE DEL PAÍS DESPUÉS DE LA ANIMACIÓN
    slider.addEventListener('animationend', function() {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
        updateCountryLink(); // ACTUALIZA EL ENLACE DEL PAÍS DESPUÉS DE MOVER EL SLIDER
    }, { once: true }); // ELIMINAR EL EVENTO UNA VEZ QUE SE EJECUTA
}

// INICIALIZAR EL ENLACE DEL PAÍS EN LA CARGA INICIAL
updateCountryLink();
