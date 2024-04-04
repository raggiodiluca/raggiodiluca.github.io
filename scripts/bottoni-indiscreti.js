$(document).ready(function () {
  let name = "";
  let body = "";
  let encodedName = "";
  let encodedBody = "";

  let phoneNumber = "+393534664072";
  let emailAddress = "info@lucabessiaristei.it";

  function inputReader() {
    name = $(".contact-name").val();
    body = $(".contact-body").val();
    encodedName = encodeURIComponent(name);
    encodedBody = encodeURIComponent(body);
  }

  $("button.whatsapp-send").click(function () {
    inputReader();
    let whatsappUrl =
      "https://wa.me/" +
      phoneNumber +
      "?text=Salve%2C%0Ail%20mio%20nome%20%C3%A8%20" +
      encodedName +
      "%2C%0A" +
      encodedBody;

    window.open(whatsappUrl, "_blank");
  });

  $("button.email-send").click(function () {
    inputReader();
    let subject = "Messaggio da " + encodedName;
    let emailBody =
      "Salve%2C%0Ail%20mio%20nome%20%C3%A8%20" +
      encodedName +
      "%2C%0A" +
      encodedBody;
    let mailtoUrl =
      "mailto:" + emailAddress + "?subject=" + subject + "&body=" + emailBody;

    window.open(mailtoUrl, "_blank");
  });
});
