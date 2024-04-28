document.getElementById("logqr").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "block";
});

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
  });

  //============================================================================
  document.getElementById("logmanual").addEventListener("click", function () {
    document.getElementById("myModalManual").style.display = "block";
  });
  
  document
    .getElementsByClassName("closeManual")[0]
    .addEventListener("click", function () {
      document.getElementById("myModalManual").style.display = "none";
    });