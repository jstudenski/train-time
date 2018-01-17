$('#first-train-input').mask('00:00');
$('#frequency-input').mask('0#');

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
var database = firebase.database();


// Current Time
var updateTime = function () {
  var currentTime = moment();
  $("#current-time").html(moment(currentTime).format("H:mm:ss"));
};
setInterval(updateTime, 1000); // every second



$("#submit").on("click", function() {
  event.preventDefault();

  database.ref().push({
    name: $("#name-input").val().trim(),
    destination: $("#destination-input").val().trim(),
    starttime: $("#first-train-input").val().trim(),
    frequency: $("#frequency-input").val().trim()
  });

  $("#name-input").val('');
  $("#destination-input").val('');
  $("#first-train-input").val('');
  $("#frequency-input").val('');

});



database.ref().on("child_added", function(snapshot, prevChildKey) {

  console.log(snapshot.val());


  // Assumptions
  var tFrequency = 3;

  // Time is 3:30 AM
  var firstTime = "03:30";

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  // generate remove button
  var btn = $("<button>");
    btn.addClass("item-btn");
    btn.attr("data-key", snapshot.key);
    var i = $("<i>");
      i.addClass("material-icons");
      i.text("delete")   
    btn.append(i);
    btn.click(remove);

  // generate table
  var $tr = $('<tr>').append(
    $('<td>').text(snapshot.val().name),
    $('<td>').text(snapshot.val().destination),
    $('<td>').text(snapshot.val().starttime),
    $('<td>').text(snapshot.val().frequency),
    $('<td>').text('TEXT2'),
    $('<td>').append(btn)
  ).appendTo('#train-table');

});


function remove() {
  database.ref().child($(this).attr('data-key')).remove();
  this.closest("tr").remove();
}

