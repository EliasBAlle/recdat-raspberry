//crea elemento
const video = document.createElement("video");

//nuestro camvas
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

//div donde llegara nuestro canvas
const btnScanQR = document.getElementById("btn-scan-qr");

//lectura desactivada
let scanning = false;

//funcion para encender la camara
const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

//funciones para levantar las funiones de encendido de la camara
function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

//apagara la camara
const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

const activarSonido = () => {
  var audio = document.getElementById("audioScaner");
  audio.play();
};

//callback cuando termina de leer el codigo QR
qrcode.callback = (respuesta) => {
  if (respuesta) {
    //console.log(respuesta);
    Swal.fire(respuesta);
    activarSonido();
    //encenderCamara();
    cerrarCamara();
  }
};
//evento para mostrar la camara sin el boton
window.addEventListener("load", (e) => {
  encenderCamara();
});
qrcode.callback = (respuesta) => {
  if (respuesta) {
    Swal.fire("Registro exitoso");
    activarSonido();
    setTimeout(tomarFoto, 3000); // Espera 3 segundos antes de tomar la foto
    cerrarCamara();
  }
};

// Función para tomar una foto y guardarla
function tomarFoto() {
  // Crear un nuevo canvas para guardar la imagen
  const fotoCanvas = document.createElement("canvas");
  const fotoContext = fotoCanvas.getContext("2d");

  // Ajustar el tamaño del canvas al tamaño del video
  fotoCanvas.width = video.videoWidth;
  fotoCanvas.height = video.videoHeight;

  // Dibujar el video en el canvas
  fotoContext.drawImage(video, 0, 0, fotoCanvas.width, fotoCanvas.height);

  // Convertir el canvas a una imagen en formato base64
  const fotoData = fotoCanvas.toDataURL("image/png");

  // Crear un nuevo elemento de imagen
  const foto = document.createElement("img");

  // Establecer la fuente de la imagen como los datos del canvas
  foto.src = fotoData;

  // Guardar la imagen en la biblioteca de imágenes
  const numeroFoto = Date.now(); // Usar la fecha y hora actual como número de foto
  localStorage.setItem("img/foto" + numeroFoto, fotoData);

  // Cerrar el modal
}
