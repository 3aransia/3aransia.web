var BASE_API_ROUTE = "https://api3aransia.herokuapp.com/"
var TRANSLATION_API_ROUTE = BASE_API_ROUTE + "translate_moroccan_arabic/"

$(document).ready(function(){
    translate_text()
});

$(document).ready(function(){
    $('#translate').click(function() {
        translate_text()
    });
});

function translate_text() {
    $("#translation").text("")
    var sourceText = $("#source-text").val()
    var parsedSourceText = sourceText.replace(new RegExp(" ", 'g'), '+');
    $.getJSON(TRANSLATION_API_ROUTE + parsedSourceText, function (result) {
        $.each(result, function (i, field) {
            var textNode = document.createTextNode(i+ " " +JSON.stringify(field));
            console.log(textNode) 
            console.log(result) 
            $("#translation").append(field.arabian_word + " ");
        });
    });
} 