function getElementos() {
    var e = document.getElementsByName("op");
    var t = document.getElementById("texto");
    console.log("texto : " + t.value)

    e.forEach(element => {
      if (element.checked) {

        formSubmit(JSON.stringify({ origin: element.id, expr: t.value }))

      }

    });
  }


  function formSubmit(sendData) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3015/process");
    xhttp.send(sendData);

    /* Atualmente esta modificando o valor de um elemento, mas futuramente devera 
    criar um elemento em forma de card para cada keyword...
    */

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("texto1").innerHTML = this.responseText;
      }
    };

  }
