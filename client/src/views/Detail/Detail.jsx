import React, { useEffect } from 'react'
import {useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getDetailPokemon } from '../../redux/actions'
import style from './Detail.module.css'


export default function Detail() {

  const dispatch = useDispatch()
  const {id} = useParams()
  
  
  useEffect(()=>{
    dispatch(getDetailPokemon(id))
  },[dispatch, id])
     
  
  const detailPokemon = useSelector((state) => state?.detailpoke);
  
  const selectedpokemon = detailPokemon?.find(pokemon => pokemon.id === parseInt(id));
  

  return (
    <div className={style.detailContainer}>
    <div className={style.detailInfo}>
      {/* <h1>Id: {detailPokemon.id}</h1> */}
      <h1>Name: {selectedpokemon?.name}</h1>
      <h1>Height: {selectedpokemon?.height}</h1>
      <h1>Weight: {selectedpokemon?.weight}</h1>
      <h1>Hp: {selectedpokemon?.hp}</h1>
      <h1>Attack: {selectedpokemon?.attack}</h1>
      <h1>Defense: {selectedpokemon?.defense}</h1>
      <h1>Speed: {selectedpokemon?.speed}</h1>
      <h1>Type: {selectedpokemon?.allType && selectedpokemon.allType.map(p => (p.charAt(0).toUpperCase() + p.slice(1))).join(' / ')}</h1>
    </div>
      <div className={style.detailImage}>
      <img src={selectedpokemon?.image} alt="" className="card-image" />
      <button>
        <Link to='/home' style={{ textDecoration: "none" }}>Home</Link>
      </button>
    </div>
    </div>
  )
}
