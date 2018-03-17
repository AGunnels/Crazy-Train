  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPyZCTvjoeiYJmvzSerbdQXuhJ5YIGXbI",
    authDomain: "train-schedule-5bddc.firebaseapp.com",
    databaseURL: "https://train-schedule-5bddc.firebaseio.com",
    projectId: "train-schedule-5bddc",
    storageBucket: "train-schedule-5bddc.appspot.com",
    messagingSenderId: "494419985842"
  };
  firebase.initializeApp(config);

  var database = firebase.database;

  //create function to operate submit button
  $("submitInfo").on('click', function (event) {
    // prevent default submissions
    // event.preventDefault();

    // set variables and creat an object
    var trainName = $('#trainName').val().trim();
    var trainDestination = $('#destination').val().trim();
    var trainTime = $('#trainTime').val().trim();
    var frequency = $('#frequency').val().trim();

    var trainInfo = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: frequency
    };

    // push trainInfo into firebase
    database.ref().push(trainInfo);
    // alert client of successful amendment
    alert("Train successfully added!")
    // reset fields to a blank string
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
  });

  // creates a call to the database for info on most recent data
  database.ref().on("child-added", function (snapshot, prevChildKey) {
    var newTrain = snapshot.val();
    console.log(newTrain);
    var trainName = newTrain.name;
    var trainDestination = newTrain.destination;
    var trainFrequency = moment(newTrain.frequency).format('mm'); //-> in minutes
    var trainTime = newTrain.time;

    //set variable for now
    var now = moment();
    //first train time
    var firstTrain = moment.unix(newTrain.time).format('HH:mm');

    var minutesAway = 'placeholder'; //I'm not sure how to get this...a for loop maybe? to run through each increment of the trainFrequency?

    //not appending to table body...I structured this off of the in class example. I'm not sure why it's not working.
    $('#trainSchedule > tbody').append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainTime + "</td><td>" + minutesAway + "</td></tr>");

  });