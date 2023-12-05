const getTypes = require('../controllers/getTypes')

module.exports = async ( req, res ) =>{
    try {
        let types = await getTypes()

        res.status(200).json(types)

    } catch (error) {

        res.status(400).json(error.message)
    }
}