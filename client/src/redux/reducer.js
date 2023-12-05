import {
    GET_ALL_POKEMON, GET_TYPE_POKEMON, GET_NAME_POKEMON,
    FILTER_BY_TYPE, FILTER_CREATED, ORDER_BY_NAME,
    ORDER_BY_ATTACK, POST_POKEMON, DETAIL_POKEMON
} from "./action-types"

const initialState = {
    allPoke: [],
    allType: [],
    allPokemon: [],
    details: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_POKEMON:
            return {
                ...state,
                allPoke: payload,
                allPokemon: payload
            }
        case GET_NAME_POKEMON:
            return {
                ...state,
                allPoke: payload
            }
        case GET_TYPE_POKEMON:
            return {
                ...state,
                allType: payload
            }

         case FILTER_BY_TYPE:
            const { allPokemon: allPokemonTypeFilter } = state;
            const statusFiltered = payload === 'all' ? allPokemonTypeFilter : allPokemonTypeFilter.filter(pokemon => pokemon.type?.includes(payload.toLowerCase()));

            return {
                ...state,
                allPoke: statusFiltered,
            };

        case FILTER_CREATED:
            const { allPokemon: allPokemonCreatedFilter } = state;
            const createdFilter = payload === "dataBase" ? allPokemonCreatedFilter.filter(e => e.createdInDb) : allPokemonCreatedFilter.filter(e => !e.createdInDb);

            return {
                ...state,
                allPoke: payload === "all" ? allPokemonCreatedFilter : createdFilter,
            };

        case ORDER_BY_NAME:
            const sortedArr = [...state.allPoke].sort((a, b) => {
                return payload === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            });

            return {
                ...state,
                allPoke: sortedArr,
            };

        case ORDER_BY_ATTACK:
            const sortedAttack = [...state.allPoke].sort((a, b) => {
                return payload === 'asc' ? a.attack - b.attack : b.attack - a.attack;
            });

            return {
                ...state,
                allPoke: sortedAttack,
            };
        
        
            case POST_POKEMON:
            return {
                ...state,
            }
        case DETAIL_POKEMON:
            return {
                ...state,
                detailpoke: payload
            }


        default: return {
            ...state
        }
    }
}

export default reducer;