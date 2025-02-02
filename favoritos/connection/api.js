let url = "http://localhost:4000/productos"

export const getProducts = async () =>{
    const respuesta = await fetch(url)
    const datos = await respuesta.json()
    return datos
}

export const guardarFavoritos = async (url1, product) =>{
    try{ 
        await fetch(url1, {
            method: "POST",
            body: JSON.stringify(product),
            "Content-Type": "application/json"
        })
    }catch(error){
        console.log(error);
    }
}

export const getFavorites = async (url1) =>{
    let respuesta = await fetch(url1)
    let datos = await respuesta.json()
    return datos
}

