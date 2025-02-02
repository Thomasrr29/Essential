import { getFavorites } from "../connection/api.js"
import { getData } from "../../PaginaDeInicio/connection/api.js"

//codigo exotico xd

let url = "http://localhost:4003/carrito"
let totalPagar = 0
let referencias = ""

async function cargarCarrito() {
    const carrito = await getFavorites(url)
    const tbody = document.querySelector("tbody")
    carrito.forEach(producto => {
        const { id, imagen, nombre, precio } = producto
        referencias += nombre + ", "
        const tr = document.createElement("tr")
        totalPagar += parseInt(precio)
        tr.innerHTML = `
            <td>${id}</td>
            <td><img src="../sneakers/${imagen}" width="100px"></td>
            <td>${nombre}</td>
            <td>$${precio}</td>
            <td>${1}</td>
            <td><button idProducto=${id}>X</button></td>
        `
        tbody.appendChild(tr)
    });


    const botonEliminar = document.querySelectorAll("tbody tr td button")
    botonEliminar.forEach(boton =>{
        boton.addEventListener("click", (e) =>{
            const id = e.target.getAttribute("idProducto")
            let urls = "http://localhost:4003/carrito"
            fetch(`${urls}/${id}`, {
                method: "DELETE"
            })
        })
    })

    document.querySelector(".total").textContent = totalPagar

    const comprado = document.querySelector(".comprado")
    comprado.addEventListener("click", async () => {
        const usuarios = await getData()
        const sesion = JSON.parse(localStorage.getItem("sesion")) || ""
        const validacion = usuarios.some(usuario => usuario.email == sesion.usuario)
        console.log(validacion);
        if (validacion == true) {
            const resultado = usuarios.filter(usuario => usuario.email == sesion.usuario)
            resultado.forEach(elemento => {
                let fechaActual = new Date().getTime();
                let idAleatorio = fechaActual.toString().slice(-7);

                let fechaDeHoy = new Date();

             
                let dia = fechaDeHoy.getDate();
                let mes = fechaDeHoy.getMonth() + 1;
                let year = fechaDeHoy.getFullYear();


                var fechaFormateada = dia + '/' + mes + '/' + year;

                console.log("Fecha de hoy: " + fechaFormateada);

                const pedido = {
                    id: idAleatorio,
                    referencia: referencias,
                    total: totalPagar,
                    fecha: fechaFormateada,
                    estado: "despachado",
                    puntos: "+100"
                }

                    fetch("http://localhost:4002/pedidos", {
                    method: "POST",
                    body: JSON.stringify(pedido),
                    "Content-Type": "application/json"
                    })
 

  
                Swal.fire({
                    text: "compra realiazada con exito",
                    icon: "success"
                  });
                  limpiarCarrito()
                    window.location = "index.html"      


            })
        } else {
            alert("debes iniciar sesion primero pa")
        }
        
    })
}

async function limpiarCarrito() {
    let urlCarrito = "http://localhost:4003/carrito"
    const Allcarrito = await getFavorites(url)
    console.log(Allcarrito);
    Allcarrito.forEach(elemento => {
        fetch(`${urlCarrito}/${elemento.id}`, {
            method: 'DELETE',
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito()
})