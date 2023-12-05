import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

 /* esta línea sirve para conectar nuestra app con la extensión REDUX DEVTOOLS del navegador */
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
    reducer,
    /* Esta línea sive para que podamos hacer peticiones a una api */
    composeEnhancer(applyMiddleware(thunkMiddleware)) 
    );

export default store;