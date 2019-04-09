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

// Function to calculate the next arrival and the minutes away
function nextArrival(child) {
    // algorithm: elapsedTime (min) = currentTime - 1stArrival; minToNext = elapsedTime % freq

    // subtract a year to make sure the first arrival comes before the current time
    var firstArrival = moment(child.firstTrain, "hh:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstArrival), "minutes");
    console.log("difference in time: " + diffTime);

    var freq = child.departureFreq;
    console.log("frequency: " + freq);

    var tRemainder = diffTime % freq;
    console.log("remainder: " + tRemainder) 

    var tMinutesTillNext = freq - tRemainder;
    console.log("t minus: " + tMinutesTillNext)

    var nextArrival = moment().add(tMinutesTillNext, "minutes").format("hh:mm A");

    var returnArr = [tMinutesTillNext, nextArrival];

    return returnArr
}

database.ref("/trainInfo").on("child_added", function (childSnapshot) {
    var child = childSnapshot.val()
    console.log(child)

    var trainNameRecent = childSnapshot.val().trainName;
    var destinationRecent = childSnapshot.val().destination;
    var departureFreqRecent = childSnapshot.val().departureFreq;
    
    var arrivalInfo = nextArrival(child)
    console.log(arrivalInfo)

    var newRow = $("<tr>").append(
        $("<td>").text(trainNameRecent),
        $("<td>").text(destinationRecent),
        $("<td>").text(departureFreqRecent),
        $("<td>").text(arrivalInfo[0]),
        $("<td>").text(arrivalInfo[1])
    )

    $("#train-table").append(newRow);
})


// TODO: figure out way to reset the train schedule if wanted to
// TODO: have the train schedule timers automatically update over time