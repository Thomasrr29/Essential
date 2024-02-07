
const stars = document.querySelectorAll('.star')
const formulario = document.querySelector('.reviewTest')
const botonReview = document.querySelector('.reviewButton')
const closeButton = document.querySelector('.closeButton')

let useValue;
let sizeValue;
let expectValue;
let url = 'http://localhost:4002/resenas'
let urlProductos = 'http://localhost:4000/productos'

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

document.addEventListener('DOMContentLoaded', cargarRecomendacion)


async function cargarRecomendacion (){

    const cardWrapper = document.querySelector('.cardWrapper')

    while(cardWrapper.children.length < 8){

        try{
            let productosAleatorios = await cargar(urlProductos)
            
            
            productosAleatorios.forEach((e) => {
    
                numero = numeroAleatorio()

                if (e.id == numero){

                    const cardCarousel = document.createElement('div')
                    cardCarousel.classList.add('cardCarousel')
                    cardCarousel.classList.add('swiper-slide')
        
                    cardCarousel.innerHTML = `
                        <div class="cardContentImage">
                            <span class="overlay"></span>
                            <div class="cardImageCar">
                                <img src="../sneakers/${e.imagen}" alt="" class="cardImg">
                            </div>
                        </div>
                        <div class="cardContent">
                            <h2>${e.nombre}</h2>
                            <h4>${e.detalles}</h4>
                            <p>$${e.precio}</p>
                            <div class="buttonsCard">
                                <button class="button">Comprar</button>
                            </div>
                        </div>`
        
                    console.log(cardCarousel)
                    cardWrapper.appendChild(cardCarousel)
                }  
            
            })
        } catch(error){
            console.log(error)
        }           
    }
}


async function cargar(url){
    try{
        const productos = await fetch(urlProductos);  
        const daticos = await productos.json()
        
        return daticos
    } catch(error){
        console.log(error)
    }
}
          
function numeroAleatorio (){

    return Math.floor( Math.random() * (28 - 1 + 1)) + 1;  
}