var CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
var BASE_API_ROUTE = 'https://app3aransia.herokuapp.com/'
var TRANSLITERATION_ROUTE = 'transliteration_route/'

// API Parameters
var TEXT_PARAMETER = '?text='
var SOURCE_LANGUAGE_PARAMETER = '&source-language='
var TARGET_LANGUAGE_PARAMETER = '&target-language='

var sourceLanguageCode = 'ma'
var targetLanguageCode = 'ar'

// Transliterate on ready
$(document).ready(function() {
    transliterate()
})

// Transliterate on keyup
$(document).ready(function() {
    $('#source-text').keyup(delay(function() {
        transliterate(sourceLanguageCode, targetLanguageCode)
    }, 500))
})

// Translitirate on source language change
$('#source-languages').on('click', 'li', function() {
    $('#source-language').text($(this).text());
    sourceLanguageCode = $(this).attr('id').split("-")[2]

    var targetLanguage = $("#target-language").text()
    targetLanguageCode = ALPHABETS[targetLanguage]
    console.log(targetLanguageCode)
    transliterate(sourceLanguageCode, targetLanguageCode)
});

console.log(ALPHABETS)
    // Translitirate on target language change
$('#target-languages').on('click', 'li', function() {
    var sourceLanguage = $("#source-language").text()
    sourceLanguageCode = ALPHABETS[sourceLanguage]

    $('#target-language').text($(this).text());
    targetLanguageCode = $(this).attr('id').split("-")[2]

    console.log(sourceLanguage)
    console.log(sourceLanguageCode)
    transliterate(sourceLanguageCode, targetLanguageCode)
});


// Translitetation function
function transliterate(sourceLanguageCode = 'ma', targetLanguageCode = 'ar') {
    $('#target-text').empty()
    var sourceText = $('#source-text').val()
    var parsedSourceText = sourceText.replace(new RegExp(' ', 'g'), '+')
    $.getJSON(CORS_ANYWHERE +
        BASE_API_ROUTE +
        TRANSLITERATION_ROUTE +
        TEXT_PARAMETER +
        parsedSourceText +
        SOURCE_LANGUAGE_PARAMETER +
        sourceLanguageCode +
        TARGET_LANGUAGE_PARAMETER +
        targetLanguageCode,
        function(result) {
            $('#target-text').text(result.transliteration)
        })
}

// delay function to wait for user input to stop
function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback.apply(context, args);
        }, ms || 0);
    };
}

// Copy source to clipboard
$('#clip-source').on('click', function() {
    copyToClipboard("source-text");
});

// Copy target to clipboard
$('#clip-target').on('click', function() {
    copyToClipboard("target-text");
});

// Clip function
function copyToClipboard(elementId) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

// Swap source and target
$('#swap').on('click', function() {
    swap();
});

function swap() {
    var sourceText = $("#source-text").text()
    var targetText = $("#target-text").text()
    $('#source-text').text(targetText)
    $('#target-text').text(sourceText)

    var sourceLanguage = $("#source-language").text()
    var targetLanguage = $("#target-language").text()
    $('#source-language').text(targetLanguage);
    $('#target-language').text(sourceLanguage);
}