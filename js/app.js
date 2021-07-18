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
    document.getElementById("tdBalance").innerHTML = "$" + resultado.balance
}

function consultaBus() {
    var url = "https://api.xor.cl/red/bus-stop/" + document.getElementById("txtCodParadero").value
    console.log(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    var resultado = JSON.parse(xmlHttp.responseText);
    // console.log(resultado);
    var contenidos = ` <tr>
                    <td>Micro</td>
                    <td>Distancia</td>
                    <td>Tiempo aproximado</td>
                    <td>Patente</td>
                    </tr>`;

    resultado.services.forEach(bus => {
        console.log("bus:", bus);
        if (bus.valid) {
            bus.buses.forEach(bus2 => {
                contenidos = contenidos + ` <tr>
                <td>` + bus.id + `</td>
                <td>` + bus2.meters_distance + `</td>
                <td>` + bus2.min_arrival_time + `</td>
                <td>` + bus2.id + `</td>
                </tr>`;
            });
        }else {
            contenidos = contenidos + `<tr>
            <td>` + bus.id + `</td>
            <td colspan="3" class="centrarTexto">` + bus.status_description + `</td>
            </tr>
            `
        }
    });
    document.getElementById("tbBuses").innerHTML = contenidos;

}