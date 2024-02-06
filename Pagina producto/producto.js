

const stars = document.querySelectorAll('.star')
const formulario = document.querySelector('.reviewTest')
const botonReview = document.querySelector('.reviewButton')
const closeButton = document.querySelector('.closeButton')

let useValue;
let sizeValue;
let expectValue;
let url = 'http://localhost:4002/resenas'

let swiper = new Swiper(".carouselContent ", {

    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
},

});

stars.forEach(function(star, index) {
    star.addEventListener('click', () => {
        for(i = 0; i<=index; i++ ){
            stars[i].classList.add('checked')
        }
        for(i = index + 1; i < stars.length; i++){
            stars[i].classList.remove('checked')
        }
    })
})

const expect = document.querySelector('.expect')
expect.addEventListener('input', (e) => {

    if(e.target.value == 'Si'){

        expectValue = e.target.value;

    } else if (e.target.value == 'No'){

        expectValue = e.target.value;
    }

})
const use = document.querySelector('.use')
use.addEventListener('input', (e) => {

    if(e.target.value == 'Deporte'){

        useValue = e.target.value;
    } else if (e.target.value == 'Vestir'){

        useValue = e.target.value;
    }

})

const size = document.querySelector('.size')
size.addEventListener('input', (e) => {

    if(e.target.value == 'Pequeña'){

        sizeValue = e.target.value;

    } else if (e.target.value == 'Perfecta'){

        sizeValue = e.target.value;

    } else if (e.target.value == 'Grande'){

        sizeValue = e.target.value;
    }
})

botonReview.addEventListener ('click', () => {

    formulario.classList.add('mostrar')
    document.body.classList.add('overflow-hidden')
})

closeButton.addEventListener('click', () => {

    formulario.classList.remove('mostrar')
    document.body.classList.remove('overflow-hidden')
})

formulario.addEventListener('submit', async (e) => {

    e.preventDefault()

    let generalReview = document.querySelector('#general').value;
    let confort = document.querySelector('#confort').value
    let apodo = document.querySelector('#apodo').value

    let resena = {

        expectativa: expectValue,
        valoracion: generalReview,
        sizeValoracion: sizeValue,
        comodidad: confort,
        Uso: useValue,
        Apodo: apodo,
    }

     try {
        await fetch(url, {
            method:'POST',
            body: JSON.stringify(resena),
            'Content-Type':'application/json'

        })
        } catch(error){

            console.log(error)

        }
})