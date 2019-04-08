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

$("#form-submit").click(function () {

})