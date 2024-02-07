import { getFavorites } from "../connection/api.js";


let url = "http://localhost:4004/comparados"

async function borrar() {

  let comparados = await getFavorites(url)

  comparados.forEach((comparate) => {
    const {id} = comparate

    console.log('delete')
    try {
        fetch (`${url}/${id}` , {
        method: "DELETE",
      })
    } catch(error) {
      console.log(error)
    }

  })
}

export async function cargarComparados(url){

	const comparison = document.querySelector('.comparisonProducts')
    
		let comparados = await getFavorites(url)

		comparados.forEach((comparate) => {
			const comparated = document.createElement('div')
			comparated.classList.add('firstProduct')


			const {imagen, nombre, detalles, precio} = comparate

					comparated.innerHTML = `
						<img src='../sneakers/${imagen}'>
						<div class='infoComparison'>
							<h3>${nombre}</h3>
							<p>${detalles}</p>
              <p>${precio}</p>

						</div>
						<div class='footerComparison'>
							<a> Agregar Carrito </a>
						</div>

					`
					comparison.appendChild(comparated)

      if(comparados.length == 2){

        comparison.style.display = 'flex'

        const closeButton = document.querySelector('.close-button')

        closeButton.addEventListener('click', () => {
          const comparisonProducts = document.querySelector('.comparisonProducts')
          comparisonProducts.style.display = 'none'

          borrar()

        })
      }

		
		})
}

document.addEventListener('DOMContentLoaded', () => {

    const categoriaDropdown = document.querySelector('.titleCategory');
    const arrowCategory = document.querySelector('.arrowCategory')
    const categorias = document.querySelector('.categories')

    const Sizes = document.querySelector('.subSize')
    const tallaDropdown = document.querySelector('.titleSize');
    const arrowSize = document.querySelector('.arrowSize')

    const brands = document.querySelector('.brands')
    const BrandsDropdown = document.querySelector('.brandTitle');
    const arrowBrand = document.querySelector('.arrowBrand')
  
    categoriaDropdown.addEventListener('click', () => {
      toggleDropdown(categorias);
      arrowCategory.classList.toggle('rotate')
    });
  
    tallaDropdown.addEventListener('click', () => {
      toggleDropdown(Sizes);
      arrowSize.classList.toggle('rotate')
    });

    BrandsDropdown.addEventListener('click', () => {

        toggleDropdown(brands);
        arrowBrand.classList.toggle('rotate')
    })
  
    function toggleDropdown(dropdown) {
      dropdown.classList.toggle('mostrar');
    }
})

