export default function resolverConcursoTriples(concurso){
    //* Separar la lista de jugadores y los datos de lanzamientos
    const info = concurso.split("--") // -> [jugadores, lanzamientos]
    const jugadores = info[0].split(",") // -> [jugador1, jugador2, jugador3]
    const lanzamientos = info[1].split("*") // -> [lanzamiento1, lanzamiento2, lanzamiento3]

    // * Crear un objeto para mapear los lanzamientos, donde la key es el nombre del jugador y el valor un array con sus lanzamientos
    const lanzamientosMapper = {};
    jugadores.forEach(jugador => {
        lanzamientosMapper[jugador] = [];
    });

    // * Añadir lanzamientos en el objeto lanzamientosMapper
    lanzamientos.forEach(lanzamiento => {
        const lanzamientoInfo = lanzamiento.split(":") // -> [nombreJugador, tiros]
        const jugador = lanzamientoInfo[0]
        const tirosStr = lanzamientoInfo[1]

        // Convertir los tiros en números y guardarlos en un array
        const tiros = tirosStr.split(" ").map(x => parseInt(x)) // -> [tiro1, tiro2, tiro3]

        // Añadir los tiros al jugador correspondiente
        lanzamientosMapper[jugador].push(tiros)
    })

    //* Calcular puntos totales y money balls por jugador
    const resultados = [];

    jugadores.forEach(jugador => {
        const listaIntentos = lanzamientosMapper[jugador]
        let puntosTotales = 0;
        let moneyBalls = 0;

        // Se recorre cada intento (cada estación)
        listaIntentos.forEach(tiros => {
            tiros.forEach((tiro, indice) => {
                // Verifica si es el último tiro (indice igual a la longitud del array - 1)
                const esUltimoTiro = indice === tiros.length - 1;

                // Si el tiro es 1, significa que anotó
                if(tiro === 1){
                    // Se valida si encestó el último tiro (money ball)
                    if (esUltimoTiro) {
                        puntosTotales += 2;
                        moneyBalls++;
                    }else{
                        // Si no es el último tiro, se suma 1 punto
                        puntosTotales++;
                    }
                }
            })
        })

        // Se crea el objeto resultadoJugador
        const resultadoJugador = {
            jugador,
            puntosTotales,
            moneyBalls
        }
        
        // Se añade el resultado del jugador al array de resultados
        resultados.push(resultadoJugador)
    })

    // * Ordenar los resultados usando .sort()
    resultados.sort((a, b) => {
        // Criterio 1: ordenar por PUNTOS (de mayor a menor)
        if (a.puntosTotales !== b.puntosTotales) {
            return b.puntosTotales - a.puntosTotales;
        }

        // Criterio 2: ordenar por MONEY BALLS (de mayor a menor)
        if (a.moneyBalls !== b.moneyBalls) {
            return b.moneyBalls - a.moneyBalls;
        }

        // Criterio 3: ordenar alfabéticamente
        return a.jugador.localeCompare(b.jugador);
    })

    // * Formatear la salida
    let salida = ""
    resultados.forEach((resultado, indice) => {
        // Se obtiene los resultados de cada jugador y se añaden a la salida con el formato deseado
        const posicion = indice + 1;
        const jugador = resultado.jugador;
        const puntosTotales = resultado.puntosTotales;
        const moneyBalls = resultado.moneyBalls;

        salida += `${posicion}) ${jugador} ${puntosTotales}p, ${moneyBalls}m\n`
    })

    // Se retorna la salida
    return salida
}