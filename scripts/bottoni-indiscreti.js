$(document).ready(function() {
    $('button.whatsapp-send').click(function() {
        var name = $('.contact-name').val();
        var body = $('.contact-body').val();

        var encodedName = encodeURIComponent(name);
        var encodedBody = encodeURIComponent(body);

        var phoneNumber = "+393534664072";

        var whatsappUrl = "https://wa.me/" + phoneNumber + "?text=Salve%2C%0Ail%20mio%20nome%20%C3%A8%20" + encodedName + "%2C%0A" + encodedBody;

        window.open(whatsappUrl, '_blank');
    });
});
