const getById = require('../controllers/getById')


module.exports = async (req, res) => {
    
    const { id }=req.body

    console.log(id)

    try {
        
        const pokeId = await getById(id)

        res.status(200).json(pokeId)

    } catch (error) {

        res.status(404).json(error.message)
    }
}