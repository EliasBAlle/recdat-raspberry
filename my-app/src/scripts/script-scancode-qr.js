// Crear elemento video
const video = document.createElement("video");

// Obtener el canvas y su contexto
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

// Obtener el botón para escanear QR
const btnScanQR = document.getElementById("btn-scan-qr");

// Estado de escaneo
let scanning = false;

// Encender la cámara
const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

// Función para dibujar en el canvas
function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  scanning && requestAnimationFrame(tick);
}

// Función para escanear QR
function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

// Apagar la cámara
const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

// Activar sonido
const activarSonido = () => {
  var audio = document.getElementById("audioScaner");
  audio.play();
};

// Callback cuando se lee el código QR
qrcode.callback = (respuesta) => {
  if (respuesta) {
    Swal.fire("Registro exitoso");
    activarSonido();
    setTimeout(tomarFoto, 3000); // Espera 3 segundos antes de tomar la foto
    cerrarCamara();
  }
};

// Tomar foto
function tomarFoto() {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, 640, 480);
  var foto = canvas.toDataURL('image/png');
  console.log("Foto tomada con éxito.");
  var imgElement = document.createElement('img');
  imgElement.src = foto;
  document.body.appendChild(imgElement);
  setTimeout(function() {
      imgElement.remove();
  }, 3000);
  var fotoBase64 = foto.split(',')[1];
  var fotoBlob = base64ToBlob(fotoBase64, 'image/png');
  guardarFotoEnFileSystem(fotoBlob);
}

// Convertir base64 a blob
function base64ToBlob(base64, mime) {
  var byteCharacters = atob(base64);
  var byteArrays = [];
  for (var offset = 0; offset < byteCharacters.length; offset += 512) {
      var slice = byteCharacters.slice(offset, offset + 512);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mime });
}

// Guardar foto en sistema de archivos local
function guardarFotoEnFileSystem(blob) {
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
      fs.root.getFile('foto.png', { create: true }, function(fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
              fileWriter.write(blob);
              console.log("Imagen guardada en el sistema local.");
          }, function(error) {
              console.error("Error al crear el escritor del archivo:", error);
          });
      }, function(error) {
          console.error("Error al obtener el archivo:", error);
      });
  }, function(error) {
      console.error("Error al solicitar acceso al sistema de archivos:", error);
  });
}

// Evento para activar la cámara cuando la página se carga completamente
window.addEventListener('load', (e) => {
  encenderCamara();
});
