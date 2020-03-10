var CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
var BASE_API_ROUTE = 'https://app3aransia.herokuapp.com/'
var TRANSLITERATION_ROUTE = 'transliteration_route/'

// API Parameters
var TEXT_PARAMETER = '?text='
var SOURCE_LANGUAGE_PARAMETER = '&source-language='
var TARGET_LANGUAGE_PARAMETER = '&target-language='

var sourceLanguage = 'ma'
var targetLanguage = 'ar'

// Transliterate on ready
$(document).ready(function() {
    transliterate()
})

// Transliterate on keyup
$(document).ready(function() {
    $('#source-text').keyup(delay(function() {
        transliterate(sourceLanguage, targetLanguage)
    }, 500))
})

// Translitirate on source language change
$('#source-languages').on('click', 'li', function() {
    $('#source-language').text($(this).text());
    sourceLanguage = $(this).attr('id').split("-")[2]
    transliterate(sourceLanguage, targetLanguage)
});

// Translitirate on target language change
$('#target-languages').on('click', 'li', function() {
    $('#target-language').text($(this).text());
    targetLanguage = $(this).attr('id').split("-")[2]
    transliterate(sourceLanguage, targetLanguage)
});


// Translitetation function
function transliterate(sourceLanguage = 'ma', targetLanguage = 'ar') {
    $('#target-text').empty()
    var sourceText = $('#source-text').val()
    var parsedSourceText = sourceText.replace(new RegExp(' ', 'g'), '+')
    $.getJSON(CORS_ANYWHERE +
        BASE_API_ROUTE +
        TRANSLITERATION_ROUTE +
        TEXT_PARAMETER +
        parsedSourceText +
        SOURCE_LANGUAGE_PARAMETER +
        sourceLanguage +
        TARGET_LANGUAGE_PARAMETER +
        targetLanguage,
        function(result) {
            $('#target-text').append(result.transliteration)
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