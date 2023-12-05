import React from 'react'
import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom';
import  Logo  from "../../assets/Logo.png"


export default function NavBar() {
  return (
    <nav className={style.navbar}>
      <header className={style.container}>
      <NavLink to = "/home">
          <img className={style.imgPoke} src={Logo} alt='Logo Pokedex'/>
      </NavLink>
      </header>
    <div className ={style.navbuttons}>    
    </div>
    </nav>
  )
}