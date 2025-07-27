export function redondear(num) {
  const numero = parseFloat(num);
  return parseFloat(numero.toFixed(1));
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

export function mostrarError(mensaje,id) {
  const contError = document.querySelector(id);
  contError.textContent = mensaje;
  contError.style.display = 'block';
}

export function ocultarError(id) {
  const contError = document.querySelector(id);
  contError.textContent = '';
  contError.style.display = 'none';
}

export function formatearFecha(fechaStr) {
    const [a, m, d] = fechaStr.split("-");
    return `${d}/${m}/${a}`;
}