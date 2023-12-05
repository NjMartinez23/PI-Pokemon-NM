const { Router } = require('express');
const pokeRouter = Router();
const getAll = require('../handlers/getAllHandler')
const getById = require('../handlers/getByIdHandler')
const getByName = require('../handlers/getByNameHandler')
const postCreate = require('../handlers/postCreateHandler')


pokeRouter.get('/', getAll)
pokeRouter.get('/name', getByName)
pokeRouter.get('/:idPokemon', getById)
pokeRouter.post('/', postCreate)



module.exports = pokeRouter