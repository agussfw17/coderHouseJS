export const monedas = [
  { id: 1, sym: "$", nombre: "Pesos", cotizacion: 1 },
  { id: 2, sym: "U$S", nombre: "Dólares", cotizacion: 41.2 },
  { id: 3, sym: "€", nombre: "Euros", cotizacion: 45.8 },
];

export function redondear(num) {
  return parseFloat(num.toFixed(2));
}

export function soloNumero() {
  this.value = this.value.replace(/\D/g, "");
}

export function agregarEventoPorId(filtro,fn,event) {
  const elementos = document.querySelectorAll(filtro);
  elementos.forEach(elemento => {
    elemento.addEventListener(event,fn);
  });
}

export function encontrarMoneda(id){
  return monedas.find(moneda => moneda.id === id);
}