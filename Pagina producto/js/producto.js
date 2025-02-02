

const stars = document.querySelectorAll('.star')
const formulario = document.querySelector('.reviewTest')
const botonReview = document.querySelector('.reviewButton')
const closeButton = document.querySelector('.closeButton')

let useValue;
let sizeValue;
let expectValue;
let url = 'http://localhost:4002/resenas'
let urlProductos = 'http://localhost:4000/productos'
let urlCarrito = 'http://localhost:4003/carrito'
let numero;

let swiper = new Swiper(".carouselContent ", {

    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
},

});
//Estrellas de reseñas
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

// const expect = document.querySelector('.expect')
// expect.addEventListener('input', (e) => {

//     if(e.target.value == 'Si'){

//         expectValue = e.target.value;

//     } else if (e.target.value == 'No'){

//         expectValue = e.target.value;
//     }

// })
// const use = document.querySelector('.use')
// use.addEventListener('input', (e) => {

//     if(e.target.value == 'Deporte'){

//         useValue = e.target.value;
//     } else if (e.target.value == 'Vestir'){

//         useValue = e.target.value;
//     }

// })

// const size = document.querySelector('.size')
// size.addEventListener('input', (e) => {

//     if(e.target.value == 'Pequeña'){

//         sizeValue = e.target.value;

//     } else if (e.target.value == 'Perfecta'){

//         sizeValue = e.target.value;

//     } else if (e.target.value == 'Grande'){

//         sizeValue = e.target.value;
//     }
// })

// botonReview.addEventListener ('click', () => {

//     formulario.classList.add('mostrar')
//     document.body.classList.add('overflow-hidden')
// })

// closeButton.addEventListener('click', () => {

//     formulario.classList.remove('mostrar')
//     document.body.classList.remove('overflow-hidden')
// })

// formulario.addEventListener('submit', async (e) => {

//     e.preventDefault()

//     let generalReview = document.querySelector('#general').value;
//     let confort = document.querySelector('#confort').value
//     let apodo = document.querySelector('#apodo').value

//     let resena = {

//         expectativa: expectValue,
//         valoracion: generalReview,
//         sizeValoracion: sizeValue,
//         comodidad: confort,
//         Uso: useValue,
//         Apodo: apodo,
//     }

//      try {
//         await fetch(url, {
//             method:'POST',
//             body: JSON.stringify(resena),
//             'Content-Type':'application/json'

//         })
//         } catch(error){

//             console.log(error)

//         }
// })

document.addEventListener('DOMContentLoaded',()=>{
    cargarRecomendacion()
    cargarPrincipal()
})

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

async function cargar(urlProductos){
    try{
        const productos = await fetch(urlProductos);  
        const daticos = await productos.json()
        
        return daticos
    } catch(error){
        console.log(error)
    }
}

//Numero aleatorio para recomendados
function numeroAleatorio (){

    return Math.floor( Math.random() * (28 - 1 + 1)) + 1;  
}

//Cargar producto seleccionado
function cargarPrincipal(){
    const principal = JSON.parse(localStorage.getItem('ProductClick'))
    console.log(principal);
    
    const containerProduct = document.querySelector('.containerProduct')

    principal.forEach((producto) => {
        const {id, imagen, nombre, detalles, precio, genero, categoria, descripcion, tallas} = producto

        containerProduct.innerHTML = `
        <div class="containerSection">
        <div class="containerImagen">
            <img src="../sneakers/${imagen}" > 
        </div>

        <div class="InfoAll">

            <div class="containerInfo">

                <div class="tituloInfo">
                    <h3> ${nombre} </h3>
                    <p class="details">${detalles}</p>
                    <p class="precio">$${precio}</p>
                </div>

                <div class="tallaContain">

                    <h3 class="titleTallas">Tallas</h3>

                    <div class='tallas'>

                    </div>

                    <div class="containerButtons">
                            
                            <div class="buttons">
        
                                <div class="details button">
                                    <button>detalles</button>
                                </div>
                                <div class="Cart button">
                                    <button>Añadir al carrito</button>
                                </div>
                            </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="containerDescription">
            
        <div class="description">
            <p>${descripcion}</p>
        </div>
    </div>`

//Agregar todas las tallas disponibles en el JSON
        tallas.forEach((tallo) => {
        const tallasContain = document.querySelector('.tallas')
        const talla = document.createElement('div')
        talla.classList.add('talla')
        talla.innerHTML = `<p>${tallo}</p>`
        tallasContain.appendChild(talla)
        console.log(tallas)
        })

     
    })

    const tallaBox = document.querySelectorAll('.talla')
    tallaBox.forEach((e) => {
        e.addEventListener('click', () => {
            e.classList.toggle('active')
        })
    })
    //Agregar cuando le de click añadir al carrito a el JSON
    const buttonCart = document.querySelector('.Cart')
        buttonCart.addEventListener('click', () => {
            let sneakers = JSON.parse(localStorage.getItem('ProductClick'))
            const sneakerNew = sneakers[0]
            const favorite = fetch(urlCarrito, {
                method:'POST',
                body: JSON.stringify(sneakerNew),
                "Content-Type":"application/json"
            })
           
        } )

}





