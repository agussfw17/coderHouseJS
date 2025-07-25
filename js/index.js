import {  agregarEventoPorId, soloNumero, mostrarError, ocultarError } from './utils.js';
import { monedas, buscarMoneda, convertirAMoneda} from './monedas.js';

document.addEventListener('DOMContentLoaded', () => {
    agregarEventoPorId('input[id*="num"]', soloNumero, 'input');
});

function eliminarGasto(index) {
    let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    const gasto = gastos[index];

    if (!gasto){
        return;
    }
    
    let gastosTotal = JSON.parse(localStorage.getItem('gastosTotal'));
    if (gastosTotal) {
        gastosTotal.importe -= convertirAMoneda(gasto.monedaId, gastosTotal.monedaId, gasto.importe);
        localStorage.setItem('gastosTotal', JSON.stringify(gastosTotal));
        document.querySelector('#gastosTotal').textContent = `${buscarMoneda(gastosTotal.monedaId).sym} ${gastosTotal.importe}`;
    }

    gastos.splice(index, 1);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    renderizarListaDeGastos();
}

function agregarGasto(){
    let descripcion = document.querySelector('#descripcion').value;
    let monedaId = document.querySelector('#select-moneda').value;
    let importe = document.querySelector('#num-gasto').value;
    let fecha = document.querySelector('#fch').value;

    if (!descripcion) {
        mostrarError('Por favor ingresa una descripción','#error-gasto');
        return;
    }

    if (!monedaId) {
        mostrarError('Por favor selecciona una moneda','#error-gasto');
        return;
    }

    if (!importe || isNaN(importe) || Number(importe) <= 0) {
        mostrarError('Por favor ingresa un importe válido mayor a 0','#error-gasto');
        return;
    }

    if (!fecha) {
        mostrarError('Por favor ingresa una fecha','#error-gasto');
        return;
    }

    ocultarError('#error-gasto');

    let gasto = {
       descripcion: descripcion,
       monedaId: parseInt(monedaId),
       importe: parseFloat(importe),
       fecha: fecha
    }
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    gastos.push(gasto);
    localStorage.setItem('gastos',JSON.stringify(gastos));

    renderizarListaDeGastos();

    let gastosTotal = JSON.parse(localStorage.getItem('gastosTotal'));
    if (!gastosTotal){
        gastosTotal = {
            importe: 0,
            monedaId: 1
        };
    }

    gastosTotal.importe += convertirAMoneda(gasto.monedaId, gastosTotal.monedaId, gasto.importe);
    localStorage.setItem('gastosTotal',JSON.stringify(gastosTotal));
    document.querySelector('#gastosTotal').textContent = `${buscarMoneda(parseInt(gastosTotal.monedaId)).sym} ${gastosTotal.importe}`; 
}

function agregarFilaAGastos(gasto, index){
    const tbody = document.querySelector("#lista-gastos");

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${gasto.fecha}</td>
        <td>${gasto.descripcion}</td>
        <td>${buscarMoneda(gasto.monedaId).sym} ${gasto.importe}</td>
        <td><button class="btn-eliminar" data-index="${index}">🗑️</button></td>
    `;

    const botonEliminar = fila.querySelector(".btn-eliminar");
    botonEliminar.addEventListener("click", (event) => {
        const index = parseInt(event.currentTarget.dataset.index);
        eliminarGasto(index);
    });

    tbody.appendChild(fila);
}

function renderizarListaDeGastos(){
    const tbody = document.querySelector("#lista-gastos");
    tbody.innerHTML = ''; 
    
    const gastos = JSON.parse(localStorage.getItem("gastos"));
    if (gastos){
        gastos.forEach((gasto, index) => {
            agregarFilaAGastos(gasto, index);
        });
    }
}

function renderizarPantalla(){
    const saldo = JSON.parse(localStorage.getItem('saldo'));
    if (saldo){
        document.querySelector('#saldo').textContent = `${buscarMoneda(parseInt(saldo.monedaId)).sym} ${saldo.importe}`; 
    }

    const gastosTotal = JSON.parse(localStorage.getItem('gastosTotal'));
    if (gastosTotal){
        document.querySelector('#gastosTotal').textContent = `${buscarMoneda(parseInt(gastosTotal.monedaId)).sym} ${gastosTotal.importe}`; 
    }

    renderizarListaDeGastos();

    document.querySelector('#agregarGasto').addEventListener('click',agregarGasto)
}

renderizarPantalla();



