
function validarEdad(){
    const edad = document.getElementById('edad').value;
    console.log('edad',edad);

    if (edad < 18){
        alert('Menor de edad');
    }
};

document.addEventListener('DOMContentLoaded',function(){
    const cedad = document.getElementById('cedad');
    cedad.addEventListener('click',validarEdad);
})


