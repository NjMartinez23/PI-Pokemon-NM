require('dotenv').config()
const { POKE_API } = process.env
const { Pokemon, Type } = require('../db')
const axios = require('axios').default


module.exports = async (name, image, hp, attack, defense, speed, type, height, weight) => {
    
    const response = await axios(POKE_API);

    // valida si existe en la api 
    const found = response.data.results.some((e) => name === e.name)

    //si es igual a found el pokemon ya existe en la api por tanto no lo crea
   if(found){
       
        return { status: 'este pokemon ya existe' }

    }else{
        // Buscar el tipo en la base de datos
        const existingType = await Type.findOne({
            where: { name: type }
        });

        if (!existingType) {
            // Si no encuentra el tipo, lanzar un error
            throw new Error(`${type} no es un tipo válido`);
        }

        // Crear un nuevo Pokémon en la base de datos
        const [newPoke] = await Pokemon.findOrCreate({
            where: { name: name },
            defaults: {
                image,
                hp,
                attack,
                defense,
                speed,
                height,
                weight
            }
        });

        // Asociar el tipo al nuevo Pokémon
        await newPoke.addType(existingType);

        // Formatear los datos antes de retornarlos
        const formattedPokemon = {
            name: name,
            image: image,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            type: [type],
            height: height + ' ft',
            weight: weight + ' lb',
        };

        return formattedPokemon;
    }
}
