var BASE_API_ROUTE = "https://api3aransia.herokuapp.com/"
var DEBUG_LINK = "http://127.0.0.1:5000/translate_arabic_moroccan/"
var ARABIC_TRANSLITERATION_API_ROUTE = "translate_moroccan_arabic/"
var MOROCCAN_TRANSLITERATION_API_ROUTE = "translate_arabic_moroccan/"
var CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"


$(document).ready(function(){
    translate_moroccan()
    translate_moroccan_arabic()
});

$(document).ready(function(){
    $('#translate-moroccan').click(function() {
        translate_moroccan()
    });
});

$(document).ready(function(){
    $('#translate-moroccan-arabic').click(function() {
        translate_moroccan_arabic()
    });
});

function translate_moroccan() {
    $("#transliteration-moroccan-arabic").text("")
    var sourceText = $("#source-text-moroccan").val()
    var parsedSourceText = sourceText.replace(new RegExp(" ", 'g'), '+');
    $.getJSON(CORS_ANYWHERE + BASE_API_ROUTE + ARABIC_TRANSLITERATION_API_ROUTE + parsedSourceText, function (result) {
        $("#transliteration-moroccan-arabic").append(result.moroccan_transliteration);
    });
} 

function translate_moroccan_arabic() {
    $("#transliteration-moroccan").text("")
    var sourceText = $("#source-text-moroccan-arabic").val()
    var parsedSourceText = sourceText.replace(new RegExp(" ", 'g'), '+');
    $.getJSON(CORS_ANYWHERE + BASE_API_ROUTE + MOROCCAN_TRANSLITERATION_API_ROUTE + parsedSourceText, function (result) {
        $("#transliteration-moroccan").append(result.moroccan_arabic_transliteration);
    });
} 