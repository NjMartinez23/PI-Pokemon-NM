const getByName = require('../controllers/getByName')

module.exports = async (req, res) => {
    
    // Obtener el nombre de búsqueda desde la query
    let { name } = req.query;

    try {
        
        if(name){
            
            const nameLower = name.toLowerCase();
            console.log(nameLower)

            let pokeName = await getByName(nameLower)

            res.status(200).json(pokeName); 

        }else{

            throw new Error('Nombre del Pokemon no especificado')
        }

    } catch (error) {

      console.error(error);

      res.status(500).json({ error: 'Error interno del servidor' });

    }

}