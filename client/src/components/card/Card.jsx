import React from "react";
import { Link } from "react-router-dom";
import style from './card.module.css'

export default function Card({ id, name, image, type, attack }) {
  console.log(type);

  // Verificar si type es un array
  const formType = Array.isArray(type)
    ? type.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(' / ')
    : typeof type === "string"
      ? type.charAt(0).toUpperCase() + type.slice(1)
      : 'Unknown Type';

  return (
    <div>
      <div className={style.cardN} >
        <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
          <div className="card-img">
            <img src={image} alt='Not Found' />
            <div className={style.cardInfo}>
              <h3>Name: {name}</h3>
              <p>Attack: {attack}</p>
              <p>Type: {formType}</p>
            </div>
            <div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}