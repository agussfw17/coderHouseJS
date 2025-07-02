const gastos = [];

const monedas = [
  { id: "1", sym: "$", cotizacion: 1 },
  { id: "2", sym: "U$S", cotizacion: 41.2 },
];

function soloNumero() {
  this.value = this.value.replace(/\D/g, "");
}

function validarNumero(valor) {
  return !isNaN(valor) && parseFloat(valor) >= 0;
}

function pedirDetalle() {
  return prompt("Ingrese un breve detalle de su gasto");
}

function monedaValida(moneda) {
  return monedas.some((m) => m.id === moneda);
}

function pedirMoneda() {
  let moneda;
  do {
    moneda = prompt(`Seleccione la moneda:
        1 - $
        2 - U$S`);
  } while (!monedaValida(moneda));
  return monedas.find((m) => m.id === moneda);
}

function pedirImporte() {
  let importe = prompt("Ingresa el importe gastado");
  if (!validarNumero(importe)) {
    do {
      importe = prompt("Debe ingresar un numero valido");
    } while (!validarNumero(importe));
  }
  return parseFloat(importe);
}

function convertirAPesos(moneda, importe) {
  let cotizacion = parseFloat(monedas.find((m) => m.id === moneda).cotizacion);
  return importe * cotizacion;
}

function calcularTotal() {
  let total = 0;
  gastos.forEach((gasto) => {
    total += convertirAPesos(gasto.moneda.id, gasto.importe);
  });
  return parseFloat(total, 2);
}

function imprimirGastos() {
  let listaGastos = document.getElementById("lista-gastos-b");
  listaGastos.innerHTML = "";
  gastos.forEach((gasto) => {
    listaGastos.innerHTML += `<tr><td>${gasto.detalle}</td><td>${gasto.moneda.sym} ${gasto.importe}</td></tr>`;
  });
  let total = calcularTotal();
  listaGastos.innerHTML += `<tr><td>Total</td><td>$${total}</td></tr>`;
  alert(`El total de los gastos es $ ${total}`);
}

function agregarGasto() {
  let detalle = prompt("Ingrese un breve detalle de su gasto");
  let moneda = pedirMoneda();
  let importe = pedirImporte();

  let gasto = {
    detalle: detalle,
    moneda: moneda,
    importe: importe,
  };

  gastos.push(gasto);
  imprimirGastos();
}

document.addEventListener("DOMContentLoaded", function () {
  const inputPresupuesto = document.getElementById("presupuesto");
  inputPresupuesto.addEventListener("input", soloNumero);

  const inputGasto = document.getElementById("gasto");
  inputGasto.addEventListener("input", soloNumero);

  const buttonAddGasto = document.getElementById("bgasto");
  buttonAddGasto.addEventListener("click", agregarGasto);
});
