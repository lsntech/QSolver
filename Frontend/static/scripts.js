



function getElementos() {
    var e = document.getElementsByName("op");
    var t = document.getElementById("texto");
    console.log("texto : " + t.value)

    e.forEach(element => {
      if (element.checked) {
        sendData = JSON.stringify({ op: element.id, expr: t.value });
        renderMethod = element.id;
        formSubmit(sendData, renderMethod)
  //    formSubmit(JSON.stringify({ op: element.id, expr: t.value }))

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
          console.log("recebi: " + responset + " render: " + renderMethod);
       // document.getElementById("texto1").innerHTML = this.responseText;

       if(renderMethod == "math"){ renderWolfram(responset)}
       if(renderMethod == "nlp") { renderWatson(responset)}


       }
    };
}

function renderWatson(data){

    console.log("renderWatson: " + data);
    data = JSON.parse(data);

    data["entities"].forEach(element => {
     //  console.log(element.type);
    //   document.write(element.type);
      var ent = document.createElement("label");
      ent.style = "display: table-row";
      ent.innerText = element.type;
      document.getElementById("entidades").appendChild(ent);
 
    });
 
    data["keywords"].forEach(element => {
       console.log(element.text);
    //   document.write(element.type);
      var ent = document.createElement("label");
      ent.style = "display: table-row";
      ent.innerText = element.text;
      document.getElementById("keywords").appendChild(ent);
      
 
    });
 }
 

 function renderWolfram(data){
    data = JSON.parse(data);
    console.log("renderWolfram: " + data);

    var ent = document.createElement("label");
    ent.style = "display: table-row";
    ent.innerText = data;
    document.getElementById("wolfram").appendChild(ent);
    
 }