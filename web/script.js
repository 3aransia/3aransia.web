var CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
var BASE_API_ROUTE = 'https://api3aransia.herokuapp.com/'
var TRANSLITERATION_ROUTE = 'transliteration_route/'

// API Parameters
var TEXT_PARAMETER = '?text='
var SOURCE_LANGUAGE_PARAMETER = '&source-language=ma'
var TARGET_LANGUAGE_PARAMETER = '&target-language=ar'

// Transliterate on ready
$(document).ready(function() {
    transliterate()
})

// Transliterate on click
$(document).ready(function() {
    $('#transliterate').click(function() {
        transliterate()
    })
})

// Translitetation function
function transliterate() {
    $('#output-text').empty()
    var sourceText = $('#source-text').val()
    var parsedSourceText = sourceText.replace(new RegExp(' ', 'g'), '+')
    $.getJSON(CORS_ANYWHERE +
        BASE_API_ROUTE +
        TRANSLITERATION_ROUTE +
        TEXT_PARAMETER +
        parsedSourceText +
        SOURCE_LANGUAGE_PARAMETER +
        TARGET_LANGUAGE_PARAMETER,
        function(result) {
            $('#output-text').append(result.transliteration)
        })
}