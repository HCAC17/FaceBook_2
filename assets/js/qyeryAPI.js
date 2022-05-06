var imputOrigem = document.getElementById('input1');
var imputDestino = document.getElementById('input2');
var email = document.getElementById('input3')
var senha = document.getElementById('input4')
var inputChat = document.getElementById('inputChat')
var campoChat = document.getElementById('aqui')

var interval  = undefined;

var obj = {}

pesquisaCadas(); 

inputChat.value = '?';
senha.value = "?"; 
email.value = "?"; 

function login () {
    var xhr = new XMLHttpRequest();
    console.log(email.value, senha.value)
    xhr.open("GET",`?`);
    xhr.send(null);

    xhr.onreadystatechange = function () {
        console.log(JSON.parse(xhr.responseText))
      if (xhr.readyState === 4) {
        //console.log("aquifoi");
        if (xhr.status === 200) {

            //campoChat.innerHTML='';
            response = JSON.parse(xhr.responseText);
            if(response.login){
                imputDestino.disabled  = false;
                inputChat.disabled  = false;
                inputChat.selected  = true;
                imputOrigem.value = response.nome
            }
            //console.log(response);
        }
      }
    };
  }


  function pesquisaCadas () {
    var xhr = new XMLHttpRequest();
    console.log(email.value, senha.value)
    xhr.open("GET",`?`);
    xhr.send(null);

    xhr.onreadystatechange = function () {
        console.log(JSON.parse(xhr.responseText))
      if (xhr.readyState === 4) {
        //console.log("aquifoi");
        if (xhr.status === 200) {
          
            //campoChat.innerHTML='';
            response = JSON.parse(xhr.responseText);

            for(let i = 0; i < response.length; i++){
              var opition = document.createElement('option');
              var nomeOp = document.createTextNode(response[i].nome);
              opition.appendChild(nomeOp);
              opition.setAttribute('value', `${response[i].nome}`);
              imputDestino.appendChild(opition);
            }
            //console.log(response);
        }
      }
    };
  }

function pesquisarAPI () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET",`?`);
    xhr.send(null);

    xhr.onreadystatechange = function () {

      if (xhr.readyState === 4) {
        //console.log("aquifoi");
        if (xhr.status === 200) {

            campoChat.innerHTML='';

            response = JSON.parse(xhr.responseText);

            //console.log(response);
            
            for(let x = 0; x < response.length; x++){
                var li = document.createElement('li');

                var dt = document.createElement('dt');
                var dtText = document.createTextNode(
                    `${response[x].origem}`
                )
                dt.appendChild(dtText);
                li.appendChild(dt);

                var dd = document.createElement('dd');
                var ddText = document.createTextNode(
                    `${response[x].mensagem}`  
                )
                dd.appendChild(ddText);
                li.appendChild(dd);
                
                campoChat.appendChild(li);
          }
        }
      }
    };
  }


function chat () {
    clearInterval(interval);
    var xhr = new XMLHttpRequest();

    obj = {
        destino: imputDestino.value,
        origem: imputOrigem.value,
        mensagem: inputChat.value,
    }

    xhr.open("POST", "?");
    xhr.send(JSON.stringify(obj));

    xhr.onreadystatechange = function () {

        //console.log(xhr.readyState)
        if (xhr.readyState === 4) {
            
            //console.log(xhr.status)
            if (xhr.status == 201) {
                console.log('mando');
                interval = setInterval(function(){
                    pesquisarAPI();
                },5000)
            }
        }
    };  
}// fim pesquisa