$("#submit").on("click", function() {
  event.preventDefault();
  console.log('yolo');
});


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGR_Kf4yCwPvEX69GyfsBpAwPTOIdCx8M",
    authDomain: "train-time-7cd31.firebaseapp.com",
    databaseURL: "https://train-time-7cd31.firebaseio.com",
    projectId: "train-time-7cd31",
    storageBucket: "train-time-7cd31.appspot.com",
    messagingSenderId: "1096060555195"
  };
  firebase.initializeApp(config);


// Create a variable to reference the database
var database = firebase.database();

// database.ref().on("value", function(snapshot) {

//   console.log(snapshot.val());
//   $('#name-input').text(snapshot.val().name);
//   $('#destination-input').text(snapshot.val().destination);
//   $('#first-train-input').text(snapshot.val().startdate);
//   $('#frequency-input').text(snapshot.val().frequency);

// }, function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });


$("#submit").on("click", function() {
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  startdate = $("#first-train-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  database.ref().push({
    name: name,
    destination: destination,
    startdate: startdate,
    frequency: frequency
  });

  $("#name-input").val('');
  $("#destination-input").val('');
  $("#first-train-input").val('');
  $("#frequency-input").val('');



});


// console.log(moment().diff(moment([2014, 1, 1]), 'months', true));
// console.log(moment().format("MM DD YY"));


database.ref().on("child_added", function(snapshot, prevChildKey) {

  var $tr = $('<tr>').append(
    $('<td>').text(snapshot.val().name),
    $('<td>').text(snapshot.val().destination),
    $('<td>').text(snapshot.val().startdate),
    $('<td>').text(snapshot.val().frequency)
  ).appendTo('#train-table');

});








