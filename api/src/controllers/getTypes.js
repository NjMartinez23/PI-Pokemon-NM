require('dotenv').config();
const { TYPE_API } = process.env
const { Type } = require('../db')
const axios = require('axios').default

module.exports = async () => {
    
    // Verificar si ya hay Types en la base de datos
    const typesDb = await Type.findAll();

    if (typesDb.length) {
        // Si existen Types en la base de datos, los retorna

        let resDb = typesDb.map((type) => ({
            id: type.id,
            name: type.name,
        }));

        return resDb

    }else{

        // Si no hay Types en la base de datos, los obtiene de la API
        const response = await axios(TYPE_API);
        
        const types = response.data.results; // recibe un array de objetos, con los pokemons filtrados por Type
                                            //los guarda en la DB filtrando solo el nombre

        types.forEach(async t => {
            await Type.findOrCreate({
                where: {
                    name: t.name
                }
            })
        })
        //envia al front solo el nombre de los types
        const typesREADY = types.map(type => {
            return{
                id: type.id,
                name: type.name
            }
        });
        return typesREADY
    }

}