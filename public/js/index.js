$(document).ready(function() {

    let spots = ["A1","A2","A3","A4","A5","A6","A7","A8","A9",
    "B1","B2","B3","B4","B5","B6","B7","B8","B9",
    "C1","C2","C3","C4","C5","C6","C7","C8","C9",
    "D1","D2","D3","D4","D5","D6","D7","D8","D9",
    "E1","E2","E3","E4","E5","E6","E7","E8","E9",
    "F1","F2","F3","F4","F5","F6","F7","F8","F9",
    "G1","G2","G3","G4","G5","G6","G7","G8","G9",
    "H1","H2","H3","H4","H5","H6","H7","H8","H9",
    "I1","I2","I3","I4","I5","I6","I7","I8","I9"];
    let pokeSpots = [];


    // choose spots where pokemon will be. if a spot is already in the array of spots chosen, it will choose another spot. 
    let choosePokeSpots = function() {
    for (i = 0; i < 5; i++) {
    let selectedSpot = spots[Math.floor(Math.random() * spots.length)];
    let noDupes = function() {
    if (pokeSpots.includes(selectedSpot) === true) {
        selectedSpot = spots[Math.floor(Math.random() * spots.length)];
        console.log('There was a duplicate')
        noDupes();
    }
    }   
    noDupes();

    pokeSpots.push(selectedSpot);
    }
    console.log(pokeSpots);
    for (let i = 0; i < pokeSpots.length; i++) {
    $(`#${pokeSpots[i]}`).attr({
        'data-toggle': 'modal',
        'data-target': '#myModal',
        'data-backdrop': 'static',
        'data-keyboard': 'false'
    })
    }
    }

    choosePokeSpots();



    $('.grass').on('click', function() {
    console.log($(this).attr("id"))
    let pokeNum = "";
    if (pokeSpots.includes($(this).attr("id")) === true) {
    console.log('You found a Pokemon!')
    pokeNum = Math.floor(Math.random() * 3 + 1);
    console.log(pokeNum);
    $('.test').replaceWith(`<div class="test">

                                    <div class="question">
                                        
                                    </div>

                                    <div class="answers">

                                        <div class="answer" id="option1">
                                            Answer 1
                                        </div>

                                        <div class="answer" id="option2">
                                            Answer 2
                                        </div>

                                        <div class="answer" id="option3">
                                            Answer 3
                                        </div>

                                        <div class="answer" id="option4">
                                            Answer 4
                                        </div>

                                    </div>

                                </div>`)
    $('.modal-footer').replaceWith(`
                <div class="modal-footer">
                    <button type="button" class="button primary" id="next" data-dismiss="modal">Run Away</button>
                </div>`)
    fetch(`/api/pokemon_data/${pokeNum}`)
    .then(function(response) {
    return response.json();
    })
    .then(function(json) {
    console.log(json);
    let pokeName = json.name;
    console.log(pokeName);
    let pokeNameLowercase = pokeName.toLowerCase();
    let imageURL = 'https://github.com/setocourtney/quiz-masters/blob/front-end/images/' + pokeNameLowercase + '.png?raw=true'

    $('#pokemon-name').replaceWith(`<h4 id="pokemon-name">${json.name}</h4>`)
    $('.pokepic').attr('src', imageURL)
        let pokemonType = json.typeOneId

        fetch(`../api/questions/${pokemonType}`)
        .then(function(results) {
            return results.json();
        }).then(function(questions) {
            console.log(questions)

            let answers = [];

            let chosenQuestion = Math.floor(Math.random() * questions.length)
            console.log(chosenQuestion)

            $('.question').replaceWith(`<div class="question">${questions[chosenQuestion].question}</div>`)
            $('#option1').replaceWith(`<div class="answer" data-answer="true" id="option1">${questions[chosenQuestion].answer}</div>`)



            let firstAnswer = {
                option: questions[chosenQuestion].answer,
                order: Math.random(),
                isAnswer: true
                }
            console.log(firstAnswer)

            answers.push(firstAnswer)


            $('.answer').on('click', function() {
                if ($(this).attr('data-answer') === "true") {
                    console.log("CORRECT")
                    $(this).attr('style', 'background-color:rgb(138,255,147);border:3px solid green')
                    $('.answers').attr('style','pointer-events:none');
                    $('#next').replaceWith(`<button type="button" class="button primary" id="next"> NEXT >> </button>`)
                    $('#next').on('click', function() {
                        $('.modal-footer').replaceWith(`<div class="modal-footer">`);
                        $('.test').replaceWith(
                            `<div class="test">
                                ${json.name} was impressed by your knowledge. 
                                Would you like ${json.name} to join you on your journey? 
                                <br><br>
                            <button type="button" class="button hallow secondary" id="capture">Capture!</button>
                            <button type="button" id="release" class="button hallow secondary" data-dismiss="modal">Part ways.</button>
                            <br><br>
                            </div>
                            `
                        )
                        //
                        $('#capture').on('click', function() {
                            fetch(`/api/user_data`)
                            .then(function(results) {
                                return results.json();
                            }).then(function(user) {
                                const addPokemon = {
                                    pokeId: json.pokeId,
                                    isCaptured: true,
                                    userId: user.id
                                }
                                console.log(addPokemon);
                                $.ajax("api/pokedex", {
                                    type: "POST",
                                    data: addPokemon
                                }).then(function() {
                                    console.log("pokemon added to pokedex")
                                    $('.test').replaceWith(`<div class="test">
                                        ${json.name} has joined your team! 
                                        <br><br>
                                        <button type="button" class="hollow button secondary" data-dismiss="modal">Let's go!</button>
                                        <br><br>
                                        </div>
                                        `)
                                })
                            })
                        })
                    })
                    $('#release').on('click', function() {
                            fetch(`/api/user_data`)
                            .then(function(results) {
                                return results.json();
                            }).then(function(user) {
                                const addPokemon = {
                                    pokeId: json.pokeId,
                                    isCaptured: false,
                                    userId: user.id
                                }
                                console.log(addPokemon);
                                $.ajax("api/pokedex", {
                                    type: "POST",
                                    data: addPokemon
                                }).then(function() {
                                    console.log("pokemon encounter added to pokedex")
                                })
                            })
                        })
                } else {
                    $(this).attr('style', 'background-color:rgb(255,179,182);border:3px solid red')
                    $('*[data-answer="true"]').attr('style', 'background-color:rgb(138,255,147);border:3px solid green')
                    $('.answers').attr('style','pointer-events:none');
                    $('#next').replaceWith(`<button type="button" class="button primary" id="next"> NEXT >> </button>`)
            }

            })

            /*let choosePokeSpots = function() {
            for (i = 0; i < 3; i++) {
                let selectedSpot = spots[Math.floor(Math.random() * spots.length)];
                let noDupes = function() {
                if (answers.includes(selectedSpot) === true) {
                    selectedSpot = spots[Math.floor(Math.random() * spots.length)];
                    console.log('There was a duplicate')
                    noDupes();
                }
                }   
                noDupes();
                
                answers.push(selectedSpot);
            }
        }*/


        })
    })
    }})
});
