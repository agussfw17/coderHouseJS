const presupuesto = {
  monedaId: 0,
  importe: 0,
};

const gastos = [];



function redondear(num) {
  return parseFloat(num.toFixed(2));
}

function validarNumero(valor) {
  return !isNaN(valor) && parseFloat(valor) > 0;
}

function pedirImporte(msg) {
  let numero;
  do {
    numero = prompt(msg);
    if (numero === null) return null;
  } while (!validarNumero(numero));
  return redondear(parseFloat(numero));
}

function monedaValida(moneda) {
  return monedas.some((m) => m.id === parseInt(moneda));
}

function pedirMoneda() {
  let monedaId;
  let msg = "Seleccione la moneda:\n";
  monedas.forEach((moneda) => {
    msg += `${moneda.id} - ${moneda.sym} ${moneda.nombre}\n`;
  });
  do {
    monedaId = prompt(msg);
    if (monedaId === null) return null;
  } while (!monedaValida(monedaId));
  return parseInt(monedaId);
}

function pedirPresupuesto() {
  let monedaId = pedirMoneda();
  if (monedaId !== null) {
    let importe = pedirImporte(
      "Por favor ingrese su presupuesto para empezar."
    );
    if (importe !== null) {
      presupuesto.importe = importe;
      presupuesto.monedaId = monedaId;
      alert(`Presupuesto cargado: ${buscarMoneda(monedaId).sym} ${importe}`);
    } else {
      alert("No se ingresó un presupuesto. Acción cancelada.");
    }
  } else {
    alert("No se seleccionó una moneda. Acción cancelada.");
  }
}
function buscarMoneda(monedaId) {
  return monedas.find((moneda) => moneda.id === monedaId);
}

function convertirAMoneda(monedaIdOri, monedaIdDes, importe) {
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
  if (monedaIdDes !== null) {
    let total = calcularTotal(monedaIdDes);
    alert(
      `El total de los gastos es de ${buscarMoneda(monedaIdDes).sym} ${total}`
    );
  } else {
    alert("No se seleccionó una moneda. Acción cancelada.");
  }
}

function imprimirGastos() {
  if (gastos.length === 0) {
    alert("No hay gastos cargados.");
    return;
  }

  console.log("GASTOS:");
  gastos.forEach((gasto) => {
    console.log(
      `${gasto.detalle} - ${buscarMoneda(gasto.monedaId).sym} ${gasto.importe}`
    );
  });
}

function agregarGasto() {
  let detalle = prompt("Ingrese un breve detalle de su gasto");
  if (detalle) {
    let monedaId = pedirMoneda();
    if (monedaId !== null) {
      let importe = pedirImporte("Ingrese cuánto gastó");
      if (importe !== null) {
        gastos.push({ detalle, monedaId, importe });
        alert("Gasto agregado correctamente.");
      } else {
        alert("No se ingresó el importe. Acción cancelada.");
      }
    } else {
      alert("No se seleccionó una moneda. Acción cancelada.");
    }
  } else {
    alert("No se ingresó el detalle del gasto. Acción cancelada.");
  }
}

function calcularPresupuesto(monedaIdDes) {
  const importePresu = convertirAMoneda(
    presupuesto.monedaId,
    monedaIdDes,
    presupuesto.importe
  );
  return redondear(importePresu - calcularTotal(monedaIdDes));
}

function imprimirPresupuesto() {
  if (presupuesto.importe === 0) {
    alert("Aún no se ha definido un presupuesto inicial.");
    return;
  }

  let monedaIdDes = pedirMoneda();
  if (monedaIdDes !== null) {
    let presupuestoCal = calcularPresupuesto(monedaIdDes);
    alert(
      `El presupuesto restante es de ${
        buscarMoneda(monedaIdDes).sym
      } ${presupuestoCal}`
    );
  } else {
    alert("No se seleccionó una moneda. Acción cancelada.");
  }
}

function pedirAccion() {
  let salir = false;
  while (!salir) {
    let accion = prompt(`Seleccione la acción que quiera:
1 - Cambiar presupuesto inicial
2 - Agregar gasto
3 - Calcular presupuesto restante
4 - Calcular total gastado
5 - Imprimir gastos
6 - Salir`);

    if (accion === null) {
      salir = true;
      continue;
    }

    switch (parseInt(accion)) {
      case 1:
        pedirPresupuesto();
        break;

      case 2:
        agregarGasto();
        break;

      case 3:
        imprimirPresupuesto();
        break;

      case 4:
        imprimirTotal();
        break;

      case 5:
        imprimirGastos();
        break;

      case 6:
        salir = true;
        break;

      default:
        alert("Opción no válida.");
        break;
    }
  }
}

function main() {
  alert(`Bienvenido al controlador de gastos.`);
  pedirPresupuesto();
  pedirAccion();
}

