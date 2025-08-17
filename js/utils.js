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

export function mostrarSuccess(mensaje) {
  Toastify({
    text: mensaje,
    duration: 2000,
    gravity: "top",
    position: "center",
    backgroundColor: "#4CAF50",
  }).showToast();
}

export function mostrarError(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "#dc3545",
  }).showToast();
}

export function formatearFecha(fechaStr) {
    const [a, m, d] = fechaStr.split("-");
    return `${d}/${m}/${a}`;
}