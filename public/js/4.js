// On() will add listeners for all potential future elements (dont use Click())
$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");

});

$("ul").on("click", ".deleteButton", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
    if (event.which === 13 && $(this).val().length > 1) {
        var inputed = $(this).val();
        $(this).val("");
        $("ul").append('<li><span class="deleteButton"><i class="fa fa-trash"></i></span> </span>' + inputed + "</li>");
    }
});

$(".fa-plus").click(function () {
    $("input[type='text']").fadeToggle(300);
});