import { monedas, encontrarMoneda, agregarEventoPorId, soloNumero } from './utils.js';

const bpresupuesto = document.querySelector('#b-cambiar-p');
const importe = document.querySelector('#num-importe');
const selectMoneda = document.querySelector('#select-moneda');
const lpresupuesto = document.querySelector('#lpresupuesto');
const infoPresupuesto = document.querySelector('.info-presupuesto');
const newPresupuesto = document.querySelector('.new-presupuesto');

document.addEventListener('DOMContentLoaded', () => {
    agregarEventoPorId('input[id*="num"]', soloNumero, 'input');
});

function confirmarPresupuesto() {
    if (parseInt(importe.value) > 0){
        const presupuesto = {
            monedaId: selectMoneda.value,
            importe: importe.value,
        };
        localStorage.setItem('presupuesto',JSON.stringify(presupuesto));
        bpresupuesto.textContent = 'Cambiar';
        lpresupuesto.textContent = `Presupuesto inicial: ${encontrarMoneda(parseInt(selectMoneda.value)).sym} ${importe.value}`; 
        infoPresupuesto.style.display = 'block'
        newPresupuesto.style.display = 'none';
    }
}

function cambiarPresupuesto(){
    bpresupuesto.textContent = 'Confirmar';
    infoPresupuesto.style.display = 'none'
    newPresupuesto.style.display = 'block';
}

function checkPresupuestoAction(){
   if (bpresupuesto.textContent == 'Cambiar'){
        cambiarPresupuesto(); 
   }else{
        confirmarPresupuesto();
   }
}

newPresupuesto.style.display = 'none';
bpresupuesto.addEventListener('click',checkPresupuestoAction);

let presupuesto = localStorage.getItem('presupuesto')
if (presupuesto){
    presupuesto = JSON.parse(presupuesto);
    lpresupuesto.textContent = `Presupuesto inicial: ${encontrarMoneda(parseInt(presupuesto.monedaId)).sym} ${presupuesto.importe}`; 
}
