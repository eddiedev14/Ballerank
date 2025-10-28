export default function resolverConcursoTriples(concurso){
    //* Separar la lista de jugadores y los datos de lanzamientos
    const info = concurso.split("--") // -> [jugadores, lanzamientos]
    const lanzamientos = info[1].split("*") // -> [lanzamiento1, lanzamiento2, lanzamiento3]

    // * Crear un arreglo con los lanzamientos de cada jugador
    const intentos = lanzamientos.map(lanzamiento => {
        // Separar el nombre del jugador y sus tiros
        const lanzamientoInfo = lanzamiento.split(":") // -> [nombreJugador, tiros]
        const nombre = lanzamientoInfo[0]
        const tirosStr = lanzamientoInfo[1]

        // Convertir los tiros en números y guardarlos en un array
        const tiros = tirosStr.split(" ").map(x => parseInt(x)) // -> [tiro1, tiro2, tiro3]

        // Retornar un objeto en el arreglo intentos con nombre y tiros
        return {
            jugador: nombre,
            lanzamientos: tiros
        }
    })

    //* Agrupar lanzamientos por jugador -> key: nombre, value: arreglo de intentos
    const agrupados = {}

    intentos.forEach(intento => {
        // Si el jugador no existe aún en el objeto, se inicializa con un arreglo vacío
        if (!agrupados[intento.jugador]) {
            agrupados[intento.jugador] = []
        }

        // Se agrega el intento al final de la lista del jugador
        agrupados[intento.jugador].push(intento.lanzamientos)
    });

    console.log(agrupados)

    return ""
}