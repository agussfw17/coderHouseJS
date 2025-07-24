import { monedas, agregarEventoPorId, soloNumero } from './utils.js';


function cargarPresupuesto() {
    const importe = document.querySelector('#num-importe').value;
    const selectMoneda = document.querySelector('#select-moneda');
    if (parseInt(importe) > 0){
        const presupuesto = {
            monedaId: selectMoneda.value,
            importe: importe,
        };
        localStorage.setItem('presupuesto',JSON.stringify(presupuesto));
        window.location.href = 'gastos.html';
    }
}

const bpresupuesto = document.querySelector('#button-presupuesto');
bpresupuesto.addEventListener('click',cargarPresupuesto);

document.addEventListener('DOMContentLoaded', () => {
    agregarEventoPorId('input[id*="num"]', soloNumero, 'input');
});

const selectMoneda = document.querySelector('#select-moneda');

monedas.forEach(moneda => {
  const option = document.createElement('option');
  option.value = moneda.id;
  option.textContent = `${moneda.sym} - ${moneda.nombre}`;
  selectMoneda.appendChild(option);
});