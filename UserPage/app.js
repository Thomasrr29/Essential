import { getData } from "../PaginaDeInicio/connection/api.js"
import { getFavorites } from "../favoritos/connection/api.js"

const datos = await getData()

const botonDatos = document.querySelector('.buttonDatos')
const botonPedidos = document.querySelector('.buttonPedidos')
const botonTalla = document.querySelector('.buttonPuntos')

const containerData = document.querySelector('.containerData')
const containerPedidos = document.querySelector('.infoPedidos')
const containerPuntos = document.querySelector('.containerEssentials')
const containerHistory = document.querySelector('.containerHistory')
const containerItems = document.querySelector('.containerItems')
const historyPoints = document.querySelector('.historyPoints')

const options = document.querySelector('.optionNav')
const contain = document.querySelectorAll('.div1')
const datosData = document.querySelector('.datosData')
const botonPuntos = document.querySelector('.points')

let tipo;

validacion(containerData)


botonPuntos.addEventListener('click', () => {

    const desplegablePuntos = document.querySelector('.sectionPoints')

        desplegablePuntos.classList.toggle('mostrar')

        arrow.style.transform = desplegablePuntos.classList.contains('mostrar') ? 'rotate(90deg)' : 'rotate(360deg)'
   
})

options.addEventListener('click', (e) => {

    if(e.target.classList.contains('select')){

        console.log('entre')

        tipo = e.target.getAttribute('tipo')

        if(tipo == 'datos'){

            validacion(containerData)

        } else if (tipo == 'pedidos'){

            validacion(containerPedidos)

        } else if (tipo == 'history'){

            validacion(containerHistory);
        } else if (tipo == 'items') {

            validacion(containerItems)

        }
    }
})

function validacion (contenedorson){

    contain.forEach((container) => {

        if (container == contenedorson){ 
            container.style.display = 'block'
        }
        else {
            container.style.display = 'none'
        }
    })

}

validar()
comprobarSesion()

function validar(){
    
    // const datos = JSON.parse(localStorage.getItem("registros")) || []
    const sesion = JSON.parse(localStorage.getItem("sesion")) || ""

    const filtrado = datos.filter(dato => dato.email == sesion.usuario)

    filtrado.forEach((e) => {

        datosData.innerHTML = `

        <div class='datosProfile'>
            <div class="dataNombre dataGroup">
                <h3>Nombre:</h3>
                <h4>${e.username}</h4>
            </div>
        
            <div class="dataCorreo dataGroup">
                <h3>Correo:</h3>
                <h4>${e.email}</h4>
            </div>
        
            <div class="dataContrasena dataGroup">
                <h3>Contraseña: </h3>
                <h4>${e.password}</h4>
            </div>
        </div>`

    })
}

function comprobarSesion(){
    const options = document.querySelector(".options")
    const sesion = JSON.parse(localStorage.getItem("sesion")) || ""
    // const usuarios = JSON.parse(localStorage.getItem("registros")) || []
    
    const validacion = datos.some(usuario => usuario.email == sesion.usuario)

    if(validacion == true){
        options.remove()
        const resultado = datos.filter(usuario => usuario.email == sesion.usuario)
        
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
            window.location = "../PaginaDeInicio/index.html"
        })
    }

}



async function cargarPedidos(){
    let urlPedido = "http://localhost:4002/pedidos"

    const pedidos = await getFavorites(urlPedido)
    const tbody = document.querySelector("#rellenarPedidos")
    pedidos.forEach(pedido =>{
        const{id,referencia,total,fecha,estado,puntos} = pedido
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${id}</td>
        <td>${fecha}</td>
        <td>${total}</td>
        <td>${referencia}</td>
        <td>${estado}</td>
        <td>${puntos}</td>
    `
    tbody.appendChild(tr)
    })
}


cargarPedidos()