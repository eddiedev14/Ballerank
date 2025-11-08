export default function resolverConcursoTriples(concurso){
    //* Separar la lista de jugadores y los datos de lanzamientos
    const [jugadoresStr, lanzamientosStr] = concurso.split("--")
    const jugadores = jugadoresStr.split(",") // -> [jugador1, jugador2, jugador3]
    const lanzamientos = lanzamientosStr.split("*") // -> [lanzamiento1, lanzamiento2, lanzamiento3]

    // * Crear un objeto para mapear los lanzamientos, donde la key es el nombre del jugador y el valor un objeto con sus puntos y moneyballs
    const lanzamientosMapper = {};
    jugadores.forEach(jugador => {
        lanzamientosMapper[jugador] = {
            puntosTotales: 0,
            moneyBalls: 0
        };
    });

    //* Recorrer los lanzamientos
    lanzamientos.forEach(lanzamiento => {
        const [jugador, tirosStr] = lanzamiento.split(":")
        const datosJugador = lanzamientosMapper[jugador]

        // Variables de conteo
        let puntos = 0;
        let moneyBall = 0;

        // Se iteran sobre los tiros del jugador
        const tiros = tirosStr.split(" ") // -> [tiro1, tiro2, tiro3]

        tiros.forEach((tiro, indice) => {
            // Se verifica si es el último tiro
            const esUltimoTiro = indice === tiros.length - 1;

            // Se verifica si el tiro es 1 (encestó)
            if(tiro === "1"){
                if(esUltimoTiro){
                    puntos += 2;
                    moneyBall++;
                }else{
                    puntos++;
                }
            }
        })

        // Se actualizan los puntos y money balls del jugador
        datosJugador.puntosTotales += puntos;
        datosJugador.moneyBalls += moneyBall;
    })

    //* Preparar array para ordenamiento final
    const resultados = []

    jugadores.forEach(jugador => {
        // Se obtienen los datos del jugador
        const datosJugador = lanzamientosMapper[jugador]
        
        // Se añade el resultado del jugador al array de resultados
        resultados.push({
            jugador,
            puntosTotales: datosJugador.puntosTotales,
            moneyBalls: datosJugador.moneyBalls
        })
    })
    
    //* Ordenar los resultados
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

    //* Formatear la salida
    let salida = ""
    resultados.forEach((resultado, indice) => {
        // Se obtiene los resultados de cada jugador y se añaden a la salida con el formato deseado
        const posicion = indice + 1;
        const jugador = resultado.jugador;
        const puntosTotales = resultado.puntosTotales;
        const moneyBalls = resultado.moneyBalls;

        salida += `${posicion}) ${jugador} ${puntosTotales}p ${moneyBalls}m\n`
    })

    // Se retorna la salida
    return salida
}