var baseURL = "https://mockapi-unadjzzymg.now.sh";

var questions;
var userInfo;
var answers;

var quizInfo = {
    whichQuestion: 0,
    passScore: 70,
    userScore: 0
}

var questionsAjax = {
    url: baseURL + '/questions?_limit=10',
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
    quizInfo['whichQuestion'] = 0;
    $('#userName').text(userInfo.userName);
    quizInfo['userScore'] = 0;
    // update display || possibly a method
    displayNextQuestion();
    displayNextPossibleAnswers();
     $('#buttonSpace').html('<a href="#" id="finalAnswer" class="btn btn-block btn-primary">Final Answer</a>');
       $('#messageArea').html('');
    $('#userScore').html(quizInfo['userScore']);
     $("#possibleAnswersDisplay").show(0);
      $("#questionDisplay").show(0);
    
}
// listener for click

addEventListeners();
function addEventListeners(){
    $('body').on('click', '#finalAnswer', testAnswer);
    $('body').on('click', '#nextQuestion', gotoNextQuestion);
    $('body').on('click', '#restart', init );
         // next case, and so on....
    
}

function testAnswer() {

    var userAnswer = $("input[type=radio]:checked").val();
    
    if (userAnswer == null) {window.alert("Please choose an answer!");}
    else if (userAnswer == questions[quizInfo['whichQuestion']].correctAnswer) {
         $("#possibleAnswersDisplay").hide(1000);
        $('#messageArea').html('<div class="card card-block last-message"><p class="large">Your answer of "' + userAnswer + '" is correct! </p></div>' + '<a href="#" id="nextQuestion" class="btn btn-block btn-primary">See next question</a>');
        quizInfo['userScore']+=1;
        $('#userScore').html(quizInfo['userScore']);
        $('#buttonSpace').html('');
    } else {
            $("#possibleAnswersDisplay").hide(1000);
        $('#messageArea').html('<div class="card card-block last-message"><p class="large">Sorry, your answer of "' + userAnswer + '" is wrong!' + ' The correct answer is ' + questions[quizInfo['whichQuestion']].correctAnswer + '.</p></div>' +
                               '<a href="#" id="nextQuestion" class="btn btn-block btn-primary">See next question</a>');
        $('#buttonSpace').html('');
    }
    
}


function gotoNextQuestion() {
    var userScorePercentage = ((quizInfo['userScore']/10)*100);
    $('#possibleAnswersDisplay').show(0);
    if(quizInfo['whichQuestion'] < questions.length - 1) {
        quizInfo['whichQuestion']+=1;
        displayNextQuestion();
        displayNextPossibleAnswers();
        $('#userScore').html(quizInfo['userScore']);
        $('#messageArea').html('');
        $('#buttonSpace').html('<a href="#" id="finalAnswer" class="btn btn-block btn-primary">Final Answer</a>');
    } else if(quizInfo['whichQuestion'] = questions.length - 1 && userScorePercentage >= quizInfo['passScore'] ) {
        $("#possibleAnswersDisplay").hide(0);
       $("#questionDisplay").hide(0);   
           $('#messageArea').html('<div class="card card-block last-message">' + "<p class='large'>Congratulations, you scored " + userScorePercentage+ "% -- a passing score! Oh my god. I'm so excited I wish I could wet my pants!</p></div>" + '<a href="#" id="restart" class="btn btn-block btn-primary">Restart the quiz</a>'+ '</div>');}
    else {
        $("#possibleAnswersDisplay").hide(0);
       $("#questionDisplay").hide(0);
            $('#messageArea').html('<div class="card card-block last-message">' + "<p class='large'>Good news, everyone! You've failed the quiz with a score of " + userScorePercentage + "%. Wait -- that's not good news at all.</p> <p class='large'>Care to try again, or don't want to live on this planet anymore?</p></div>" + '<a href="#" id="restart" class="btn btn-block btn-primary">Restart the quiz</a>'+ '</div>');
    }
}

function displayNextQuestion(){

    $('#questionDisplay').html('<p>' + questions[quizInfo['whichQuestion']].question + '</p>');
}

function displayNextPossibleAnswers(){
    var answersString = '';
  
    answersString = '';
    for (var i = 0; i < questions[quizInfo['whichQuestion']].possibleAnswers.length; i++) {
        
    
 // answersString += '<div class="card card-block"><label class="custom-control custom-radio"><input id="radio1" name="radio" type="radio" class="custom-control-input" value="' + questions[quizInfo['whichQuestion']].possibleAnswers[i] + '">' + '<span class="custom-control-indicator"></span><span class="custom-control-description">' + questions[index].possibleAnswers[i] + '</span></label></div>'
 answersString += '<div class="row"><div class="col-xs-12"><label class="custom-control custom-radio"><input id="radio1" name="radio" type="radio" class="custom-control-input" value="' + questions[quizInfo['whichQuestion']].possibleAnswers[i] + '">'+'<div id="' + questions[quizInfo['whichQuestion']].possibleAnswers[i] + '" class="col-xs-12 card card-block">' + '<span class="custom-control-description">' + questions[quizInfo['whichQuestion']].possibleAnswers[i] + '</span></div></label></div></div>';};
    
  
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