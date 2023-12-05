import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypePokemon } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './Form.module.css'
const isValid = /^[a-zA-Z]+$/;

// Validaciones
function validate(input) {
  const errors = {};

 
  if (input.name.trim().length === 0) {
    errors.name = 'Te has olvidado de ingresar tu nombre';
  }

  if (input.name.length < 3 || input.name.length > 12) {
    errors.name = 'El nombre debe contener de 3 a 12 letras';
  }
  if(!isValid.test(input.name)){
    errors.name = 'El nombre solo debe contener letras'
  }

  if(input.hp > 999 || input.hp < 0){
    
    errors.hp = 'Este campo solo admite valores de 0 hasta 999';
  }
  if( input.attack > 999 || input.attack< 0){ 
    errors.attack = 'Este campo solo admite valores de 0 hasta 999';
  }
  if(input.defense > 999 || input.defense< 0){
errors.defense = 'Este campo solo admite valores de 0 hasta 999';
  }
  if(input.speed > 999 || input.speed< 0){
 errors.speed = 'Este campo solo admite valores de 0 hasta 999';
  }
  if(input.height > 999 || input.height< 0){
 errors.height = 'Este campo solo admite valores de 0 hasta 999';
  }
  if( input.weight > 999 || input.weight< 0){
errors.weight = 'Este campo solo admite valores de 0 hasta 999';
  }

  if (input.type.length === 0) {
    errors.type = 'Debes elegir al menos un tipo';
  }
  return errors;
}

const Form = () => {
  const dispatch = useDispatch();
  const typesPokes = useSelector((state) => state.allType);
  // Ahora puede acceder al historial de rutas a través del objeto `history`.
  const history = useHistory();

 
  const [errors, setErrors] = useState({});

  const [initialFormState, setInitialFormState] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    type: '',
    createdInDb: true,
  });

  const [input, setInput] = useState({ ...initialFormState });

  useEffect(() => {
    dispatch(getTypePokemon());
  }, [dispatch]);

  const handleInputChange = (event) => {
  setInput({
    ...input,
    [event.target.name]: event.target.value,
  });
  setErrors(validate({
    ...input,
    [event.target.name]: event.target.value,
  }))
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const { errors, ...sinErrors } = initialFormState;
    const result = validate(sinErrors);
    setInput({
      ...input,
      errors: result,
    });
    dispatch(postPokemon(input));
    setInput({ ...initialFormState });
    history.push('/home');
    setInitialFormState()
  };

  return (
    <div className={style.formBack}>
    <div className={style.searchInput}>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <button>To Home</button>
      </Link>
      <h1>Crear un nuevo Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <div >
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Nombre"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <input
            type="number"
            name="hp"
            value={input.hp}
            placeholder="HP"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.hp && <p>{errors.hp}</p>}
        </div>
        <div>
          <input
            type="number"
            name="attack"
            value={input.attack}
            placeholder="Ataque"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.attack && <p>{errors.attack}</p>}
        </div>
        <div>
          <input
            type="number"
            name="defense"
            value={input.defense}
            placeholder="Defensa"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <div>
          <input
            type="number"
            name="speed"
            value={input.speed}
            placeholder="Velocidad"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div>
          <input
            type="number"
            name="height"
            value={input.height}
            placeholder="Altura"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          <input
            type="number"
            name="weight"
            value={input.weight}
            placeholder="Peso"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <div>
          <select
            className="types"
            value={input.type}
            onChange={handleInputChange}
            autoComplete="off"
            name="type"
            required
            //multiple
          >
            <option value="">Select By Types</option>
            {typesPokes &&
              typesPokes.map((pok) => (
                <option key={pok.id} value={pok.name}>
                  {pok.name}
                </option>
              ))}
          </select>
          {errors.type && <p>{errors.type}</p>}
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
    </div>
  );
};

export default Form;

