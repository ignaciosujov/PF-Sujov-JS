function validarNumero(numero, mensaje){
    while(isNaN(numero)){
        alert("Ingrese un valor numerico por favor");
        numero = parseInt(prompt(mensaje));
    }
    return numero;
}


fetch('https://api.bluelytics.com.ar/v2/latest')
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data.blue)
        console.log(data.blue.value_buy)
    })

let nombreUserLS = localStorage.getItem("userName")
let nombreUser = ""

function cliente(){
    if (nombreUserLS){
        nombreUser = nombreUserLS
        TNA()
    }else{
        nombre = document.getElementById("tna")
        nombre.innerHTML = `
        <h2>Coder<span>Bank</span></h2>
        <p> Ingrese su nombre para continuar: <input type="text" id="nombreUser"> <input type="submit" value="Aceptar" onClick="TNA()"> </p>
        `
    }
}


class TasaNominalActual{
    constructor(tasa){
        this.tasa = tasa
        this.fecha = new Date()
    }
}
const tnaHoy = new TasaNominalActual (97)

function TNA(){
    if (nombreUserLS){
        let mostrarTNA = document.getElementById("tna")
        mostrarTNA.innerHTML = `
        <h2>Coder<span>Bank</span></h2>
        <p> Bienvenido ${nombreUser}! Simulá tu Plazo Fijo en <strong>Coder</strong>Bank </p>
        <p> Le informamos que la TNA<img id="imgTNA" onclick="" src="https://www.bbva.com.ar/simulador-plazo-fijo/img/help.e55ddb01.svg"> es de <span> ${tnaHoy.tasa}%</span>. Actualizado al ${tnaHoy.fecha.toLocaleDateString()}  </p>`

    }else{
        let nombreUser = document.getElementById("nombreUser").value
        localStorage.setItem("userName", nombreUser)

        let mostrarTNA = document.getElementById("tna")
        mostrarTNA.innerHTML = `
        <h2>Coder<span>Bank</span></h2>
        <p> Bienvenido ${nombreUser}! Simulá tu Plazo Fijo en <strong>Coder</strong>Bank </p>
        <p> Le informamos que la TNA<img id="imgTNA" onclick="" src="https://www.bbva.com.ar/simulador-plazo-fijo/img/help.e55ddb01.svg"> es de <span> ${tnaHoy.tasa}%</span>. Actualizado al ${tnaHoy.fecha.toLocaleDateString()}  </p>`
        
    }
    
    const imgTNA = document.getElementById("imgTNA")
    imgTNA.onclick = () => {
        swal.fire(
            '¿Que es la tasa nominal actual? (TNA)',
            'Indica el porcentaje que se cobrará en un plazo de un año sin períodos de capitalización intermedio.',
            'question'
        )
    }

    elegirMonto()
    elegirDias()
    const botonCalcular = document.getElementById("botonCalcular")
    botonCalcular.innerHTML = '<button type="submit" onclick="cotizarPlazoFijo()">Calcular Plazo Fijo</button>'

}



class MontosPlazoFijo{
    constructor(id, monto){
        this.id = id,
        this.monto = monto
    }
}
const monto1 = new MontosPlazoFijo(1, 10000)
const monto2 = new MontosPlazoFijo(2, 25000)
const monto3 = new MontosPlazoFijo(3, 50000)
const monto4 = new MontosPlazoFijo(4, 75000)
const monto5 = new MontosPlazoFijo(5, 100000)
const monto6 = new MontosPlazoFijo(6, "otro")

const opcionesPlazoFijo = [monto1, monto2, monto3, monto4, monto5, monto6];


class MesesPlazoFijo{
    constructor(id, cantDias){
        this.id = id,
        this.cantDias = cantDias
    }
}
const cantMes1 = new MesesPlazoFijo(1, 30)
const cantMes2 = new MesesPlazoFijo(2, 60)
const cantMes3 = new MesesPlazoFijo(3, 90)
const cantMes4 = new MesesPlazoFijo(4, 120)
const cantMes5 = new MesesPlazoFijo(5, "otro")

const opcionesMeses = [cantMes1, cantMes2, cantMes3, cantMes4, cantMes5];

let montoSeleccionado = ""

