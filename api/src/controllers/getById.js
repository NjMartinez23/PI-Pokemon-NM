const { Pokemon, Type } = require("../db")
const axios = require("axios").default


module.exports = async (id) => {

    const dbID = /[a-zA-Z]/.test(id)    
    
    if(!dbID){
        
        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
        
        //si encuentra el pokemon devuelve el objeto

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
       
        // Buscar el pokemon en la base de datos local por su ID
        const pokesDb = await Pokemon.findOne({

            where: { //where: especifica los criterios de búsqueda
                id: id
            },
            include: [{ //include se utiliza para especificar qué relaciones deben ser incluidas en la consulta
                model: Type, //model: Type indica que deseas incluir información de la tabla "Type"
                attributes: ['id'], //attributes: ['id'] especifica que solo deseas recuperar el campo "id" de la tabla "Type"
                through: {
                    attributes: []
                //through: { attributes: [] } se usa para indicar que no deseas incluir ningún atributo adicional de la relación entre "Pokemon" y "Type". En otras palabras, no se incluirán otros datos además de los IDs de los géneros.
                }
            }]
        });

        if(pokesDb){

            return{
                id: pokesDb.id,
                name: pokesDb.name,
                image: pokesDb.image,
                hp: pokesDb.hp,
                attack: pokesDb.attack,
                defense: pokesDb.defense,
                speed: pokesDb.speed,
                type: pokesDb.types.map( t => t.name),
                height: pokesDb.height + ' ft', 
                weight: pokesDb.weight + ' lb'
            }
        }else{

            throw new Error('Pokemon no encontrado')
        } 
    }
}