const QUIZ = {
    questions: [
        {
            text: "Which English club has won the most European Cups?",
            image: {
                src: "images/Milner-Holding-BigEars.jpg",
                alt: "European-Cup",
                
            },
            answers: [
                {
                    text: "Liverpool FC",
                    isCorrect: true
                },
                {
                    text: "Aston Villa",
                },
                {
                    text: "Chelsea FC",

                },
                {
                    text: "Manchester United",

                }
            ]
        },
        {
            text: "What is the highest place the USA has finished in a World Cup?",
            image: {
                src: "images/World-Cup-Trophy.jpg",
                alt: "World-Cup",
                
            },
            answers: [
                {
                    text: "Eighth",

                },
                {
                    text: "First",
                },
                {
                    text: "Third",
                    isCorrect: true

                },
                {
                    text: "Fifth",

                }
            ]
        },
        {
            text: "Italy was the first nation to win consecutive World Cups. What years did they achieve this feat?",
            image: {
                src: "images/Cannavro-WC.jpg",
                alt: "Italy-06",
                
            },
            answers: [
                {
                    text: "2002 & 2006",

                },
                {
                    text: "1934 & 1938",
                    isCorrect: true
                },
                {
                    text: "1982 & 1986",

                },
                {
                    text: "1994 & 1998",

                }
            ]
        },
        {
            text: "Who is the all-time leading international-team goalscorer?",
            image: {
                src: "images/goal.jpg",
                alt: "Scorer",
                
            },
            answers: [
                {
                    text: "Cristiano Ronaldo",

                },
                {
                    text: "Pele",
                },
                {
                    text: "Zlatan Ibrahimovic",

                },
                {
                    text: "Ali Daei",
                    isCorrect: true

                }
            ]
        },
        {
            text: "Who was the first non-European player to win the Ballon’d’Or",
            image: {
                src: "images/Ballon-dOr.jpg",
                alt: "BallondOr",
                
            },
            answers: [
                {
                    text: "George Weah",
                    isCorrect: true
                },
                {
                    text: "Ronaldo Nazario",
                },
                {
                    text: "Lionel Messi",

                },
                {
                    text: "Mohamed Salah",

                }
            ]
        },

    ],
    messages: [
        {
            text: "Stick to touchdowns",
            image: {
                src: "images/NflBall.jpg",
                alt: "nflball",
            }
    
        },
        {
            text: "You wouldn't look out of place in some pubs",
            image:{
                src: "images/snl_hooligans1.jpg",
                alt: "hooligans",
            }
        },
        {
            text: "Congrats, you're cultured",
            image:{
                src: "images/carlito.png",
                alt: "Ancelotti"
            }
        }
    ],


    answers: []
}



// helper functions
function getCurrentQuestionIndex() {
    return QUIZ.answers.length
}
function getCurrentQuestion() {
    return QUIZ.questions[getCurrentQuestionIndex()]
}
function getYourScore() {
    return QUIZ.answers.filter(answer => answer.isCorrect).length;

}

function areYouDone() {
    return QUIZ.questions.length <= getCurrentQuestionIndex()
}
function resetQuiz() {
    QUIZ.answers = []
}

function getScoreMessage(score){
    let index=0
    if (score>=4){
        index=2
    }
    else if (score>=2){
        index=1
    }
    return QUIZ.messages[index]
}






// generate functions

function generateUpdatedScore() {
    return `
    <section class="score">

        <p>Score: ${getYourScore()} /${QUIZ.questions.length}</p>

    </section>`

}
function generateStartPage() {
    return $(
        
        `<section id="start-page">
         
<img src = "images/start.jpg" alt ="world-cup-balls">
<h1>
    Footy Around the World
</h1>

<p> Test your knowledge of international footbal!
</p>

<button id="start">

Start Quiz


</button>
</section>`)
}

