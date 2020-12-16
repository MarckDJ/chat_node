$(() => {
    const socket = io();
    socket.on("connect", () => {
        socket.emit(
            "saludo",
            "<strong>" + $("#user").val() + "</strong> a entrado a la sala"
        );
    });
    $(window).on("beforeunload", function () {
        socket.emit(
            "despedida",
            "<strong>" + $("#user").val() + "</strong> a salido de la sala"
        );
        socket.close();
    });
    socket.on("saludo", (msg) => {
        $("#mensajes").append(
            $(
                "<li class='list-group-item' style='background-color:#bb4d00'>"
            ).append(msg)
        );
    });
    socket.on("despedida", (msg) => {
        $("#mensajes").append(
            $(
                "<li class='list-group-item' style='background-color:#bb4d00'>"
            ).append(msg)
        );
    });
    socket.on("message", (msg) => {
        $("#mensajes").append(
            $(
                "<li class='list-group-item' style='background-color:#bb4d00'>"
            ).append(msg)
        );
    });
    $("#send").click(() => {
        socket.emit("myMessage", $("#chat-box").val());
        $("#mensajes").append(
            $(
                "<li class='list-group-item text-end' style='background-color:#bb4d00'>"
            ).append($("#chat-box").val())
        );
        $("#chat-box").val("");
    });
    $("#chat-box").keypress((event) => {
        if (event.which == 13 && $("#chat-box").val() != "") {
            socket.emit(
                "myMessage",
                "<strong>" +
                    $("#user").val() +
                    "</strong>: " +
                    $("#chat-box").val()
            );
            $("#mensajes").append(
                $(
                    "<li class='list-group-item text-end' style='background-color:#bb4d00'>"
                ).append($("#chat-box").val())
            );
            $("#chat-box").val("");
        }
    });
});
