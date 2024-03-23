const login = document.querySelector(".login-link")
const register = document.querySelector(".register-link")
const btnLogin = document.querySelector("#btn-login")


const contenedorRegister = document.querySelector(".register")
const contenedorLogin = document.querySelector(".login")
const cerrar = document.querySelector(".cerrar")

//Desplegar iniciar y registrarse
login.addEventListener("click", mostrarLogin)
register.addEventListener("click", mostrarRegister)
cerrar.addEventListener("click", ()=>{
    contenedorLogin.style.display = "none"
    contenedorRegister.style.display = "none"
    document.querySelector(".defuminado").style.filter = "blur(0px)"
})

/* btnLogin.addEventListener("click", ()=>{
    window.location = "../UserPage/index.html"
}) */


const abrirSesion = () =>{
    contenedorLogin.style.display = "block"
    contenedorRegister.style.display = "none"
    document.querySelector(".defuminado").style.filter = "blur(3px)"
}

const abrirRegister = () =>{
    contenedorLogin.style.display = "none"
    contenedorRegister.style.display = "block"
    document.querySelector(".defuminado").style.filter = "blur(3px)"
}

function mostrarRegister(){
    contenedorLogin.style.display = "none"
    contenedorRegister.style.display = "block"
}

function mostrarLogin(){
    contenedorRegister.style.display = "none"

    contenedorLogin.style.display = "block"
}

