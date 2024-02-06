import { getProducts, guardarFavoritos, getFavorites, guardarCarrito } from "./connection/api.js";


const counterFavorites = document.querySelector('.counter-favorite');

const containerListFavorites = document.querySelector('.container-list-favorites');
const listFavorites = document.querySelector('.list-favorites');
let urlComparison = 'http://localhost:4004/comparados'
let urlProductos = 'http://localhost:4000/productos'
let totalPagar = 0

const showHtml = async () => {

	const card_product = document.querySelectorAll(".card-product")
	let url = "http://localhost:4001/favoritos"
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

	let url1 = "http://localhost:4003/carrito"
	const counterCart = document.querySelector(".counter-cart")
	const carrito = await getFavorites(url1)

	counterFavorites.textContent = favoritos.length
	counterCart.textContent = carrito.length


}

const enviarDatos = (product) => {
	let url = "http://localhost:4001/favoritos"
	guardarFavoritos(url, product)

	showHtml()

};

const enviarCarrito = (product) => {
	let url = "http://localhost:4003/carrito"
	guardarCarrito(url, product)

}

async function validarMostrar(deseo) {
	const favorito_carrito = document.querySelector(".favorito-carrito")
	let url = "http://localhost:4001/favoritos"
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
		
		favorito_carrito.textContent = "Tu carrito"
		listFavorites.innerHTML = ""
		let url2 = "http://localhost:4003/carrito"
		const carrito = await getFavorites(url2)
		console.log(carrito)
		carrito.forEach(elemento => {
			const { img, title, price } = elemento
			totalPagar += parseInt(price)
			listFavorites.innerHTML += `
		<div class="card-favorite">
		<img src="${img}" width="40px">
		<p class="title">${title}</p>
		<p>${price}</p>
	  </div> 
		`
		})
		
		const p = document.createElement("p")
		p.innerHTML = "Total: " +  totalPagar.toLocaleString()
		listFavorites.appendChild(p)
		
	}
}

const btnClose = document.querySelector('#btn-close');
const buttonHeaderFavorite = document.querySelector('#button-header-favorite');
const buttonHeaderCarrito = document.querySelector("#button-header-carrito")


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

async function cargarProductos() {
	const contenedor = document.querySelector(".container-products")
	const productos = await getProducts()
	productos.forEach(producto => {
		contenedor.innerHTML += `
		<div class="card-product">
		<div class="container-img">
		  <img src="images/${producto.imagen}" alt="imagen Producto" />
		  <img src='images/cuadricula.png' class='comparison'/>
		</div>
		<div class="content-card-product" data-product-id="1">
		  <h3>${producto.nombre}</h3>
		  <p>${producto.detalles}</p>
		  <div class="footer-card-product">
			<p class="priceParent">$<span class="price">${producto.precio}</span></p>

			<div class="container-buttons-card">

				<i class="fa-regular fa-heart" id="favorite-regular" idProducto=${producto.id}></i>
		
				<i class="fa-solid fa-bag-shopping" id="carrito" idProducto=${producto.id}></i>

			</div>
		  </div>
		</div>
	  </div>`

	  const comparisonContainer = document.querySelectorAll('.comparisonContainer')

	  comparisonContainer.forEach((boton) => {
		  
		  boton.addEventListener('click', async (carta) => {
  
			  let imagen = carta.target
			  imagen.classList.add('active')
  
			  let icono = carta.target.getAttribute('id')
			  let productos = await fetch(urlProductos).then(product => {
				  return product.json()
			  })
			  
			  productos.forEach((igual) => {
				  
				  if(igual.id == icono){
  
					  let producto = {
  
						  imagen: `${igual.imagen}`,
						  nombre: `${igual.nombre}`,
						  detalles: `${igual.detalles}`
  
					  }
  
					  guardarFavoritos(urlComparison, producto)
					  
				  }
			  })	
		  })		
	  })
	  showHtml()  
  	})
}
  async function cargarComparados(url){
	const comparison = document.querySelector('.comparisonProducts')
	
		let comparados = await getFavorites(url)

		comparados.forEach((comparate) => {
			const comparated = document.createElement('div')
			comparated.classList.add('firstProduct')
			if (comparados.length < 3){
			const {imagen, nombre, detalles} = comparate

					comparated.innerHTML = `
						<img src='images/${imagen}'>
						<div class='infoComparison>'
							<p>${nombre}</p>
							<p>${detalles}</p>
						</div>
						<div class='footerComparison'>
							<a> Agregar Carrito </a>
						</div>

					`
					comparison.appendChild(comparated)
			} 

			if(comparados.length == 2){
				comparison.style.display = 'block'
			}
		})
  
	
	const btnsFavorite = document.querySelectorAll('#favorite-regular');
	const btnsCarrito = document.querySelectorAll('#carrito');

	btnsFavorite.forEach(button => {

		button.addEventListener('click', async e => {
			let url = "http://localhost:4001/favoritos"
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
		button.addEventListener("click", async e => {
			const idProducto = e.target.getAttribute("idProducto")
			const card = e.target.closest('.card-product');
			const product = {
				id: idProducto,
				img: card.querySelector('img').src,
				title: card.querySelector('h3').textContent,
				price: card.querySelector('.price').textContent,
			};

			enviarCarrito(product);

			
		})
	})

	showHtml()
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

