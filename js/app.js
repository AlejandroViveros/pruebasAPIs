function saldoBip() {
    var url = "https://api.xor.cl/red/balance/" + document.getElementById("txtNtarjeta").value;
    console.log(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    console.log(xmlHttp.responseText);
    var resultado = JSON.parse(xmlHttp.responseText);
    // resultado = JSON.parse(resultado);
    document.getElementById("tdNtarjeta").innerHTML = resultado.id
    document.getElementById("tdStatus").innerHTML = resultado.status_description
    document.getElementById("tdBalance").innerHTML = "$"+resultado.balance
}