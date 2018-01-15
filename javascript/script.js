$('#first-train-input').mask('00:00');

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



// Current Time



var updateTime = function () {
    var currentTime = moment();
    $("#current-time").html(moment(currentTime).format("H:mm"));
};
setInterval(updateTime, 1000); // every second



// $(document).ready(function(){
//     datetime = $('#datetime')
//     update();
//     setInterval(update, 1000);
// });



$("#submit").on("click", function() {
  event.preventDefault();

  database.ref().push({
    name: $("#name-input").val().trim(),
    destination: $("#destination-input").val().trim(),
    startdate: $("#first-train-input").val().trim(),
    frequency: $("#frequency-input").val().trim()
  });

  $("#name-input").val('');
  $("#destination-input").val('');
  $("#first-train-input").val('');
  $("#frequency-input").val('');

});

// console.log(moment().diff(moment([2014, 1, 1]), 'months', true));
// console.log(moment().format("MM DD YY"));


database.ref().on("child_added", function(snapshot, prevChildKey) {

  console.log(snapshot.key);
  var btn = $("<button>");
    btn.addClass("item-btn");
    btn.attr("data-key", snapshot.key);
    var i = $("<i>");
      i.addClass("material-icons");
      i.text("delete")   
    btn.append(i);
    btn.click(remove);

  var $tr = $('<tr>').append(
    $('<td>').text(snapshot.val().name),
    $('<td>').text(snapshot.val().destination),
    $('<td>').text(snapshot.val().startdate),
    $('<td>').text(snapshot.val().frequency),
    $('<td>').text('TEXT2'),
    $('<td>').append(btn)
  ).appendTo('#train-table');

});


function remove() {
  database.ref().child($(this).attr('data-key')).remove();
  this.closest("tr").remove();
}

