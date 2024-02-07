import {getData} from "../PaginaDeInicio/connection/api.js"

const usuarios = await getData()


const filtroHombre = document.querySelector("#filtroHombre")
const filtroMujer = document.querySelector("#filtroMujer")
console.log(filtroHombre);


    filtroHombre.addEventListener("click", (e)=>{
        localStorage.setItem("genero", e.target.getAttribute("genero")) 
    })

    filtroMujer.addEventListener("click", (e)=>{

        localStorage.setItem("genero", e.target.getAttribute("genero")) 
    })


 function comprobarSesion(){
    const options = document.querySelector(".options")
    const sesion = JSON.parse(localStorage.getItem("sesion")) || ""
    // const usuarios = JSON.parse(localStorage.getItem("registros")) || []
    
    const validacion = usuarios.some(usuario => usuario.email == sesion.usuario)
    console.log(usuarios)
    console.log(validacion);
    if(validacion == true){
        options.remove()
        const resultado = usuarios.filter(usuario => usuario.email == sesion.usuario)
        
        const options2 = document.createElement("div")
        options2.classList.add("options")
        const h2 = document.createElement("h2")
        const a1 = document.createElement("a")
        const a2 = document.createElement("a")
        h2.textContent = `${resultado[0].username}`
        a1.textContent = "editar perfil"
        a1.href = "../UserPage/index.html"
        a2.textContent = "cerrar sesion"
        a2.href = "#"
        options2.appendChild(h2)
        options2.appendChild(a1)
        options2.appendChild(a2)
        document.querySelector(".custom-select").appendChild(options2)

        a2.addEventListener("click", ()=>{
            localStorage.removeItem("sesion")
            window.location = "products.html"
        })
    }

}

comprobarSesion()