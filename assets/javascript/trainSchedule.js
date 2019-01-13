$(document).ready(function () {
    // INITIALIZING FIREBASE
    var config = {
    apiKey: "AIzaSyBdjU49jVCHIZ0hjs5C6rOd3u_pj48YFEo",
    authDomain: "train-scheduler-271d2.firebaseapp.com",
    databaseURL: "https://train-scheduler-271d2.firebaseio.com",
    projectId: "train-scheduler-271d2",
    storageBucket: "train-scheduler-271d2.appspot.com",
    messagingSenderId: "682191829456"
};
    firebase.initializeApp(config);
  
    var database = firebase.database();
  
    // CAPTURE BUTTON CLICK
    $("#addTrain").on("click", function (event) {
      event.preventDefault();
  
      // GRAB INPUT FROM TEXT BOXES 
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var freq = $("#interval").val().trim();
  
      // PUSH HANDLING
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
      });
    });
  
    // EVENT LISTENER TO ADD TRAIN INFO TO FIREBASE
    // ADDS ROW TO HTML WHEN USER DATA IS INPUT 
    database.ref().on("child_added", function (childSnapshot) {
  
        // STORE CHILDSNAPSHOT VALUE INTO VARIABLE
        var newTrain = childSnapshot.val().trainName;
        var newLocation = childSnapshot.val().destination;
        var newFirstTrain = childSnapshot.val().firstTrain;
        var newFreq = childSnapshot.val().frequency;
  
        // FIRST TIME
        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
  
        // CURRENT TIME
        var currentTime = moment();
  
        // TIME DIFFERENCE 
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  
        // REMAINING TIME 
        var tRemainder = diffTime % newFreq;
  
        // MINUTES UNTIL TRAIN 
        var tMinutesTillTrain = newFreq - tRemainder;
  
        // NEXT TRAIN
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("HH:mm");
  
        // DISPLAY ON HTML
        $("#all-display").append(
            '<tr><td>' + newTrain +
            '</td><td>' + newLocation +
            '</td><td>' + newFreq +
            '</td><td>' + catchTrain +
            '</td><td>' + tMinutesTillTrain + ' </td></tr>');
  
        // CLEAR FIELDS
        $("#trainName, #destination, #firstTrain, #interval").val("");
            return false;
    },
    // HANDLE ERRORS
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
  
});


















