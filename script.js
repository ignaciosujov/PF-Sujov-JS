function validarNumero(numero, mensaje){
    while(isNaN(numero)){
        alert("Ingrese un valor numerico por favor");
        numero = parseInt(prompt(mensaje));
    }
    return numero;
}


let nombreUserLS = localStorage.getItem("userName")
let nombreUser = ""

function cliente(){
    if (nombreUserLS){
        nombreUser = nombreUserLS
        tipoInversion = localStorage.getItem("tipoInversion")

        if (tipoInversion == "pesos"){
            TNA()
        }else{
            pedirDolar()
        }
    }else{
        nombre = document.getElementById("tna")
        nombre.innerHTML = `
        <h2>Coder<span>Bank</span></h2>
        <p> Ingrese su nombre para continuar:</p> <input type="text" id="nombreUser">  
        <div class="elegirPF"><p> Tipo de plazo fijo:</p>
            <input type="radio" name="tipoPF" value="pesos" onchange="tipoPlazoFijo()">
            <label for="pesos"> Pesos </label>
            <input type="radio" name="tipoPF" value="dolares" onchange="tipoPlazoFijo()">
            <label for="dolares"> Dolares </label></div>
        `
        
    }
}

function tipoPlazoFijo(){
    
    const nameYTipo = document.getElementById("aceptarNameYTipo")
    if(nameYTipo){
        ""
    }else{
        let tipoPF = document.getElementById("tna")
        let divTipoPF = document.createElement("div")
        divTipoPF.innerHTML = `
        <input type="submit" value="Aceptar" id="aceptarNameYTipo" onclick="mostrarContenido()"> `
        tipoPF.append(divTipoPF)
    }
    
    
}

function mostrarContenido(){
    let tipoElegido = document.querySelector('input[name="tipoPF"]:checked').value

    localStorage.setItem("tipoInversion", tipoElegido)

    const nashei = document.getElementById("aceptarNameYTipo")
    if(tipoElegido == "pesos"){
        nashei.addEventListener("click", TNA())
    }else{
        nashei.addEventListener("click", pedirDolar())
    }
}


class TasaNominalActual{
    constructor(tasa){
        this.tasa = tasa
        this.fecha = new Date()
    }
}
const tnaHoy = new TasaNominalActual (97)
const tnaHoyDolares = new TasaNominalActual(0.15)

function TNA(){
    localStorage.setItem("tipoInversion", "pesos")

    if (nombreUserLS){
        let mostrarTNA = document.getElementById("tna")
        mostrarTNA.innerHTML = `
        <h2>Coder<span>Bank</span></h2>
        <p> Bienvenido ${nombreUser}! Simulá tu Plazo Fijo en pesos en <strong>Coder</strong>Bank </p>
        <p> Le informamos que la TNA<img id="imgTNA" onclick="" src="https://www.bbva.com.ar/simulador-plazo-fijo/img/help.e55ddb01.svg"> es de <span> ${tnaHoy.tasa}%</span>. Actualizado al ${tnaHoy.fecha.toLocaleDateString()}  </p>
        <p onclick="pedirDolar()" id="cambiarPF"> Hacer en dolares </p>`
        

    }else{
        let nombreUser = document.getElementById("nombreUser").value
        localStorage.setItem("userName", nombreUser)

        let mostrarTNA = document.getElementById("tna")
        mostrarTNA.innerHTML = `
        <h2>Coder<span>Bank</span></h2>
        <p> Bienvenido ${nombreUser}! Simulá tu Plazo Fijo en pesos en <strong>Coder</strong>Bank </p>
        <p> Le informamos que la TNA<img id="imgTNA" onclick="" src="https://www.bbva.com.ar/simulador-plazo-fijo/img/help.e55ddb01.svg"> es de <span> ${tnaHoy.tasa}%</span>. Actualizado al ${tnaHoy.fecha.toLocaleDateString()}  </p>
        <p onclick="pedirDolar()" id="cambiarPF"> Hacer en dolares </p>`
        
        
    }
    
    const imgTNA = document.getElementById("imgTNA")
    imgTNA.onclick = () => {
        swal.fire(
            '¿Que es la tasa nominal actual? (TNA)',
            'Indica el porcentaje que se cobrará en un plazo de un año sin períodos de capitalización intermedio.',
            'question'
        )
    }

    let montosSeleccion = document.getElementById("inputsMontos")
    if (montosSeleccion){
    }else{
        elegirMonto()
    }

    let diasSeleccion = document.getElementById("diasSelect")
    if (diasSeleccion){
    }else{
        elegirDias()
    }

    const botonCalcular = document.getElementById("botonCalcular")
    botonCalcular.innerHTML = '<button type="submit" onclick="cotizarPlazoFijo()">Calcular Plazo Fijo</button>'

}

const pedirDolar = async () => {
    const valorDolar = await fetch('https://api.bluelytics.com.ar/v2/latest')
    const data = await valorDolar.json()
    TNADolares(data)
}


