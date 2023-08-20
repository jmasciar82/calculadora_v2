function start() {

    // Variables
    const calculo = document.getElementById('calculo');
    const resultado = document.getElementById('resultado');

    const botonesFuncion = document.querySelectorAll('.funciones div');
    const botonesNumero = document.querySelectorAll('.numeros div:not(#ac):not(#igual)');
    const botonIgual = document.getElementById('igual');
    const botonAC = document.getElementById('ac');
    const botonMarca = document.getElementById('marca');
    const botonPro = document.getElementById('pro');
    const botonOffOn = document.getElementById('off-on');


    const botonMC = document.getElementById('mc');
    const botonPoner = document.getElementById('poner');
    const botonBorraMemoria = document.getElementById('borrar');

    const botonPorcentaje = document.getElementById('porcentaje');
    const botonPi = document.getElementById('pi');
    const botonAbre = document.getElementById('abre-paren');
    const botonCierra = document.getElementById('cierra-paren');





    let datoGuardado





    const alumnos = [{
        nombre: 'Juan José',
        apellido: 'Masciarelli'
    }

    ]


    // Funciones y funciones Arrow 

    function borrarMemoria() {
        datoGuardado = null
        console.log(datoGuardado)


    }

    function guardar() {
        console.warn('boton para almacenar en memoria')

        datoGuardado = resultado.innerText
        console.log(datoGuardado)


    }
    function ponerDatoGuardado() {
        console.warn('boton para recuperar el numero en memoria')

        calculo.innerText = datoGuardado
        console.log(datoGuardado)

    }



    function modoCientifico() {

        const modo = document.querySelector('.cientifico');
        const func = document.querySelector('.funciones');
        const num = document.querySelector('.numeros');


        //modo on
        if (modo.style.display === "none" || modo.style.display === "") {
            modo.style.display = "grid";
            func.style.display = "grid";
            num.style.display = "grid";
            botonMarca.disabled = false;
            botonMarca.style.backgroundColor = "#06aa37";


            for (boton of botonesFuncion) {
                boton.style.borderColor = "#ffff";
            }






            calculo.style.backgroundColor = "#06aa37";
            resultado.style.backgroundColor = "#06aa37";


            botonOffOn.innerHTML = "ON"
            botonPro.style.backgroundColor = 'rgba(24,222,24,1)'
            botonPro.style.color = 'white'
            botonPro.style.borderColor = 'white'
            botonPro.style.boxShadow = `0.5px 1.5px 3.5px 7px rgba(255,255,255,255)`;

            //modo off
        } else {
            modo.style.display = "none";
            func.style.display = "none";
            num.style.display = "none";
            botonMarca.disabled = true;


            botonOffOn.innerHTML = "OFF"
            botonPro.style.backgroundColor = 'gray'
            botonPro.style.color = 'black'
            botonPro.style.boxShadow = 'none'

            calculo.style.backgroundColor = "#2227247a";
            resultado.style.backgroundColor = "#2227247a";
            botonMarca.style.backgroundColor = "#a7a3a3";

            limpio()


        }

    }


    const mostrarValor = num => calculo.innerHTML += `${num.target.innerText}`;

    const alumno = () => {
        let valor = '';
        for (let al of alumnos) {
            valor += `#${al.nombre} ${al.apellido}#<br>`;
        }

        resultado.innerHTML = valor + 'Academia 4.0';
    }

    const calcularResultado = _ => {

        let valor = calculo.innerHTML;

        if (!valor) {
            return
        }

        if (valor.includes('%')) {
            //obtengo los dos numero de cada lado del % para poder hacer la cuenta
            let valores = valor.split('%');
            if (valores.length === 2) {
                let porciento = parseFloat(valores[0]);
                let numero = parseFloat(valores[1]);
                let resultadoPorcentaje = (porciento / 100) * numero;
                // el resultado lo paso con formato de a miles y lo muestro en la pantalla resultado
                resultado.innerHTML = resultadoPorcentaje.toLocaleString('es-ES');
                return;
            }
        }



        let obtengoResultado = eval(calculo.innerHTML.replace(/pi/g, "Math.PI").replace(/\^/g, '**'));
        let stringValor = obtengoResultado.toLocaleString('es-ES');
        if (stringValor.length > 13) {
            stringValor = stringValor.substring(0, 13);
        }
        resultado.innerHTML = stringValor
    }






    const limpio = () => {
        resultado.innerHTML = null
        calculo.innerHTML = null

    }



    // Eventos 
    for (let boton of botonesNumero) {
        boton.addEventListener("click", mostrarValor);
    }

    for (let funcion of botonesFuncion) {
        funcion.addEventListener("click", mostrarValor);
    }


    botonIgual.addEventListener("click", calcularResultado);
    botonAC.addEventListener("click", limpio);
    resultado.addEventListener("click", limpio);
    botonMarca.addEventListener("click", alumno)
    botonPro.addEventListener("click", modoCientifico)

    botonAbre.addEventListener("click", mostrarValor) //
    botonCierra.addEventListener("click", mostrarValor) //
    botonPi.addEventListener("click", mostrarValor) //
    botonMC.addEventListener("click", guardar) //
    botonPoner.addEventListener("click", ponerDatoGuardado)
    botonBorraMemoria.addEventListener("click", borrarMemoria)


    // el evento contiene la funcion anonima para obtener el simbolo %
    botonPorcentaje.addEventListener("click", () => {
        calculo.innerHTML += '%';
    });

}


window.onload = start;
