$(document).ready(function() {

    let pokeName = "{{ pokemon.dataValues.name }}";
    let pokeNameLowercase = pokeName.toLowerCase();
    let imageURL = 'https://github.com/setocourtney/quiz-masters/blob/front-end/images/' + pokeNameLowercase + '.png?raw=true'
    console.log(imageURL)
    $('.pokepic').attr('src', imageURL)

});