function TNADolares(data){
    const dolarHoy = data.blue.value_buy
    localStorage.setItem("tipoInversion", "dolares")


    if (nombreUserLS){
        let mostrarTNA = document.getElementById("tna")
        mostrarTNA.innerHTML = `
        <h2>Coder<span>Bank</span></h2>
        <p> Bienvenido ${nombreUser}! Simulá tu Plazo Fijo en dolares en <strong>Coder</strong>Bank </p>
        <p> Le informamos que la TNA<img id="imgTNA" onclick="" src="https://www.bbva.com.ar/simulador-plazo-fijo/img/help.e55ddb01.svg"> es de <span> ${tnaHoyDolares.tasa}%</span> y el cambio al dolar blue es de $${dolarHoy}. Actualizado al ${tnaHoyDolares.fecha.toLocaleDateString()}  </p>
        <p> 
        <p onclick="TNA()" id="cambiarPF"> Hacer en pesos </p>`
        
    }else{
        let nombreUser = document.getElementById("nombreUser").value
        localStorage.setItem("userName", nombreUser)
        
        let mostrarTNA = document.getElementById("tna")
        mostrarTNA.innerHTML = `
        <h2>Coder<span>Bank</span></h2>
        <p> Bienvenido ${nombreUser}! Simulá tu Plazo Fijo en dolares en <strong>Coder</strong>Bank </p>
        <p> Le informamos que la TNA<img id="imgTNA" onclick="" src="https://www.bbva.com.ar/simulador-plazo-fijo/img/help.e55ddb01.svg"> es de <span> ${tnaHoyDolares.tasa}%</span> y el cambio al dolar blue es $${dolarHoy}. Actualizado al ${tnaHoyDolares.fecha.toLocaleDateString()}  </p>
        <p onclick="TNA()" id="cambiarPF"> Hacer en pesos </p>`
        
    }
    
    
    const imgTNA = document.getElementById("imgTNA")
    imgTNA.onclick = () => {
        swal.fire(
            '¿Que es la tasa nominal actual? (TNA)',
            'Indica el porcentaje que se cobrará en un plazo de un año sin períodos de capitalización intermedio.',
            'question'
        )
    }
    let montosSeleccion = document.getElementById("inputsMontos")
    if (montosSeleccion){
    }else{
        elegirMonto()
        
    }

    let diasSeleccion = document.getElementById("diasSelect")
    if (diasSeleccion){
    }else{
        elegirDias()
    }

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
        <div class="inputs" id="inputsMontos">
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
        <option> Elija la cantidad de dias </option>
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

let montoAlFinalizarPF = ""
let TNAFinal = ""
let tipoMoneda = ""

function cotizarPlazoFijo(){
    let PFCotizado = document.getElementById("PFCotizado")
    PFCotizado.innerHTML = `<div  class="cargando"><h4> Cargando </h4></div>`
    const cargando = setInterval(() => {
        setTimeout(() => {
            PFCotizado.innerHTML = `<div class="cargando"><h4> Cargando </h4></div>`
        }, 0)
        setTimeout(() => {
            PFCotizado.innerHTML = `<div class="cargando"><h4> Cargando. </h4></div>`
        }, 50)
        setTimeout(() => {
            PFCotizado.innerHTML = `<div class="cargando"><h4> Cargando.. </h4></div>`
        }, 500)
        setTimeout(() => {
            PFCotizado.innerHTML = `<div class="cargando"><h4> Cargando... </h4></div>`
        }, 1300)
        
    }, 1700)
    
    setTimeout(() => {
        clearInterval(cargando)
    }, 3100)

    const tipoInversion = localStorage.getItem("tipoInversion")
    
    setTimeout(() => {
        if (tipoInversion === "pesos"){
            TNAFinal = tnaHoy.tasa
            tipoMoneda = "$"
        }else{
            TNAFinal = tnaHoyDolares.tasa
            tipoMoneda = "USD"
            conversionAPesos()
        }


        let interesMensual = montoSeleccionado * TNAFinal / 100 / 12;
        montoAlFinalizarPF = parseFloat(interesMensual * diasSeleccionados / 30 + montoSeleccionado)
        let PFCotizado = document.getElementById("PFCotizado")
        PFCotizado.innerHTML = `
        <div class="PFFinal">
            <div>
                <h4> Al final del plazo fijo, recibis: </h4>
                <h2> ${tipoMoneda} ${montoAlFinalizarPF.toFixed(2)} </h2>
            </div>
            <div class="row infoPFFinal">
                <div class="col-2">
                    <div>
                        <span> TNA </span>
                    </div>
                    <div class="infoAdicional">
                        <span> ${TNAFinal}% </span>
                    </div>
                </div>
                <div class="col-10">
                    <div>
                        <span> Interes mensual </span>
                    </div>
                    <div class="infoAdicional">
                        <span> ${tipoMoneda} ${interesMensual.toFixed(2)} </span>
                    </div>
                </div>
            </div>
        </div>`
        guardarMov()
    }
    , 4500)

}

function guardarMov(){
    class Movimiento{
        constructor(tipo, monto){
            this.tipo = tipo,
            this.monto = monto,
            this.fecha = new Date()
        }
    }
    
    const MOVIMIENTOS = [
        new Movimiento(tipoInversion, montoAlFinalizarPF, this.fecha),
        new Movimiento("pesos", 10000, this.fecha)
    ]
    
    localStorage.setItem("Movimiento", MOVIMIENTOS)
    localStorage.setItem("Movimiento", JSON.stringify(MOVIMIENTOS))
}



function conversionAPesos(){
    fetch('https://api.bluelytics.com.ar/v2/latest')
    .then((res) => res.json())
    .then((data) => {
        let valorDolar = data.blue.value_buy
        let PFCotizado = document.getElementById("PFCotizado")
        let DivPFCotizado = document.createElement("div")
        DivPFCotizado.innerHTML = `
        <div class="PFFinal"><p> Siendo equivalente en pesos a: <h5>$${montoAlFinalizarPF * valorDolar} </h5></p></div>`
        PFCotizado.append(DivPFCotizado)
    })
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

