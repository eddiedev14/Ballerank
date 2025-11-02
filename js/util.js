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

    console.log(lanzamientosMapper)

    return ""
}