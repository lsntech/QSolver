


function getElementos() {
    var e = document.getElementsByName("op");
    var t = document.getElementById("texto");
    
    e.forEach(element => {
      if (element.checked) {
        sendData = JSON.stringify({ op: element.id, expr: t.value });
        renderMethod = element.id;
        formSubmit(sendData, renderMethod)
 
      }

    });
  }


function formSubmit(sendData, renderMethod) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3015/process");
  xhttp.send(sendData);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        responset = this.responseText;
      
    if(renderMethod == "math"){ renderWolfram(responset)}
    if(renderMethod == "nlp") { renderWatson(responset)}

    }
  };
}

function renderWatson(data){
    data = JSON.parse(data);

    data["entities"].forEach(element => {
      var ent = document.createElement("label");
      ent.style = "display: table-row";
      ent.innerText = element.type;
      document.getElementById("entidades").appendChild(ent);
    });
 
    data["keywords"].forEach(element => {
      var ent = document.createElement("label");
      ent.style = "display: table-row";
      ent.innerText = element.text;
      document.getElementById("keywords").appendChild(ent);
    });
 }
 

 function renderWolfram(data){
    data = JSON.parse(data);
    
    var ent = document.createElement("label");
    ent.style = "display: table-row";
    ent.innerText = data;
    document.getElementById("wolfram").appendChild(ent);
    
 }