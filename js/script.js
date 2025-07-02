const presupuesto = {
  moneda: 0,
  importe: 0,
};

const gastos = [];

const monedas = [
  { id: 1, sym: "$", cotizacion: 1 },
  { id: 2, sym: "U$S", cotizacion: 41.2 },
];

function validarNumero(valor) {
  return !isNaN(valor) && parseFloat(valor, 2) >= 0;
}

function pedirImporte(msg) {
  let numero = prompt(msg);
  if (!validarNumero(numero)) {
    do {
      numero = prompt("Debe ingresar un numero valido");
    } while (!validarNumero(numero));
  }
  return parseFloat(numero, 2);
}

function monedaValida(moneda) {
  return monedas.some((m) => m.id === parseInt(moneda));
}

function pedirMoneda() {
  let moneda;
  do {
    moneda = prompt(`Seleccione la moneda:
        1 - $
        2 - U$S`);
    if (moneda === null) {
      return null;
    }
  } while (!monedaValida(moneda));
  return monedas.find((m) => m.id === parseInt(moneda)).id;
}

function pedirPresupuesto() {
  alert(
    `Bienvenido al controlador de gastos. A continuación ingrese la moneda de su presupuesto inicial.`
  );
  let moneda = pedirMoneda();
  if (moneda) {
    let importe = pedirImporte(
      "Por favor ingrese su presupuesto para empezar."
    );
    if (importe) {
      presupuesto.importe = importe;
      presupuesto.moneda = moneda;
    }
  }
}

function buscarMoneda(monedaId) {
  return monedas.find((moneda) => moneda.id === monedaId);
}

function convertirAPesos(monedaId, importe) {
  let moneda = buscarMoneda(monedaId);
  let cotizacion = moneda.cotizacion;
  return importe * cotizacion;
}

function calcularTotal() {
  let total = 0;
  gastos.forEach((gasto) => {
    total += convertirAPesos(gasto.moneda.id, gasto.importe);
  });
  alert(`El total de los gastos es $ ${total}`);
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
}

function agregarGasto() {
  let detalle = prompt("Ingrese un breve detalle de su gasto");
  let moneda = pedirMoneda();
  let importe = pedirImporte("Ingrese cuanto gasto");

  let gasto = {
    detalle: detalle,
    moneda: moneda,
    importe: importe,
  };

  gastos.push(gasto);
}

function pedirAccion() {
  let accion = prompt(`Seleccione la acción que quiera:
        1 - Agregar gasto
        2 - Calcular presupuesto restante
        3 - Calcular total gastado
        4- Salir
    `);

  console.log("accion", accion);
  switch (parseInt(accion)) {
    case 1:
      agregarGasto();
      pedirAccion();
      break;

    case 2:
      break;

    case 3:
      calcularTotal();
      pedirAccion();
      break;

    case 4:
      return;

    default:
      pedirAccion();
  }
}

function main() {
  pedirPresupuesto();
  pedirAccion();
}

main();
