export default function validate(inputs){
const errors = {}

    if(!inputs.name){
        errors.name = 'El nombre no puede estar vacío'
    }

    if(inputs.name.length < 3 ||inputs.name.length > 12){
        errors.name = 'El nombre debe contener de 3 a 12 letras'
    }

    if(inputs.hp !== Number || inputs.attack !== Number || inputs.defense !== Number || inputs.speed !== Number || inputs.height !== Number || inputs.weight !== Number){

        errors.hp = 'Este campo solo admite valores numericos'
        errors.attack = 'Este campo solo admite valores numericos'
        errors.defense = 'Este campo solo admite valores numericos'
        errors.speed = 'Este campo solo admite valores numericos'
        errors.height = 'Este campo solo admite valores numericos'
        errors.weight = 'Este campo solo admite valores numericos'
    }

    if(inputs.hp > 999 || inputs.attack > 999 || inputs.defense > 999 || inputs.speed > 999 || inputs.height > 999 || inputs.weight > 999){
        errors.hp = 'Este campo solo admite valores hasta 999'
        errors.attack = 'Este campo solo admite valores hasta 999'
        errors.defense = 'Este campo solo admite valores hasta 999'
        errors.speed = 'Este campo solo admite valores hasta 999'
        errors.height = 'Este campo solo admite valores hasta 999'
        errors.weight = 'Este campo solo admite valores hasta 999'
    }
}