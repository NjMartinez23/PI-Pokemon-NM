const { Router } = require('express');
const typesRouter = require('./type.routes')
const pokeRouter = require('./poke.routes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use((req, res, next) => {
    console.log(`Solicitud a la ruta: ${req.url}`);
    next();
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokeRouter)
router.use('/types', typesRouter)

module.exports = router;
