const postCreate = require('../controllers/postCreate')

module.exports = async (req, res) =>{

    const { name, image, hp, attack, defense, speed, type, height, weight } = req.body

    try {

        let newPokemon = await postCreate(
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            type,
            height,
            weight
        )

        if(newPokemon.status === 'este pokemon ya existe'){

            return res.status(400).json(newPokemon.status)

        }else{

            return res.status(201).json(newPokemon);
        }

    } catch (error) {
        
        res.status(500).json(error.message)
    }
}