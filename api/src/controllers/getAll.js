require('dotenv').config();
const { POKE_API } = process.env
const { Pokemon, Type } = require('../db')
const axios = require('axios').default

module.exports = async () => {

     let response = await axios(POKE_API);
    // Realizar una consulta a la base de datos local y obtiene los pokemons
    const dbPokes = await Pokemon.findAll({

        include: [{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    })
    // Obtener los jpokemons de la API 
    const pokes = response.data.results
    const apiPokes = await Promise.all( pokes.map( async e => {
        
        const info = await axios(e.url)
    
        return {
            id: info.data.id,
            name: info.data.name,
            image: info.data.sprites.front_default,
            hp: info.data.stats[0].base_stat,
            attack: info.data.stats[1].base_stat,
            defense: info.data.stats[2].base_stat,
            speed: info.data.stats[5].base_stat,
            type: info.data.types.map(e => e.type.name),
            height: info.data.height + ' ft', // Agregamos 'ft' al final
            weight: info.data.weight + ' lb' // Agregamos 'lb' al final
        };
    }))
    /// Combinar los resultados (poner primero los pokemons de la base de datos)
     const allPokes = [...dbPokes, ...apiPokes];
     return allPokes    

}