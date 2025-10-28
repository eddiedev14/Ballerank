import resolverConcursoTriples from "./util.js";
import Alert from "./Alert.js"

//* Selectores
const formulario = document.getElementById("formulario");
const concursoInput = document.getElementById("concurso");
const resultado = document.getElementById("resultado")

//* Evento submit
formulario.addEventListener("submit", function(e) {
    e.preventDefault()

    // Obtener la cadena de texto
    const concurso = concursoInput.value;

    // Validaciones de la entrada -> No puede estar vacía
    if (concurso === "") {
        Alert.error("¡El concurso es obligatorio!")
        return
    }

    // Llamar a la función para procesar el concurso
    const salida = resolverConcursoTriples()

    // Mostrar resultado
    resultado.textContent = salida;
    Alert.success("¡Concurso analizado correctamente!")
})