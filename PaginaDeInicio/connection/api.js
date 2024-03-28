let url = "http://localhost:3000/getUsuarios"

export const getData = async () => {
    try {
        const respuesta = await fetch(url)
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.log(error);
    }

}

export const sendData = async (usuario) => {
    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(usuario),
            "Content-Type": "application/json",
        })
        
    } catch (error) {
        console.log(error);

    }
}