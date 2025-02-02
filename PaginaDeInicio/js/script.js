import {getData} from "../connection/api.js"
const usuarios = await getData()

const segundoBloque = document.querySelector('.containerAllSecondBlock')
const containerAll = document.querySelector('.swiper')
const buscar = document.querySelector('.buscar')
const search = document.querySelector(".buscador")
const login = document.querySelector('.formLogin')
const register = document.querySelector('.formRegister')

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

register.addEventListener('submit', () => {

    const username = document.querySelector('#username').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const registro = {

        name:username,
        email: email,
        password: password
    }

    fetch('http://localhost:4000/registro', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(registro)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('ERROR INICIO DE SESION RESPONSE');
        }
        response.json()
    })
    .then(data => {
        console.log(data)

        window.location.href = './index.html,,'
    })
})

login.addEventListener('submit',  async () => {

    try {
        const email = document.getElementById('email1').value
        const password = document.getElementById('password1').value

        const inicio = {
            email: email,
            password: password,
        }

        
    const response = await fetch('http://localhost:4000/inicios', {
            method: "POST",
            headers: {
                'Content-Type':"application/json",
            },
            body: JSON.stringify(inicio),   
        })
       
        if(response.ok){
            const data = await response.json()
            localStorage.setItem('refresh', data.refreshToken);
            localStorage.setItem('access', data.accessToken);  

        } else {

            console.error('Error en el inicio de sesión, creación de tokens')
        }


    } catch(error){
            console.error('Error inicio de sesion inicial', error)
    }
})

async function refresh(){
    const refreshToken = localStorage.getItem('refresh')
    const response = fetch('http://localhost:4000/refresh', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(refreshToken)
    })

    if(response.ok){
        const {accessToken} = await response.json()
        localStorage.setItem('access', accessToken)
    } else {
        console.error('TOKEN INVALIDADO O DESHABILITADO, REFRESH ACCESS')
    }

}

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
//     const user = () => {
//         fetch('http://localhost:3000/foundSome')
//         .then
//     }
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

const filtroHombre = document.querySelector("#filtroHombre")
const filtroMujer = document.querySelector("#filtroMujer")
console.log(filtroHombre);

filtroHombre.addEventListener("click", (e)=>{
        localStorage.setItem("genero", e.target.getAttribute("genero")) 
})

filtroMujer.addEventListener("click", (e)=>{

        localStorage.setItem("genero", e.target.getAttribute("genero")) 
})
