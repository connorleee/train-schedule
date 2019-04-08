// Need a database set up that takes inputs from the add train form
// need a function that pulls data from database and creates a new table row that prepends into the train schedule

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxFaBbU8agwJu2jn_XGX8OO7k4UGbJWq4",
    authDomain: "train-schedule-bf777.firebaseapp.com",
    databaseURL: "https://train-schedule-bf777.firebaseio.com",
    projectId: "train-schedule-bf777",
    storageBucket: "train-schedule-bf777.appspot.com",
    messagingSenderId: "186605805314"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var departureFreq = "";

// Populate database with user inputs
$("#form-submit").click(function () {
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-departure").val().trim();
    departureFreq = $("#departure-frequency").val().trim();

    // Push the values in the form to the database
    database.ref("/trainInfo").push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        departureFreq: departureFreq
    });

    // Clear the textboxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-departure").val("");
    $("#departure-frequency").val("");
})

database.ref("/trainInfo").on("child_added", function(childSnapshot){
    console.log(childSnapshot.val())

    var trainNameRecent = childSnapshot.val().trainName;
    var destinationRecent = childSnapshot.val().destination;
    var firstTrainRecent = childSnapshot.val().firstTrain;
    var departureFreqRecent = childSnapshot.val().departureFreq;

    // TODO: funciton to calculate the next arrival and the minutes away
    // TODO: figure out a better way of controlling how the time is displayed and received by the user input.

    var newRow = $("<tr>").append(
        $("<td>").text(trainNameRecent),
        $("<td>").text(destinationRecent),
        $("<td>").text(departureFreqRecent),
        // $("<td>").text(nextArrival),
        // $("<td>").text(minutesAway)

    )
    
    $("#train-table").append(newRow);
})

// TODO: figure out way to reset the train schedule if wanted to 
// TODO: have the train schedule timers automatically update over time