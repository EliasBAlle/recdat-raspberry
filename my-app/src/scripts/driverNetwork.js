
function updateNetworkStatus() {
  var wifiIcon = document.getElementById("wifiIcon");

  if (navigator.onLine) {
    wifiIcon.src = "../img/netstate/wifi2.svg"
  } else {
    wifiIcon.src = "../img/netstate/wifi_off.svg"
  }

}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

updateNetworkStatus();

var wifiIcon = document.getElementById('wifiIcon');

wifiIcon.addEventListener('click', function() {

  var modal = document.getElementById('myModalNetwork');
  modal.style.display = 'block';

  var modalFrame = document.getElementById('modalFrameNetwork');
  modalFrame.src = '../src/views/settings-network.html';
});

var closeModal = document.getElementsByClassName('closeNetwork')[0];

closeModal.addEventListener('click', function() {
  var modal = document.getElementById('myModalNetwork');
  modal.style.display = 'none';
});