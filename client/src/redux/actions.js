import axios from 'axios';
import {
  GET_ALL_POKEMON,
  GET_TYPE_POKEMON,
  GET_NAME_POKEMON,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  DETAIL_POKEMON
} from './action-types';

// Todos los Pokemon
export const getAllpokemon = () => {
  return async (dispatch) => {
    try {
      const apiData = await axios('http://localhost:3001/pokemons');
      const allPoke = apiData.data;
      dispatch({
        type: GET_ALL_POKEMON,
        payload: allPoke
      });
    } catch (error) {
      console.error('Error fetching all Pokemon:', error);
    }
  };
};

// Detalles de un Pokemon por ID
export const getDetailPokemon = (id) => {
    return async (dispatch) => {
      try {
        const details = await axios.get(`http://localhost:3001/pokemons?id=${id}`);
        
        const detailpoke = details.data;
        
        dispatch({
          type: DETAIL_POKEMON,
          payload: detailpoke,
        });
      } catch (error) {
        console.error("No se encontró el Pokemon:", error);
      }
    };
  };

// Búsqueda por nombres
export function getNamePokemon(name) {
  return async (dispatch) => {
    try {
      const dataName = await axios(`http://localhost:3001/pokemons/name`, {
        params: {
          name: name
        }
      });

      const allDataName = dataName.data;
      dispatch({
        type: GET_NAME_POKEMON,
        payload: [allDataName]
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Traigo los tipos de Pokemon
export function getTypePokemon() {
  return async (dispatch) => {
    try {
      const dataType = await axios('http://localhost:3001/types');
      const allType = dataType.data;
      console.log(allType, 'hola soy tom');
      dispatch({
        type: GET_TYPE_POKEMON,
        payload: allType
      });
    } catch (error) {
      console.error('Error trayendo los tipos:', error);
    }
  };
}

// Para crear el Pokemon
export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:3001/pokemons', payload);
      return response;
    } catch (error) {
      console.error('Error creating Pokemon:', error);
    }
  };
}

export function filterByTypes(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload
  };
}

// Ordenamiento por origen
export function filterCreatedPoke(payload) {
  return {
    type: FILTER_CREATED,
    payload
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload
  };
}
