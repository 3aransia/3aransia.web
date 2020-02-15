var BASE_API_ROUTE = "https://api3aransia.herokuapp.com/"
var DEBUG_LINK = "http://127.0.0.1:5000/transliterate_moroccan_route/"
var ARABIC_TRANSLITERATION_API_ROUTE = "transliterate_moroccan_route/"
var MOROCCAN_TRANSLITERATION_API_ROUTE = "transliterate_moroccan_arabic_route/"
var CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"

// Transliterate on ready
$(document).ready(function(){
    transliterate_moroccan()
    transliterate_moroccan_arabic()
});

// Transliterate on click
$(document).ready(function(){
    $('#transliterate-moroccan').click(function() {
        transliterate_moroccan()
    });
});

$(document).ready(function(){
    $('#transliterate-moroccan-arabic').click(function() {
        transliterate_moroccan_arabic()
    });
});

// Translitetation function
function transliterate_moroccan() {
    $("#transliteration-moroccan-arabic").empty()
    var sourceText = $("#source-text-moroccan").val()
    var parsedSourceText = sourceText.replace(new RegExp(" ", 'g'), '+');
    $.getJSON(CORS_ANYWHERE + BASE_API_ROUTE + ARABIC_TRANSLITERATION_API_ROUTE + parsedSourceText, function (result) {
        $("#transliteration-moroccan-arabic").append(result.moroccan_transliteration);
    });
} 

function transliterate_moroccan_arabic() {
    $("#transliteration-moroccan").empty()
    var sourceText = $("#source-text-moroccan-arabic").val()
    var parsedSourceText = sourceText.replace(new RegExp(" ", 'g'), '+');
    $.getJSON(CORS_ANYWHERE + BASE_API_ROUTE + MOROCCAN_TRANSLITERATION_API_ROUTE + parsedSourceText, function (result) {
        $("#transliteration-moroccan").append(result.moroccan_arabic_transliteration);
    });
} 