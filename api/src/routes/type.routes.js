const { Router } = require('express');
const typesRouter = Router();
const types = require('../handlers/getTypesHandler')



typesRouter.get('/', types)



module.exports = typesRouter