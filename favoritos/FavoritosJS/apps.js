import { getProducts, guardarFavoritos, getFavorites, guardarCarrito} from "../connection/api.js";
import{cargarComparados} from "./favoritos.js"


const counterFavorites = document.querySelector('.counter-favorite');
const btnClose = document.querySelector('#btn-close');
const buttonHeaderFavorite = document.querySelector('#button-header-favorite');
const buttonHeaderCarrito = document.querySelector("#button-header-carrito")
const containerListFavorites = document.querySelector('.container-list-favorites');
const listFavorites = document.querySelector('.list-favorites');

let urlProductos = 'http://localhost:3000/productos'
let urlComparison = 'http://localhost:4004/comparados'

let totalPagar = 0

const showHtml = async () => {

	const card_product = document.querySelectorAll(".card-product")
	let url = "http://localhost:3000/productos"
	const favoritos = await getFavorites(url)
	favoritos.forEach(favorito => {

		const { title, price } = favorito
		listFavorites.innerHTML += `
		<div class="card-favorite">
		<p class="title">${title}</p>
		<p>${price}</p>
	  </div> 
		`

		card_product.forEach(card => {
			if (favorito.id === card.querySelector("#favorite-regular").getAttribute("idProducto")) {
				const corazon = card.querySelector("#favorite-regular")
				corazon.classList.remove("fa-regular")
				corazon.classList.add("fa-solid")
				corazon.style.color = "red"
			}
		})

	})

	let url1 = "http://localhost:3000/carrito"
	const counterCart = document.querySelector(".counter-cart")
	const carrito = await getFavorites(url1)

	counterFavorites.textContent = favoritos.length
	counterCart.textContent = carrito.length


}

//Enviar favoritos 
const enviarDatos = (product) => {
	let url = "http://localhost:3000/favoritos"
	guardarFavoritos(url, product)
	showHtml()
};

const enviarCarrito = (product) => {
	let url = "http://localhost:3000/carrito"
	guardarCarrito(url, product)

}
//Mostrar en los favoritos 
async function validarMostrar(deseo) {
	const favorito_carrito = document.querySelector(".favorito-carrito")
	let url = "http://localhost:3000/favoritos"
	if (deseo == "favorite") {
		favorito_carrito.textContent = "Mis favoritos"
		const favoritos = await getFavorites(url)
		listFavorites.innerHTML = ""

		favoritos.forEach(favorito => {
			const { title, price } = favorito
			console.log(favoritos)
			listFavorites.innerHTML += `
				<div class="card-favorite">
				<p class="title">${title}</p>
				<p>${price}</p>
			</div> 
		`
		})

	} else if (deseo == "carrito") {
		//Carrito
		favorito_carrito.textContent = "Tu carrito"
		listFavorites.innerHTML = ""
		let url2 = "http://localhost:3000/carrito"
		const carrito = await getFavorites(url2)
		console.log("hola", carrito)
		carrito.forEach(elemento => {
			const { imagen, nombre, precio } = elemento
			totalPagar += parseInt(precio)
			listFavorites.innerHTML += `
		<div class="card-favorite">
		<img src="${imagen}" width="40px">
		<p class="title">${nombre}</p>
		<p>${precio}</p>
	  </div> 
		`
		})
		
		const p = document.createElement("p")
		p.innerHTML = "Total: " +  totalPagar.toLocaleString()
		const button = document.createElement("button")
		button.textContent = "realizar compra"
		button.classList.add("comprar")
		listFavorites.appendChild(p)
		listFavorites.appendChild(button)

		const comprar = document.querySelector(".comprar")
		comprar.addEventListener("click", ()=>{
		if(carrito.length > 0){
		
				window.location = "carrito.html"
		
			return
		}
		Swal.fire({
            text: "El carrito esta vacio",
            icon: "error"
          });
		})
		
	}
}

buttonHeaderFavorite.addEventListener('click', () => {
	containerListFavorites.classList.add('show');
	validarMostrar("favorite")
});

buttonHeaderCarrito.addEventListener('click', () => {
	containerListFavorites.classList.add('show');
	validarMostrar("carrito")
});

btnClose.addEventListener('click', () => {
	containerListFavorites.classList.remove('show');
});