function elegirMonto(){
    let montosSeleccion = document.getElementById("montosSeleccion")
    let divMontoTitle = document.createElement("div")
    divMontoTitle.innerHTML = "<h3> Elija un monto a cotizar </h3>"
    montosSeleccion.append(divMontoTitle)

    opcionesPlazoFijo.forEach(e => {
        let divMonto = document.createElement("div")

        divMonto.innerHTML = `
        <div class="inputs">
            <input type="radio" name="monto" value="${e.id}" class="montoElegido" onchange="mostrarOtroMonto()">
            <label for="${e.id}"> ${e.monto} </label>
        </div>`
        montosSeleccion.append(divMonto)
    });

}



function mostrarOtroMonto(){
    let montoElegidoId = document.querySelector('input[name="monto"]:checked').value
    let otroMontoDiv = document.getElementById("otroMonto")
    
    if (montoElegidoId === "6"){
        otroMontoDiv.style.display = "block";
        let otroMontoInput = document.getElementById("montoPersonalizado").value
        montoSeleccionado = parseInt(otroMontoInput)

    }else{
        otroMontoDiv.style.display = "none"
        let montoElegidoMon = opcionesPlazoFijo.find(e => e.id === parseInt(montoElegidoId))
        montoSeleccionado = montoElegidoMon
        if (montoElegidoMon) {
            montoSeleccionado = montoElegidoMon.monto;
        } else {
            montoSeleccionado = "";
        }
    }



}

let diasSeleccionados = "";

function elegirDias(){
    let diasSeleccion = document.getElementById("cantDias")
    let divDiasSelect = document.createElement("div")
    divDiasSelect.innerHTML = `
    <label for="dias"><h3>A cuantos dias?</h3></label>
    <select name="dias" id="diasSelect" onchange="mostrarOtrosDias()">
        <option> Eliga la cantidad de dias </option>
    </select>`
    diasSeleccion.append(divDiasSelect)
    
    let diasSelect = document.getElementById("diasSelect")

    opcionesMeses.forEach(e => {
        let divDiasOption = document.createElement("option")
        
        divDiasOption.innerHTML = `
            <option value="${e.id}" id="optionDias">${e.cantDias}</option>`
        diasSelect.append(divDiasOption)
    })

}


function mostrarOtrosDias(){
    let diasElegidosId = document.querySelector('select[name="dias"]').value
    let otrosDias = document.getElementById("otrosDias")

    if (diasElegidosId === "otro"){
        otrosDias.style.display = "block"
        let otrosDiasInput = document.getElementById("diasPersonalizados").value
        diasSeleccionados = parseInt(otrosDiasInput);
    }else{
        otrosDias.style.display = "none"
        let diasElegidosCant = opcionesMeses.find(e => e.cantDias === parseInt(diasElegidosId))
        diasSeleccionados = diasElegidosCant;
        if (diasElegidosCant){
            diasSeleccionados = diasElegidosCant.cantDias;
        }else{
            diasSeleccionados = "";
        }
    }
}



cliente()


function cotizarPlazoFijo(){
    let interesMensual = montoSeleccionado * tnaHoy.tasa / 100 / 12;
    let montoAlFinalizarPF = parseInt(interesMensual * diasSeleccionados / 30 + montoSeleccionado)

    let PFCotizado = document.getElementById("PFCotizado")
    PFCotizado.innerHTML = `
    <div class="PFFinal">
        <div>
            <h4> Al final del plazo fijo, recibis </h4>
            <h2> $${montoAlFinalizarPF.toFixed(2)} </h2>
        </div>
        <div class="row infoPFFinal">
            <div class="col-2">
                <div>
                    <span> TNA </span>
                </div>
                <div class="infoAdicional">
                    <span> ${tnaHoy.tasa}% </span>
                </div>
            </div>
            <div class="col-10">
                <div>
                    <span> Interes mensual </span>
                </div>
                <div class="infoAdicional">
                    <span> $${interesMensual.toFixed(2)} </span>
                </div>
            </div>
        </div>
    </div>`
}


















/* function verMontoElegido(){
    const divMontoElegido = document.getElementById("montoElegidoOtro")

    divMontoElegido.innerHTML = `
    <form id="montoManual"> 
        <h4> ¿Que monto desea cotizar?</h4>
        <input type="number" id="montoAElegir">
        <input type="submit" value="Aceptar">
    </form>`

    document.getElementById("montoManual").addEventListener("submit", (e)=>{
        e.preventDefault()
        let infoEvent = e.target
        let montoManualElegido = infoEvent.querySelector('#montoAElegir')
        montoManualElegido = montoManualElegido.value
        opcionesPlazoFijo.monto.push(new MontosPlazoFijo(montoManualElegido))

    })
} */

