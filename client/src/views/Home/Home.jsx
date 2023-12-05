import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { filterByTypes, filterCreatedPoke, getAllpokemon, getTypePokemon, orderByName, orderByAttack } from '../../redux/actions'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import SearchBar from '../../components/searchBar/SearchBar'
import Paginate from '../../components/paginate/Paginate'
import style from './Home.module.css'
// import { getTypePokemon } from '../../redux/actions'

export default function Home(props) {

  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.allPoke)
  const allType = useSelector((state) => state.allType)
  console.log(allType, 'hola');
  //Estados del paginado
  const [currentPage, setCurrentPage] = useState(1) //pagina actual y me setea esta 
  const [pokemonPerPage] = useState(12) // va a setear cuantos pokes quiero por pagina
  //constantes del paginado donde asocio las pag con los pokes por pag
  const indexOfLastPokemon = currentPage * pokemonPerPage //12
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage //0 
  const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  // me va a ayudar al renderizado
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  //fin de paginado
  const [order, setOrder] = useState('') /* --> estado local vacío que me permite ordenar asc y desc */
  // ciclo que maneja todos los pokemon
  useEffect(() => {
    dispatch(getAllpokemon())
  }, [dispatch])

 

  //ciclo que busca por tipos
  useEffect(() => {
    dispatch(getTypePokemon())
  }, [dispatch])



  //permite volver a cargar todos los pokemons 
  function handlerClick(event) {
    event.preventDefault(); // para que no se recargue por defecto y asi no me rompa
    dispatch(getAllpokemon());
  }

  //filtro de los tipos
  function handlerFilterStatus(event) {
    event.preventDefault();
    dispatch(filterByTypes(event.target.value))
    setCurrentPage(1)
  }

  //Filtrado por creado

  function handleFilterCreated(e) {
    dispatch(filterCreatedPoke(e.target.value)) /* --> lo que viene del select que es el payload  */
    setCurrentPage(1)
  }

  // ordenamiento descendente y ascendente
  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    // Puedes eliminar la siguiente línea si no necesitas el estado 'order'
    // setOrder(`Ordenado ${e.target.value}`);
  }

  function handleSortAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    // Puedes eliminar la siguiente línea si no necesitas el estado 'order'
    // setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={style.containerHome}>

      <div className={style.allOrder}>
        {/* name */}
        <div className={`${style.selectWrapper} ${style.selectOption}`}>
          <select className="order" onChange={(e) => handleSortName(e)}>
            <option>Select Order Alphabetical</option>
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
        </div>

        <div className={`${style.selectWrapper} ${style.selectOption}`}>
      <select className="attack" onChange={(e) => handleSortAttack(e)}>
        <option>Select attack Order</option>
        <option value="asc">Ascendent attack</option>
        <option value="desc">Descendent attack</option>
      </select>
    </div>

     {/* mapeo de tipo */}
    <div className={`${style.selectWrapper} ${style.selectOption}`}>
    <select key="uniqueKey" onChange={(e)=> handlerFilterStatus(e)} defaultValue='default'>
    <option value="default" disabled>Select By Types</option>
    {allType.map((pok) => (
        <option key={pok.id} value={pok.name}>
            {pok.name}
        </option>
    ))}
</select>
    </div>

    {/* filtro por procedencia */}

    <div className={`${style.selectWrapper} ${style.selectOption}`}>
      <select onChange={(e) => handleFilterCreated(e)}>
        <option>Select Pokemon</option>
        <option value="all">All Pokemon</option>
        <option value="api">Pokemon Api</option>
        <option value="dataBase">created Pokemon</option>          
        </select>
    </div>
    <SearchBar />
  </div>

  <div className={style.buttonR}>
    <button><Link to='/create' style={{ textDecoration: "none" }}>Create Pokemon</Link></button>
    <button onClick={handlerClick}>Reload Pokemon</button>
  </div>

  <div>
    <Paginate
      currentPage={currentPage}
      pokemonPerPage={pokemonPerPage}
      allPokemons={allPokemons.length}
      paginate={paginate}
    />
  </div>

  <div className={style.cardTas}>
    {currentPokemon.map(pok => (
        <Card
            key={pok.id}
            id={pok.id}
            name={pok.name}
            type={pok.type}
            image={pok.image}
            height={pok.height}
            weight={pok.weight}
            hp={pok.hp}
            attack={pok.attack}
            defense={pok.defense}
            speed={pok.speed}
        />
    ))}
  </div>

  <div>
    <Paginate
      currentPage={currentPage}
      pokemonPerPage={pokemonPerPage}
      allPokemons={allPokemons.length}
      paginate={paginate}
    />
  </div>
</div>
  )
}
