JotForm.init(function () {
    if (window.JotForm && JotForm.accessible) $('input_9').setAttribute('tabindex', 0);
    if (window.JotForm && JotForm.accessible) $('input_10').setAttribute('tabindex', 0);
    JotForm.setPhoneMaskingValidator('input_13_full', '(###) ###-####');
    if (window.JotForm && JotForm.accessible) $('input_5').setAttribute('tabindex', 0);
    JotForm.setCustomHint('input_5', 'Type here...');
    JotForm.newDefaultTheme = true;
    JotForm.extendsNewTheme = false;
    JotForm.newPaymentUIForNewCreatedForms = true;
    JotForm.newPaymentUI = true;
    JotForm.alterTexts(undefined);
    JotForm.clearFieldOnHide = "disable";
    JotForm.submitError = "jumpToFirstError";
    /*INIT-END*/
});

JotForm.prepareCalculationsOnTheFly([null, null, {
    "name": "submit2",
    "qid": "2",
    "text": "Submit",
    "type": "control_button"
}, null, null, {
    "description": "",
    "name": "input5",
    "qid": "5",
    "subLabel": "",
    "text": "",
    "type": "control_textarea"
}, null, null, null, {
    "description": "",
    "name": "name",
    "qid": "9",
    "subLabel": "",
    "text": "Name",
    "type": "control_textbox"
}, {
    "description": "",
    "name": "company",
    "qid": "10",
    "subLabel": "",
    "text": "Company",
    "type": "control_textbox"
}, null, null, {
    "description": "",
    "name": "phoneNumber",
    "qid": "13",
    "text": "Phone Number",
    "type": "control_phone"
}, {
    "description": "",
    "name": "email",
    "qid": "14",
    "subLabel": "",
    "text": "Email",
    "type": "control_email"
}]);
setTimeout(function () {
    JotForm.paymentExtrasOnTheFly([null, null, {
        "name": "submit2",
        "qid": "2",
        "text": "Submit",
        "type": "control_button"
    }, null, null, {
        "description": "",
        "name": "input5",
        "qid": "5",
        "subLabel": "",
        "text": "",
        "type": "control_textarea"
    }, null, null, null, {
        "description": "",
        "name": "name",
        "qid": "9",
        "subLabel": "",
        "text": "Name",
        "type": "control_textbox"
    }, {
        "description": "",
        "name": "company",
        "qid": "10",
        "subLabel": "",
        "text": "Company",
        "type": "control_textbox"
    }, null, null, {
        "description": "",
        "name": "phoneNumber",
        "qid": "13",
        "text": "Phone Number",
        "type": "control_phone"
    }, {
        "description": "",
        "name": "email",
        "qid": "14",
        "subLabel": "",
        "text": "Email",
        "type": "control_email"
    }]);
}, 20);