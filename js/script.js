function soloNumero(){
    this.value = this.value.replace(/\D/g, '');
};

function validarNumero(valor){
    return /^\d+$/.test(valor);
};

function agregarGasto(){
    let gasto = prompt('Ingresa el importe gastado');
    if (!validarNumero(gasto)){
        do {
            gasto = prompt('Debe ingresar un numero valido');
        } while (!validarNumero(gasto));
    };
};

document.addEventListener('DOMContentLoaded',function(){
    const inputPresupuesto = document.getElementById('presupuesto');
    inputPresupuesto.addEventListener('input',soloNumero);

    const inputGasto = document.getElementById('gasto');
    inputGasto.addEventListener('input',soloNumero);

    const buttonAddGasto = document.getElementById('bgasto');
    buttonAddGasto.addEventListener('click',agregarGasto);
});






