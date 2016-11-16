var baseURL = "https://mockapi-unadjzzymg.now.sh";

var questions;
var userInfo;
var index = 0;
var answers;
var score = 0;

var quizInfo = {
    whichQuestion: 0,
    passScore: 70,
    userScore: 0
}

var questionsAjax = {
    url: baseURL + '/questions?_limit=5',
    method: 'GET'
};
var userAjax = {
    url: baseURL + '/users',
    method: 'GET'
};


$.when($.ajax(userAjax), $.ajax(questionsAjax))
    .done(function (u, q) {
        questions = q[0];
        userInfo = u[0][0];
        init();
    })
    .fail(function (err) {
        console.log(err);
        console.log('Seems we have a ' + err.status + ' on one or more ajax requests');
    });



function init() {
    index = 0;
    $('#userName').text(userInfo.userName);
    quizInfo['userScore'] = 0;
    console.log(userInfo.userScore);
    // update display || possibly a method
    displayNextQuestion();
    displayNextPossibleAnswers();
     $('#buttonSpace').html('<a href="#" id="finalAnswer" class="btn btn-block btn-primary">Final Answer</a>');
       $('#messageArea').html('');
    $('#userScore').html(quizInfo['userScore']);
    
    
}
// listener for click

addEventListeners();
function addEventListeners(){
    $('body').on('click', '#finalAnswer', testAnswer);
    $('body').on('click', '#nextQuestion', gotoNextQuestion);
    $('body').on('click', '#restart', init );
}

function testAnswer() {

    var userAnswer = $("input[type=radio]:checked").val();
    
    if (userAnswer == null) {window.alert("Please choose an answer!")}
    else if (userAnswer == questions[index].correctAnswer) {
        $('#messageArea').html('Your answer of "' + userAnswer + '" is correct!' + '<a href="#" id="nextQuestion" class="btn btn-block btn-primary">See next question</a>');
        quizInfo['userScore']+=1;
        $('#userScore').html(quizInfo['userScore']);
    } else {
        $('#messageArea').html('<p>Your answer of "' + userAnswer + '" is wrong!</p>' + '<a href="#" id="nextQuestion" class="btn btn-block btn-primary">See next question</a>');
    }
    $('#buttonSpace').html('');
}


function gotoNextQuestion() {
    if(index < questions.length - 1) {
        index++;
        displayNextQuestion();
        displayNextPossibleAnswers();
        $('#userScore').html(quizInfo['userScore']);
        $('#messageArea').html('');
        $('#buttonSpace').html('<a href="#" id="finalAnswer" class="btn btn-block btn-primary">Final Answer</a>');
    } else {
        $('#messageArea').html("<p>Congratulations! You've completed the quiz. You scored " + quizInfo['userScore'] + " out of a possible " + questions.length + " points. Care to try again?</p>" + '<a href="#" id="restart" class="btn btn-block btn-primary">Restart the quiz</a>'+ '</div>');
    }
}

function displayNextQuestion(){
    $('#questionDisplay').html('<p>' + questions[index].question + '</p>');
}

function displayNextPossibleAnswers(){
    var answersString = '';
    answersString = '';
    for (var i = 0; i < questions[index].possibleAnswers.length; i++) {
        answersString += '<label class="col-xs-6">';
        answersString += '<input type="radio" class="radio" name="answers" value="' + questions[index].possibleAnswers[i] + '" />'
        answersString += '<span> ' + questions[index].possibleAnswers[i] + '</span>'
        answersString += '</label>'
    }
    $('#possibleAnswersDisplay').html(answersString);
}


// display next question
// display next answers

// how to get radio: $("input[type=radio]:checked").val() 

// write user display here

// write next question here

// display next answere here

// check answers
// if correct
// display message
// update score
// update screen
// if incorrect
// display message
// update screen
// is there another question?
//if yes display next question
//if no play closing screen
//reset quiz