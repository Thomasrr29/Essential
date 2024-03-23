async function getData(url) {
    
    try {
        const request = await fetch(url);

        if(!request.ok){
            console.error(`Error haciendo fetch ${request.status}`)
        }
        const response = await request.json()
        console.log(response)

    } catch(error){
        console.error(error)
    }

}

getData('http://localhost:3000/productos')

