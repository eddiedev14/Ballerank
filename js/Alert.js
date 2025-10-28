const notyf = new Notyf({
    position: {
        x: "right",
        y: "top"
    }
});

export default class Alert{
    static success(mensaje){
        notyf.success(mensaje)
    }

    static error(mensaje){
        notyf.error(mensaje)
    }
}