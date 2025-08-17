import { redondear, mostrarError } from './utils.js';

let monedas = [];

export async function getMonedasApi(){
  try{
    const res = await axios.get("https://68a11c406f8c17b8f5d92857.mockapi.io/api/banco/monedas")
    monedas = res.data;
  } catch (error){
    mostrarError(error);
  }
}

export function buscarMoneda(id){
  return monedas.find(moneda => moneda.id === id);
}

export function convertirAMoneda(monedaIdOri, monedaIdDes, importe) {
  let monedaOri = buscarMoneda(monedaIdOri);
  let monedaDes = buscarMoneda(monedaIdDes);
  return redondear((importe * monedaOri.cotizacion) / monedaDes.cotizacion);
}

export function getMonedas(){
  return monedas;
}


