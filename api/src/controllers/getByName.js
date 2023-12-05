const {Pokemon, Type} = require('../db')
const axios = require('axios').default


module.exports = async (name) => {

    const pokesDb = await Pokemon.findOne({
    
        where: {
            name: name
        },
        include: [{ 
            model: Type, 
            attributes: ['name'], 
            through: {
                attributes: []
            }
        }]
    });
    
    if(pokesDb){
    
        return pokesDb
    }else{
    
        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
    
        if(response){
    
            return{
                id: response.data.id,
                name: response.data.name,
                image: response.data.sprites.front_default,
                hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defense: response.data.stats[2].base_stat,
                speed: response.data.stats[5].base_stat,
                type: response.data.types.map(e => e.type.name),
                height: response.data.height + ' ft', 
                weight: response.data.weight + ' lb'
            }
    
        }else{
    
            throw new Error('Pokemon no encontrado')
        }
    }
}

