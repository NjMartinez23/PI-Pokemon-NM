const getAll = require('../controllers/getAll')


module.exports = async (req, res) => {
    try {
        const pokes = await getAll()

        res.status(200).json(pokes)

    } catch (error) {
        res.status(400).json(error.message)
    }
}