import { monedas } from './utils.js';

const selectMoneda = document.querySelector('#select-moneda');

monedas.forEach(moneda => {
  const option = document.createElement('option');
  option.value = moneda.id;
  option.textContent = `${moneda.sym}`;
  selectMoneda.appendChild(option);
});