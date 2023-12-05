import React from 'react'
import {useSelector } from 'react-redux'
import Card from '../card/Card'
import style from './cards.module.css'

export default function Cards(props){ 
    const pokemons = useSelector(state => state.allPoke)
    // console.log(pokemons);
   
    return <div>
    <div className={style.cardsContainer}>
{       
        pokemons.map((pokemon)=>{
        return(
        <Card
            key={pokemon.id}
            image={<img src={pokemon.image} alt={pokemon.name} />}
            name={<label>Name: {pokemon.name}</label>}
            id={<label>Id: <span>{pokemon.id}</span></label>}
            height={<label>Height: {pokemon.height}</label>}
            weight={<label>Weight: {pokemon.weight}</label>}
            hp={<label>Hp: {pokemon.hp}</label>}
            attack={<label>Attack: {pokemon.attack}</label>}
            defense={<label>Defense: {pokemon.defense}</label>}
            speed={<label>Speed: {pokemon.speed}</label>}
            type={<label>Type: {pokemon.type}</label>}
        />
        )
    })}
    </div>
</div>
}