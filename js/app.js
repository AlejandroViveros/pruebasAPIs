document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {
        format: "yyyy/mm/dd"
    });

    cargarRegiones();
});

function consultaAPI() {
    return new Promise((resolve, reject) => {
        try {
            var url = "https://api.xor.cl/red/balance/" + document.getElementById("txtNtarjeta").value;
            console.log(url);
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, false);
            xmlHttp.send(null);
            console.log(xmlHttp.responseText);
            var resultado = JSON.parse(xmlHttp.responseText);
            var respuesta = {
                id: resultado.id,
                status: resultado.status_description,
                balance: resultado.balance
            }
            resolve(respuesta);
        } catch (error) {
            
            reject("Pagina en mantencion");
        }
    })
}

function saldoBip() {
    consultaAPI().then((response) => {
        document.getElementById("tdNtarjeta").innerHTML = response.id
        document.getElementById("tdStatus").innerHTML = response.status
        document.getElementById("tdBalance").innerHTML = "$" + response.balance

    }).catch((error) => {
        document.getElementById("txtError").innerHTML = error;
        
    })
}

function consultaBus() {
    try {
        var url = "https://api.xor.cl/red/bus-stop/" + document.getElementById("txtCodParadero").value
        console.log(url);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        var resultado = JSON.parse(xmlHttp.responseText);
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
                    <td>` + bus2.meters_distance + ` (metros)</td>
                    <td>` + bus2.min_arrival_time + ` (minutos)</td>
                    <td>` + bus2.id + `</td>
                    </tr>`;
                });
            } else {
                contenidos = contenidos + `<tr>
                <td>` + bus.id + `</td>
                <td colspan="3" class="centrarTexto">` + bus.status_description + `</td>
                </tr>
                `
            }
        });
        document.getElementById("tbBuses").innerHTML = contenidos;

    } catch (error) {
        document.getElementById("txtError").innerHTML = "Pagina en mantención"

    }

}

function consultaSismos() {
    try {
        var url = "https://api.xor.cl/sismo/";
        if (document.getElementById("txtFecha").value.length > 0) {
            var fecha = document.getElementById("txtFecha").value.replaceAll("/", "");
            url = url + "?fecha=" + fecha
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        var resultado = JSON.parse(xmlHttp.responseText);
        console.log(resultado);
        var cero = 0;
        var contenidos = `<tr>
    <td>Fecha</td>
    <td>Lugar</td>
    <td>Magnitud</td>
    </tr> `;
        resultado.forEach(temblor => {
            console.log(temblor);
            cero = cero + 1;
            console.log("cero", cero);
            contenidos = contenidos + `<tr>
    <td>  ` + temblor.fechaLocal + `</td>
    <td>  ` + temblor.geoReferencia + `</td>
    <td>  ` + temblor.magnitudes[0].magnitud + `</td>
    </tr>`


        });
        document.getElementById("tbSismo").innerHTML = contenidos;

    } catch (error) {
        document.getElementById("txtError").innerHTML = "Pagina en mantención"
    }


}

function randomPerritos() {
    try {
        var url = "https://dog.ceo/api/breeds/image/random";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        var resultado = JSON.parse(xmlHttp.responseText);
        console.log(resultado.message);
        var imagen = document.getElementById("imagenPerrito");
        imagen.style.backgroundImage = "url(" + resultado.message + ")";
    } catch (error) {
        document.getElementById("txtError").innerHTML = "Pagina en mantención"
    }


}

function cargarRegiones() {
    try {
        var url = "https://apis.digital.gob.cl/dpa/regiones";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        var resultado = JSON.parse(xmlHttp.responseText);
        console.log(resultado);
        var contenidos = ` <option value="0">Escoja region</option> `
        resultado.forEach(region => {
            contenidos = contenidos + `<option value="` + region.codigo + `">` + region.nombre + `</option>`;
        });
        document.getElementById("selRegion").innerHTML = contenidos;
        var elems = document.getElementById("selRegion");
        var instances = M.FormSelect.init(elems, {});
    } catch (error) {
        document.getElementById("txtError").innerHTML = "Pagina en mantención"
    }


}

function cargarComunas() {
    try {
        var url = "https://apis.digital.gob.cl/dpa/regiones/" + document.getElementById("selRegion").value + "/comunas"
        console.log(url);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        var resultado = JSON.parse(xmlHttp.responseText);
        console.log(resultado);
        var contenidos = `<option value="0">Escoja comuna</option> `
        resultado.forEach(comuna => {
            contenidos = contenidos + `<option value="` + comuna.codigo + `">` + comuna.nombre + `</option>`;
        });
        document.getElementById("selComuna").innerHTML = contenidos;
        var elems = document.getElementById("selComuna");
        var instances = M.FormSelect.init(elems, {});
    } catch (error) {
        document.getElementById("txtError").innerHTML = "Pagina en mantención"
    }


}