import {getData} from "../connection/api.js"
const usuarios = await getData()

const segundoBloque = document.querySelector('.containerAllSecondBlock')
const containerAll = document.querySelector('.swiper')
const buscar = document.querySelector('.buscar')
const search = document.querySelector(".buscador")


const handleScroll = () => {
    {

        const scrollPosition = window.scrollY
        const segundoBloqueY = segundoBloque.offsetTop
        const containerPosition = containerAll.offsetTop;
    
        const firstImage = document.querySelector('.firstImgBlock')
        const secondImage = document.querySelector('.secondImgBlock')

        while (scrollPosition > containerPosition && scrollPosition < segundoBloqueY){
    
            
            const leftOffSet = -scrollPosition * 0.12
            const rightOffSet = scrollPosition * 0.12
        
            firstImage.style.transform = `translateX(${leftOffSet}px)`
            secondImage.style.transform = `translateX(${rightOffSet}px)`
            firstImage.style.transition = `ease-in-out 1.5s` 
            secondImage.style.transition = `ease-in-out 1.5s`    

            break;
        }
        
        
     }
}
document.addEventListener('scroll', handleScroll)

buscar.addEventListener("click", () =>{
    //Que el icono de buscar salga 
    if(search.classList.contains("activo")){
        search.style.display = "none"
        search.classList.remove("activo")
    }else{
        search.style.display = "block"
        search.classList.add("activo")
    }
 })


// function comprobarSesion(){
//     const options = document.querySelector(".options")
//     const sesion = JSON.parse(localStorage.getItem("sesion")) || ""
//     // const usuarios = JSON.parse(localStorage.getItem("registros")) || []
//     //Validación inicio de sesión
//     const validacion = usuarios.some(usuario => usuario.email == sesion.usuario)
//     console.log(usuarios)
//     console.log(validacion);
//     if(validacion == true){
//         options.remove()
//         const resultado = usuarios.filter(usuario => usuario.email == sesion.usuario)
        
//         const options2 = document.createElement("div")
//         options2.classList.add("options")
//         const h2 = document.createElement("h2")
//         const a1 = document.createElement("a")
//         const a2 = document.createElement("a")
//         h2.textContent = `${resultado[0].username}`
//         a1.textContent = "editar perfil"
//         a1.href = "../UserPage/index.html"
//         a2.textContent = "cerrar sesion"
//         a2.href = "#"
//         options2.appendChild(h2)
//         options2.appendChild(a1)
//         options2.appendChild(a2)
//         document.querySelector(".custom-select").appendChild(options2)

//         a2.addEventListener("click", ()=>{
//             localStorage.removeItem("sesion")
//             window.location = "index.html"
//         })
//     }

// }

//Swiper
let swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
      color: "orange"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

// document.addEventListener("DOMContentLoaded", ()=>{
//     comprobarSesion()
// })



const filtroHombre = document.querySelector("#filtroHombre")
const filtroMujer = document.querySelector("#filtroMujer")
console.log(filtroHombre);


    filtroHombre.addEventListener("click", (e)=>{
        localStorage.setItem("genero", e.target.getAttribute("genero")) 
    })

    filtroMujer.addEventListener("click", (e)=>{

        localStorage.setItem("genero", e.target.getAttribute("genero")) 
    })

    
// comprobarSesion()