import {  agregarEventoPorId, soloNumero, mostrarError, ocultarError, redondear, formatearFecha } from './utils.js';
import { monedas, buscarMoneda, convertirAMoneda} from './monedas.js';

function calcularGastoTotal(){
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];

    let gastosTotal = {
        monedaId: 1,
        importe: 0
    };

    gastos.forEach(gasto => {
        gastosTotal.importe += redondear(convertirAMoneda(gasto.monedaId,gastosTotal.monedaId,gasto.importe));
    });
    gastosTotal.importe = redondear(gastosTotal.importe);
    return gastosTotal; 
}

function obtenerSaldo(){
    let saldo = JSON.parse(localStorage.getItem('saldo'));
    if (!saldo){
        saldo = {
            monedaId: 1,
            importe: 0
        };
    }
    return saldo;
}

function calcularSaldoRestante(){
    const saldo = obtenerSaldo();
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];

    let saldoRestante = {
        monedaId: 1,
        importe: 0
    };

    saldoRestante.importe = redondear(convertirAMoneda(saldo.monedaId,saldoRestante.monedaId,saldo.importe));
    gastos.forEach(gasto => {
        saldoRestante.importe -= redondear(convertirAMoneda(gasto.monedaId,saldoRestante.monedaId,gasto.importe));
    })
    saldoRestante.importe = redondear(saldoRestante.importe);
    return saldoRestante; 
}

function eliminarGasto(id) {
    console.log('id',id)
    let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    gastos = gastos.filter(gasto => gasto.id !== id);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    renderizarListaDeGastos();

    const gastosTotal = calcularGastoTotal();
    document.querySelector('#gastosTotal').textContent = `${buscarMoneda(gastosTotal.monedaId).sym} ${gastosTotal.importe}`;
   
    const saldoRestante = calcularSaldoRestante();
    document.querySelector('#saldoRestante').textContent = `${buscarMoneda(parseInt(saldoRestante.monedaId)).sym} ${saldoRestante.importe}`; 
}

function agregarGasto(){
    let descripcion = document.querySelector('#descripcion').value;
    let monedaId = parseInt(document.querySelector('#select-moneda-g').value);
    let importe = parseFloat(document.querySelector('#num-gasto').value);
    let fecha = document.querySelector('#fch').value;

    if (!descripcion) {
        mostrarError('Por favor ingresa una descripción','#error-gasto');
        return;
    }

    if (!monedaId) {
        mostrarError('Por favor selecciona una moneda','#error-gasto');
        return;
    }

    let saldoRestante = calcularSaldoRestante();
    if (!importe || isNaN(importe) || Number(importe) <= 0) {
        mostrarError('Por favor ingresa un importe válido mayor a 0','#error-gasto');
        return;
    }else if (importe > redondear(convertirAMoneda(saldoRestante.monedaId,monedaId,saldoRestante.importe))) {
        mostrarError('El importe supera el saldo restante','#error-gasto');
        return;
    }

    if (!fecha) {
        mostrarError('Por favor ingresa una fecha','#error-gasto');
        return;
    }

    ocultarError('#error-gasto');
   
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];

    /*Agrego id con UUID para poder eliminarlos al aplica filtros o sorts*/
    let gasto = {
        id: crypto.randomUUID(),
        descripcion: descripcion,
        monedaId: parseInt(monedaId),
        importe: redondear(importe),
        fecha: fecha
    }
    gastos.push(gasto);
    localStorage.setItem('gastos',JSON.stringify(gastos));

    renderizarListaDeGastos();

    const gastosTotal = calcularGastoTotal();
    document.querySelector('#gastosTotal').textContent = `${buscarMoneda(parseInt(gastosTotal.monedaId)).sym} ${gastosTotal.importe}`; 

    saldoRestante = calcularSaldoRestante();
    document.querySelector('#saldoRestante').textContent = `${buscarMoneda(parseInt(saldoRestante.monedaId)).sym} ${saldoRestante.importe}`; 
}

