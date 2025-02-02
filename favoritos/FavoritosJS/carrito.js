import { getFavorites } from "../connection/api.js"
import { getData } from "../../PaginaDeInicio/connection/api.js"


let url = "http://localhost:4000/carrito"
let totalPagar = 0
let referencias = ""

async function cargarCarrito() {
    const carrito = await getFavorites(url)
    const tbody = document.querySelector("tbody")
    carrito.forEach(producto => {
        const { id, img, title, price } = producto
        referencias += title + ", "
        const tr = document.createElement("tr")
        totalPagar += parseInt(price)
        tr.innerHTML = `
            <td>${id}</td>
            <td><img src="${img}" width="100px"></td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${1}</td>
            <td><button idProducto=${id}>X</button></td>
        `
        tbody.appendChild(tr)
    });
    console.log(referencias);

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

                setTimeout(()=>{
                    fetch("http://localhost:4000/pedidos", {
                    method: "POST",
                    body: JSON.stringify(pedido),
                    "Content-Type": "application/json"
                })
                limpiarCarrito()
                window.location = "index.html"
                }, 3000)

                Swal.fire({
                    text: "compra realiazada con exito",
                    icon: "success"
                  });
               

             
            })
        } else {
            alert("debes iniciar sesion primero pa")
        }
        
    })
}

async function limpiarCarrito() {
    let urlCarrito = "http://localhost:4000/carrito"
    const Allcarrito = await getFavorites(url)
    Allcarrito.forEach(elemento => {
        fetch(`${urlCarrito}/${elemento.id}`, {
            method: 'DELETE',
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito()
})