//Cargar productos del JSON
async function cargarProductos() {
	const contenedor = document.querySelector(".container-products")
	//LINK GET DE PRODUCTOS
	const productos = await getProducts('http://localhost:3000/productos')
	productos.forEach (producto => {
		const genero = localStorage.getItem("genero")
		console.log(genero);
		if(producto.genero == genero){
		contenedor.innerHTML += `
		<div class="card-product" ids=${producto.id} >
			
			<div class="container-img" ids=${producto.id}>
			<img src="../sneakers/${producto.imagen}" alt="imagen Producto" ids="${producto.id}"/>
			<img src='images/cuadricula.png' class='comparison' ids=${producto.id}>
			</div>
			<div class="content-card-product" ids=${producto.id} >
			<h3 ids=${producto.id}>${producto.nombre}</h3>
			<p ids=${producto.id}>${producto.detalles}</p>
			<div class="footer-card-product" ids=${producto.id}>
				<p class="priceParent" ids=${producto.id}>$<span class="price" ids=${producto.id}>${producto.precio}</span></p>

				<div class="container-buttons-card" ids=${producto.id}>

					<i class="fa-regular fa-heart" id="favorite-regular" idProducto= ${producto.id} ids=${producto.id}></i>
			
					<i class="fa-solid fa-bag-shopping" id="carrito"  idProducto= ${producto.id} ids=${producto.id}></i>

				</div>
		  	</div>
		</div>`

	const btnsFavorite = document.querySelectorAll('#favorite-regular');
	const btnsCarrito = document.querySelectorAll('#carrito');

	btnsFavorite.forEach(button => {

		button.addEventListener('click', async e => {
			let url = "http://localhost:3000/favoritos"
			const Allfavoritos = await getFavorites(url)
			const idProducto = e.target.getAttribute("idProducto")
			const result = Allfavoritos.some(favorito => favorito.id == idProducto)

			if (result == true) {
				const card_products = document.querySelectorAll(".card-product")
				Allfavoritos.forEach(favorito => {
					card_products.forEach(card => {
						if (favorito.id === card.querySelector("#favorite-regular").getAttribute("idProducto")) {
							const corazon = card.querySelector("#favorite-regular")
							corazon.classList.remove("fa-solid")
							corazon.classList.add("fa-regular")
							corazon.style.color = "white"
						}
					})
				})
				borrarFavorito(idProducto)
				showHtml()
			} else {
				const card = e.target.closest('.content-card-product');
				const product = {
					id: idProducto,
					title: card.querySelector('h3').textContent,
					price: card.querySelector('.price').textContent,
				};

				enviarDatos(product);
			}

		});
	});

	btnsCarrito.forEach(button => {
		button.addEventListener("click", async (e) => {
			const idProducto = e.target.getAttribute("idProducto")
			const card = e.target.closest('.card-product');
			const product = {
				id: idProducto,
				imagen: card.querySelector('img').src,
				nombre: card.querySelector('h3').textContent,
				precio: card.querySelector('.price').textContent,
			};

			enviarCarrito(product);
			cargarComparados(urlComparison)
		
		})
	})

	//Contenedor comparativo 
	const comparisonContainer = document.querySelectorAll('.comparison')
	comparisonContainer.forEach((boton) => {
		  
		boton.addEventListener('click', async (carta) => {

			let imagen = carta.target
			imagen.classList.add('active')

			let icono = carta.target.getAttribute('ids')
			let productos = await fetch(urlProductos).then(product => {
				return product.json()
			})
			console.log(productos)
			
			productos.forEach((igual) => {

				if (igual.id == icono){
					
					let producto = {

						imagen: `${igual.imagen}`,
						nombre: `${igual.nombre}`,
						detalles: `${igual.detalles}`,
						precio: `${igual.precio}`
					}

					guardarFavoritos(urlComparison, producto)
				}
			})	
		})		
	})

	const cardProduct = document.querySelectorAll('.card-product h3')

	cardProduct.forEach((e) => {
		e.addEventListener('click', (e) => {

			let id = e.target.getAttribute('ids')
			cargarProducto(id)

			window.location = '../Pagina producto/producto.html'
			
		})
	})
	showHtml()  
	}
  	})
}

function borrarFavorito(id) {
	let url = "http://localhost:4001/favoritos"
	fetch(`${url}/${id}`, {
		method: "DELETE"
	})

}

document.addEventListener("DOMContentLoaded", () => {
	cargarProductos()	
	cargarComparados(urlComparison)
})

async function cargarProducto (id){

    let productos = await fetch(urlProductos)
    let producto = await productos.json()
    const semejanza = producto.filter((product) => (product.id == id))
    localStorage.setItem('ProductClick', JSON.stringify(semejanza))
 
}