function agregarFilaAGastos(gasto){
    const tbody = document.querySelector("#lista-gastos");

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${gasto.descripcion}</td>
        <td>${buscarMoneda(gasto.monedaId).sym} ${gasto.importe}</td>
        <td>${formatearFecha(gasto.fecha)}</td>
        <td><button class="btn-eliminar" data-index="${gasto.id}"><i class="fa-solid fa-trash-can"></i></button></td>
    `;

    const botonEliminar = fila.querySelector(".btn-eliminar");
    botonEliminar.addEventListener("click", (event) => {
        eliminarGasto(gasto.id);
    });

    tbody.appendChild(fila);
}

function renderizarListaDeGastos(){
    const tbody = document.querySelector("#lista-gastos");
    tbody.innerHTML = ''; 
    
    let gastos = filtrarGastos();
    gastos = sortGastos(gastos);

    gastos.forEach((gasto) => {
        agregarFilaAGastos(gasto);
    });
}

function modificarSaldo(){
    document.querySelector('#edit-saldo').style.display = 'block';
    document.querySelector('#show-saldo').style.display = 'none';

    let saldo = obtenerSaldo();
    document.querySelector('#num-saldo').value = saldo.importe;
}

function confirmarSaldo(){
    let monedaId = parseInt(document.querySelector('#select-moneda-s').value);
    let importe = redondear(document.querySelector('#num-saldo').value);

    if (!monedaId){
        mostrarError('Debe seleccionar una moneda','#error-saldo');
        return;
    }

    let gastosTotal = calcularGastoTotal();
    gastosTotal.importe = redondear(convertirAMoneda(gastosTotal.monedaId,monedaId,gastosTotal.importe));
    if (!importe){
        mostrarError('Debe ingresar una importe mayor a 0','#error-saldo');
        return;
    }else if (importe < gastosTotal.importe){
        mostrarError('El saldo ingresado no puede ser menor al total de gastos','#error-saldo');
        return;   
    }

    ocultarError('#error-saldo');

    const saldo = {
        monedaId: monedaId,
        importe: importe
    };

    localStorage.setItem('saldo',JSON.stringify(saldo));
    document.querySelector('#saldo').textContent = `${buscarMoneda(saldo.monedaId).sym} ${saldo.importe}`; 

    const saldoRestante = calcularSaldoRestante();
    document.querySelector('#saldoRestante').textContent = `${buscarMoneda(saldoRestante.monedaId).sym} ${saldoRestante.importe}`; 
    
    document.querySelector('#show-saldo').style.display = 'block';
    document.querySelector('#edit-saldo').style.display = 'none';
}

function modificarSaldoRestante(){
    document.querySelector('#edit-saldo-restante').style.display = 'block';
    document.querySelector('#show-saldo-restante').style.display = 'none';
}

function confirmarSaldoRestante(){
    const monedaId = parseInt(document.querySelector('#select-moneda-sr').value);

    let saldoRestante = calcularSaldoRestante();
    saldoRestante.importe = redondear(convertirAMoneda(saldoRestante.monedaId,monedaId,saldoRestante.importe));
    saldoRestante.monedaId = monedaId;

    document.querySelector('#saldoRestante').textContent = `${buscarMoneda(saldoRestante.monedaId).sym} ${saldoRestante.importe}`; 

    document.querySelector('#edit-saldo-restante').style.display = 'none';
    document.querySelector('#show-saldo-restante').style.display = 'block';
}

function modificarGasto(){
    document.querySelector('#edit-gasto').style.display = 'block';
    document.querySelector('#show-gasto').style.display = 'none';
}

function confirmarGasto(){
    document.querySelector('#edit-gasto').style.display = 'none';
    document.querySelector('#show-gasto').style.display = 'block';

    const monedaId = parseInt(document.querySelector('#select-moneda-gs').value);

    let gastosTotal = calcularGastoTotal();
    gastosTotal.importe = redondear(convertirAMoneda(gastosTotal.monedaId,monedaId,gastosTotal.importe));
    gastosTotal.monedaId = monedaId;

    document.querySelector('#gastosTotal').textContent = `${buscarMoneda(gastosTotal.monedaId).sym} ${gastosTotal.importe}`; 
}

function sortGastos(gastos) {
    const orden = document.querySelector('#orden-gastos').value;
    switch (orden) {
        case 'fecha-asc':
            gastos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            break;
        
        case 'fecha-desc':
            gastos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            break;

        case 'importe-asc':
            gastos.sort((a, b) => convertirAMoneda(a.monedaId,1,a.importe) - convertirAMoneda(b.monedaId,1,b.importe));
            break;

        case 'importe-desc':
            gastos.sort((a, b) => convertirAMoneda(b.monedaId,1,b.importe) - convertirAMoneda(a.monedaId,1,a.importe));
            break;
    }
    return gastos;
}

function filtrarGastos(){
    const dsc = document.querySelector('#busqueda-descripcion').value
    const fchDesde = document.querySelector('#filtro-fecha-desde').value
    const fchHasta = document.querySelector('#filtro-fecha-hasta').value

    let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
   
    if (dsc){
        gastos = gastos.filter((gasto) => gasto.descripcion.toLowerCase().includes(dsc.toLowerCase()));
    }

    if (fchDesde){
        gastos = gastos.filter((gasto) => new Date(gasto.fecha) >= new Date(fchDesde));
    }

    if (fchHasta){
        gastos = gastos.filter((gasto) => new Date(gasto.fecha) <= new Date(fchHasta));
    }
    return gastos;
}

function renderizarPantalla(){
    document.querySelector('#edit-saldo').style.display = 'none';
    document.querySelector('#edit-saldo-restante').style.display = 'none';
    document.querySelector('#edit-gasto').style.display = 'none';

    document.addEventListener('DOMContentLoaded', () => {
        agregarEventoPorId('input[id*="num"]', soloNumero, 'input');
        document.querySelector('#modificarSaldo').addEventListener('click',modificarSaldo);
        document.querySelector('#confirmarSaldo').addEventListener('click',confirmarSaldo);
        document.querySelector('#agregarGasto').addEventListener('click',agregarGasto);
        document.querySelector('#modificarSaldoRestante').addEventListener('click',modificarSaldoRestante);
        document.querySelector('#confirmarSaldoRestante').addEventListener('click',confirmarSaldoRestante);
        document.querySelector('#modificarGasto').addEventListener('click',modificarGasto);
        document.querySelector('#confirmarGasto').addEventListener('click',confirmarGasto);
        document.querySelector('#busqueda-descripcion').addEventListener('input',renderizarListaDeGastos);
        agregarEventoPorId('input[id*="filtro-fecha"], select[id="orden-gastos"]', renderizarListaDeGastos, 'change');
    });


    const saldo = JSON.parse(localStorage.getItem('saldo'));
    if (saldo){
        document.querySelector('#saldo').textContent = `${buscarMoneda(parseInt(saldo.monedaId)).sym} ${saldo.importe}`; 
    }

    const gastosTotal = calcularGastoTotal();
    document.querySelector('#gastosTotal').textContent = `${buscarMoneda(parseInt(gastosTotal.monedaId)).sym} ${gastosTotal.importe}`; 

    const saldoRestante = calcularSaldoRestante();
    document.querySelector('#saldoRestante').textContent = `${buscarMoneda(parseInt(saldoRestante.monedaId)).sym} ${saldoRestante.importe}`; 

    renderizarListaDeGastos();
}

renderizarPantalla();



