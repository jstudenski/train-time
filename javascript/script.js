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
    $('<td>').text(snapshot.val().destination).addClass('destination'),
    $('<td>').text(snapshot.val().starttime).addClass('starttime'),
    $('<td>').text(snapshot.val().frequency).addClass('frequency'),
    $('<td>').addClass('arrival'),
    $('<td>').addClass('min-away'),
    $('<td>').append(btn) 
  ).appendTo('#train-table');


  update();
});



// run update function every minute (on the minute)
var date = new Date();
setTimeout(function() {
    setInterval(update, 60000);
    update();
}, (60 - date.getSeconds()) * 1000);


function update() {

  $('tbody tr').each(function() {

    //var time = $(this).find('.frq').html();
    //console.log(time);
   // console.log("THIS" + $(this));

      // Assumptions
      var tFrequency = $(this).find('.frequency').html();

      // Time is 3:30 AM
      var firstTime = $(this).find('.starttime').html();

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
      //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");

      // console.log("ARRIVAL TIME: " + ;
      // console.log("ARRIVAL TIME: " + );


      $(this).find('.arrival').html((nextTrain).format("hh:mm"));  
      $(this).find('.min-away').html(tMinutesTillTrain);

  });



  //console.log(snapshot.val());

  //console.log("this");
  //var item = this.closest("tr");//.find('.title'); // .find('.test2');

//  $(this).closest("tr").find('.arrival').html("hhh");
 
 // $(this).closest("tr").find('.min-away').html("min");

 // var item = this.parent().find('.test2');

  //console.log(item.closest(".test2"));
  //console.log(item);


  // database.ref().child($(this).attr('data-key')).remove();
  // this.closest("tr").remove();
}


function remove() {
  database.ref().child($(this).attr('data-key')).remove();
  this.closest("tr").remove();
}

