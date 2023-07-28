const inputs = document.querySelectorAll("input");

inputs.forEach((input)=>{
    input.addEventListener('keyup',(e)=>{
        Valid(e.target,regex[e.target.attributes.name.value]);
    })
})

const regex = {
    firstname:/^\w+$/i,
    lastname:/^\w+$/i,
    email:/^\S+@\S+\.\S+$/i,
    contactnumber:/^\d{10}$/,
    address:/^\w+$/i
}

const Valid = (field,reg) =>{
    if(reg.test(field.value)){
        field.className='Valid';
    }
    else{
        field.className='Invalid';
    }
}