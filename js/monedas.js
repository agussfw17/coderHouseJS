import { redondear } from './utils.js';

export const monedas = [
  { id: 1, sym: "$", nombre: "Pesos", cotizacion: 1 },
  { id: 2, sym: "U$S", nombre: "Dólares", cotizacion: 41.2 },
  { id: 3, sym: "€", nombre: "Euros", cotizacion: 45.8 },
];

export function buscarMoneda(id){
  return monedas.find(moneda => moneda.id === id);
}

export function convertirAMoneda(monedaIdOri, monedaIdDes, importe) {
  let monedaOri = buscarMoneda(monedaIdOri);
  let monedaDes = buscarMoneda(monedaIdDes);
  return redondear((importe * monedaOri.cotizacion) / monedaDes.cotizacion);
}

const selectMoneda = document.querySelector('#select-moneda');

monedas.forEach(moneda => {
  const option = document.createElement('option');
  option.value = moneda.id;
  option.textContent = `${moneda.sym}`;
  selectMoneda.appendChild(option);
});