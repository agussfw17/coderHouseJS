const presupuesto = {
  monedaId: 0,
  importe: 0,
};

const gastos = [];

const monedas = [
  { id: 1, sym: "$", cotizacion: 1 },
  { id: 2, sym: "U$S", cotizacion: 41.2 },
  { id: 3, sym: "€", cotizacion: 45.8 },
];

function redondear(num) {
  return parseFloat(num.toFixed(2));
}

function validarNumero(valor) {
  return !isNaN(valor) && parseFloat(valor) >= 0;
}

function pedirImporte(msg) {
  let numero = prompt(msg);
  if (!validarNumero(numero)) {
    do {
      numero = prompt("Debe ingresar un numero valido");
    } while (!validarNumero(numero));
  }
  return redondear(parseFloat(numero));
}

function monedaValida(moneda) {
  return monedas.some((m) => m.id === parseInt(moneda));
}

function pedirMoneda() {
  let monedaId;
  do {
    monedaId = prompt(`Seleccione la moneda:
        1 - $
        2 - U$S`);
    if (monedaId === null) {
      return null;
    }
  } while (!monedaValida(monedaId));
  return parseInt(monedaId);
}

function pedirPresupuesto() {
  alert(
    `Bienvenido al controlador de gastos. A continuación ingrese la moneda de su presupuesto inicial.`
  );
  let monedaId = pedirMoneda();
  if (monedaId) {
    let importe = pedirImporte(
      "Por favor ingrese su presupuesto para empezar."
    );
    if (importe) {
      presupuesto.importe = importe;
      presupuesto.monedaId = monedaId;
    }
  }
}

function buscarMoneda(monedaId) {
  return monedas.find((moneda) => moneda.id === monedaId);
}

function convertirAMoneda(monedaIdOri, monedaIdDes, importe) {
  console.log("monedaIdOri", monedaIdOri);
  console.log("monedaIdDes", monedaIdDes);

  let monedaOri = buscarMoneda(monedaIdOri);
  let monedaDes = buscarMoneda(monedaIdDes);
  return redondear((importe * monedaOri.cotizacion) / monedaDes.cotizacion);
}

function calcularTotal(monedaIdDes) {
  let total = 0;
  gastos.forEach((gasto) => {
    total += convertirAMoneda(gasto.monedaId, monedaIdDes, gasto.importe);
  });
  return redondear(total);
}

function imprimirTotal() {
  let monedaIdDes = pedirMoneda();
  if (monedaIdDes) {
    let total = calcularTotal(monedaIdDes);
    alert(
      `El total de los gastos es de ${buscarMoneda(monedaIdDes).sym} ${total}`
    );
  }
}

function imprimirGastos() {
  console.log("ENTRE");
  for (let i = 0; i < gastos.length; i++) {
    console.log(
      `${gastos[i].detalle} - ${buscarMoneda(gastos[i].monedaId).sym} ${
        gastos[i].importe
      }`
    );
  }
}

function agregarGasto() {
  let detalle = prompt("Ingrese un breve detalle de su gasto");
  let monedaId = pedirMoneda();
  let importe = pedirImporte("Ingrese cuanto gasto");

  let gasto = {
    detalle: detalle,
    monedaId: monedaId,
    importe: importe,
  };

  gastos.push(gasto);
}

function calcularPresupuesto(monedaIdDes) {
  return redondear(
    convertirAMoneda(presupuesto.monedaId, monedaIdDes, presupuesto.importe) -
      calcularTotal(monedaIdDes)
  );
}

function imprimirPresupuesto() {
  let presupuestoCal = 0;
  let monedaIdDes = pedirMoneda();
  if (monedaIdDes) {
    presupuestoCal = calcularPresupuesto(monedaIdDes);
  }
  alert(
    `El presupuesto restante es de ${
      buscarMoneda(monedaIdDes).sym
    } ${presupuestoCal}`
  );
}

function pedirAccion() {
  let accion = prompt(`Seleccione la acción que quiera:
        1 - Agregar gasto
        2 - Calcular presupuesto restante
        3 - Calcular total gastado
        4 - Imprimir gastos
        5- Salir
    `);

  switch (parseInt(accion)) {
    case 1:
      agregarGasto();
      pedirAccion();
      break;

    case 2:
      imprimirPresupuesto();
      pedirAccion();
      break;

    case 3:
      imprimirTotal();
      pedirAccion();
      break;

    case 4:
      imprimirGastos();
      pedirAccion();

    case 5:
      return;

    default:
      pedirAccion();
      break;
  }
}

function main() {
  pedirPresupuesto();
  pedirAccion();
}

main();
