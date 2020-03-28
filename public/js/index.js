$(document).ready(function() {
  let spots = [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "E7",
    "E8",
    "E9",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "G9",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "H8",
    "H9",
    "I1",
    "I2",
    "I3",
    "I4",
    "I5",
    "I6",
    "I7",
    "I8",
    "I9"
  ];

  let pokeSpots = [];

  // choose spots where pokemon will be. if a spot is already in the array of spots chosen, it will choose another spot.
  let choosePokeSpots = function() {
    for (i = 0; i < 5; i++) {
      let selectedSpot = spots[Math.floor(Math.random() * spots.length)];
      let noDupes = function() {
        if (pokeSpots.includes(selectedSpot) === true) {
          selectedSpot = spots[Math.floor(Math.random() * spots.length)];
          noDupes();
        }
      };
      noDupes();

      pokeSpots.push(selectedSpot);
    }

    //making each of the spots where pokemon are activate the modal
    for (let i = 0; i < pokeSpots.length; i++) {
      $(`#${pokeSpots[i]}`).attr("data-open", "myModal");
    }
  };

  choosePokeSpots();
  $(".grass").on("click", function() {
    let pokeNum = "";
    if (pokeSpots.includes($(this).attr("id")) === true) {
      console.log("You found a Pokemon!");
      $(".grasspic").toggleClass("transparent");
      pokeNum = Math.floor(Math.random() * 151 + 1);
      $(".test").replaceWith(`<div class="test">
<<<<<<< HEAD
        <div>
=======
      <div>
>>>>>>> data
        <br><br>
        A wild a Pokemon appeared!
        <br><br>
    </div>
    `);
      $(".modal-footer")
        .replaceWith(
          `
    <div class="modal-footer">
        <button type="button" class="button primary " id="encounter" data-close aria-label="Close reveal">Engage</button>
    </div>`
        )
        .foundation();
      $("#encounter").on("click", function() {
        $(".test").replaceWith(`<div class="test">

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

                                </div>`);
        $(".modal-footer")
          .replaceWith(
            `
                <div class="modal-footer">
                    <button type="button" class="button primary " id="run" data-close aria-label="Close reveal">Run Away</button>
                </div>`
          )
          .foundation();
        fetch(`/api/pokemon_data/${pokeNum}`)
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            let pokeName = json.name;
            let pokeNameLowercase = pokeName.toLowerCase();
            let imageURL =
              "https://github.com/setocourtney/quiz-masters/blob/front-end/images/" +
              pokeNameLowercase +
              ".png?raw=true";

            $("#pokemon-name").replaceWith(
              `<h4 id="pokemon-name">${json.name}</h4>`
            );
            $(".pokepic").attr("src", imageURL);
            let pokemonType = json.typeOneId;

            fetch(`../api/questions/${pokemonType}`)
              .then(function(results) {
                return results.json();
              })
              .then(function(questions) {
                let answers = [];

                let chosenQuestion = Math.floor(
                  Math.random() * questions.length
                );

                $(".question").replaceWith(
                  `<div class="question">${questions[chosenQuestion].question}</div>`
                );

                let firstAnswer = questions[chosenQuestion].answer;

                answers.push(firstAnswer);

                // choosing answers
                for (let i = 0; i < 3; i++) {
                  let otherAnswer = Math.floor(
                    Math.random() * questions.length
                  );

                  let fakeAnswerData = questions[otherAnswer].answer;

                  //making sure there aren't duplicate answers
                  let noDupeAnswers = function() {
                    if (answers.includes(fakeAnswerData) === true) {
                      fakeAnswerData =
                        questions[Math.floor(Math.random() * questions.length)]
                          .answer;
                      noDupeAnswers();
                    }
                  };
                  noDupeAnswers();

                  answers.push(fakeAnswerData);
                }

                let allAnswersData = [];

                // the real answer was push first and the index should be 0
                // adding random number to sort later for the order of the answers.
                realAnswer = {
                  option: answers[0],
                  order: Math.random(),
                  isAnswer: true
                };

                allAnswersData.push(realAnswer);

                // starting loop to skip the real answer
                for (let i = 1; i < answers.length; i++) {
                  let fakeAnswer = {
                    option: answers[i],
                    order: Math.random(),
                    isAnswer: false
                  };
                  allAnswersData.push(fakeAnswer);
                }

                // order the array by the order number to randomize answer order
                allAnswersData = allAnswersData.sort(function(a, b) {
                  return a.order - b.order;
                });

                for (let i = 0; i < allAnswersData.length; i++) {
                  let j = i + 1;
                  if (allAnswersData[i].isAnswer === true) {
                    $(`#option${j}`).replaceWith(
                      `<div class="answer" data-answer="true" id="option${j}">${allAnswersData[i].option}</div>`
                    );
                  } else {
                    $(`#option${j}`).replaceWith(
                      `<div class="answer" id="option${j}">${allAnswersData[i].option}</div>`
                    );
                  }
                }

                $("#run").on("click", function() {
                  $(".pokepic").attr(
                    "src",
                    "/assets/sprites/quick_grass.png?raw=true"
                  );
                  $("#pokemon-name").replaceWith(`
                <h4 id="pokemon-name">????????</h4>
                `);
                });

                $(".answer").on("click", function() {
                  if ($(this).attr("data-answer") === "true") {
                    console.log("CORRECT");
                    $(this).attr(
                      "style",
                      "background-color:rgb(138,255,147);border:3px solid green"
                    );
                    $(".answers").attr("style", "pointer-events:none");
                    $("#run").replaceWith(
                      // eslint-disable-next-line quotes
                      `<button type="button" class="button primary" id="run"> NEXT >> </button>`
                    );
                    $("#run").on("click", function() {
                      $(".modal-footer").replaceWith(
                        // eslint-disable-next-line quotes
                        `<div class="modal-footer">`
                      );
                      $(".test").replaceWith(
                        `<div class="test">
                        <br><br>
                                ${json.name} was impressed by your knowledge. 
                                Would you like ${json.name} to join you on your journey? 
                                <br><br>
                            <button type="button" class="button hallow secondary" id="capture">Capture!</button>
                            <button type="button" id="release" class="button hallow secondary" data-close >Part ways.</button>
                            <br><br>
                            </div>
                            `
                      );

                      $("#release").on("click", function() {
                        $(".pokepic").attr(
                          "src",
                          "/assets/sprites/quick_grass.png?raw=true"
                        );
                        $("#pokemon-name").replaceWith(`
                            <h4 id="pokemon-name">????????</h4>
                            `);
                      });

                      $("#capture").on("click", function() {
                        fetch("/api/user_data")
                          .then(function(results) {
                            return results.json();
                          })
                          .then(function(user) {
                            const addPokemon = {
                              pokeId: json.pokeId,
                              isCaptured: true,
                              userId: user.id
                            };
                            $.ajax("api/pokedex", {
                              type: "POST",
                              data: addPokemon
                            }).then(function() {
                              console.log("pokemon added to pokedex");
                              $(".test").replaceWith(`<div class="test">
                              <br><br>
                                        ${json.name} has joined your team! 
                                        <br><br>
                                        <button type="button" class="primary button" id="letsgo" data-close >Let's go!</button>
                                        <br><br>
                                        </div>
                                        `);
                              $("#letsgo").on("click", function() {
                                $(".pokepic").attr(
                                  "src",
                                  "/assets/sprites/quick_grass.png?raw=true"
                                );
                                $("#pokemon-name").replaceWith(`
                                            <h4 id="pokemon-name">????????</h4>
                                            `);
                              });
                            });
                          });
                      });
                    });
                  } else {
                    $(this).attr(
                      "style",
                      "background-color:rgb(255,179,182);border:3px solid red"
                    );
                    // eslint-disable-next-line quotes
                    $(`*[data-answer="true"]`).attr(
                      "style",
                      "background-color:rgb(138,255,147);border:3px solid green"
                    );
                    $(".answers").attr("style", "pointer-events:none");
                    $("#run").replaceWith(
                      `<button type="button" class="button alert" id="next" data-close > ${json.name} ran away! </button>`
                    );
                    $("#next").on("click", function() {
                      $(".pokepic").attr(
                        "src",
                        "/assets/sprites/quick_grass.png?raw=true"
                      );
                      $("#pokemon-name").replaceWith(`
                        <h4 id="pokemon-name">????????</h4>
                        `);
                    });
                  }
                });
              });
          });
      });
    }
  });
});