function generateQuestion(question, index) {
    let questionTitle = question.text
    const answers = question.answers.map(generateAnswer).join("")
    const questionHTML = `
        <fieldset id="question-images">
          <legend>${index + 1}. ${questionTitle}</legend>
          <figure>
          <img src="${question.image.src}" alt="${question.image.alt}">
          </figure>
            <ol>
            ${answers}
            </ol>
        </fieldset>
    `
    return questionHTML
}


function generateAnswer(answer, index) {
    return `<li> 
    <input type="radio" name="answer" value="${index}" id="answer-${index}"> <label for="answer-${index}">
    ${answer.text} </label>
    </li>`

}

function generateQuestionPage(question, index) {
    return ` ${generateUpdatedScore()}
     <section class="question"><form id = "answer-form">
        ${generateQuestion(question, index)}
              <button type="submit">
                  Submit Answer
              </button>
              
            <button id= "restart">
            Restart Quiz
            </button>
            </form>
            </section>`
              
}

function generateFeedbackPage(question, answer) {
    let correct = answer.isCorrect;
    return $(
        ` <section class="${correct ? "correct" : "incorrect"}-feedback"> <p>
        ${correct ? "Correct!" : `Incorrect, the correct answer is ${question.answers.find(answer => answer.isCorrect).text}`}
    </p>
    <div id="feedback-images">
    <img src ="images/${correct?"correct":"incorrect"}.jpg" alt ="${correct?"goal!":"no-goal!"}">
    </div>

    </section>
    <div id= "feedback-buttons">
    <button id="next-question">
        ${areYouDone() ? "Get final score" : "Next question"}
    </button>
    <button id= "restart">
            Restart Quiz
            </button>
            </div>
            
`)

}
function generateScorePage() {
    let yourScore = getYourScore()
    let scoreMessage= getScoreMessage(yourScore)
    return `
        <figure>
        <figcaption> Full-Time!
        </figcaption>
        <img src ="images/end.jpg">
        </figure>
            <p>
            Your final score is ${yourScore}
            </p>

            <p>
            ${scoreMessage.text}
            </p>


            
            <button id= "restart">
            Restart Quiz
            </button>
            `
}


// render functions

function renderStartPage() {
    $("main").html(generateStartPage())
}
function renderQuestionPage(question, index) {
    const questionString = generateQuestionPage(question, index);
    $("main").html(questionString);
}
function renderFeedbackPage(question, answer) {
    const feedBackString = generateFeedbackPage(question, answer);
    $("main").html(feedBackString);
}
function renderScorePage() {
    $("main").html(generateScorePage())
}

// event handlers

function startButtonClicked() {
    const index = getCurrentQuestionIndex()
    const question = getCurrentQuestion()
    renderQuestionPage(question, index)

}

function questionFormSubmitted(event) {
        event.preventDefault();
        let selected = $('input:checked').val();
        const question = getCurrentQuestion()
        const answer = question.answers[selected]
        renderFeedbackPage(question, answer);
        QUIZ.answers.push(answer)


}

function nextButtonClicked() {
    console.log("anything");
    const renderFunction = areYouDone() ? renderScorePage : renderQuestionPage
    renderFunction(getCurrentQuestion(), getCurrentQuestionIndex());
}
function restartButtonClicked() {
        resetQuiz();
        renderStartPage()
    
}

// setup

function handleStartButton() {
    $("main").on('click', '#start', startButtonClicked);
}
function handleQuestionForm() {
    $("main").on('submit', 'form', questionFormSubmitted)
}
function handleNextButton() {
    $("main").on('click', '#next-question', nextButtonClicked)
}
function handleRestartButton() {
    $("main").on('click', '#restart', restartButtonClicked)
}
function setUpEventHandlers() {
    handleStartButton()
    handleQuestionForm()
    handleNextButton()
    handleRestartButton()
}

function startQuiz() {
    setUpEventHandlers()
    renderStartPage()
}
$(startQuiz());


