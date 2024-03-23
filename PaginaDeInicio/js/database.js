import {getData,sendData} from "../connection/api.js"

const btn_login = document.querySelector(".login")
const btn_register = document.querySelector(".register")

const usuariosAll = await getData()


document.querySelector("#show1").addEventListener("click", mostrarPassword)
document.querySelector("#show2").addEventListener("click", mostrarPassword)


// btn_register.addEventListener("submit", guardarUsuario)
btn_login.addEventListener("submit", iniciarSesion)

// function guardarUsuario(e){
//     e.preventDefault()
//     let username = document.querySelector("#username").value
//     let email = document.querySelector("#email").value
//     let password = document.querySelector("#password").value
//     let confirm = document.querySelector("#confirm").value

//     if(password == confirm){
//         const newUser = {
//             username,
//             email,
//             password
//         }

//         setTimeout(()=>{
//             sendData(newUser)
    
//             document.querySelector("#username").value = "";
//             document.querySelector("#email").value = "";
//             document.querySelector("#password").value = "";
//             document.querySelector("#confirm").value = "";
//         }, 2000)

//         Swal.fire({
//             title: "Te has registrado con exito",
//             text: "Bienvenido a la familia essential shoes",
//             imageUrl: "imagenes/458_icons-01.jpg",
//             width: 700,
//             height: 500,
//             imageWidth: 200,
//             imageHeight:200,
//             backdrop: `
//             rgba(0,0,0,0.7)
//             no-repeat
//           `,
//           });
          

    
//     }else{
//         Swal.fire({
//             text: "Las contraseñas no coinciden",
//             icon: "error"
//           });
//     }
// }

function iniciarSesion(e){
    e.preventDefault()
    const email = document.querySelector("#email1").value
    const password = document.querySelector("#password1").value
    let validate = false

    usuariosAll.forEach(usuario =>{
        if(usuario.email == email && usuario.password == password){
            validate = true
            const sesion = {
                "usuario": usuario.email
            }

            localStorage.setItem("sesion", JSON.stringify(sesion))
            window.location = "../UserPage/index.html"
        }

    })

    if(validate != true){
        Swal.fire({
            text: "Correo o contraseña incorrectos",
            icon: "error"
          });
    }
}

function mostrarPassword(){
    const check = document.querySelector("#check")
    const check1 = document.querySelector("#check1")
    const password1 = document.querySelector("#password1")
    const password = document.querySelector("#password")
    if(check.checked){
        password1.type = "text"
    }else{
        password1.type = "password"
    }
    if(check1.checked){
        password.type = "text"
    }else{
        password.type = "password"
    }
}
