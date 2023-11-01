let searchTrip = document.getElementById('searchTrip');
let reqDiv = document.getElementById('add_content');
let newTrip = document.getElementById('newTrip');



searchTrip.addEventListener('click', function() {
  document.getElementById('searchTrip').style.backgroundColor = '#FDDA0D';
  document.getElementById('newTrip').style.backgroundColor = '#FFFF8F';
  let data = `
    <form class="loginForm" id="searchForm" action="#" method="post">
      <div class="form-content">
        <label for="start">SearchStart :</label>
        <input type="text" name="start" id="start" >
        <input style = "display:none" type="text" name="type" id="fromsearch" value="1">
        <label for="destination">Destination :</label>
        <input type="text" name="destination" id="destination" >

        <label for="appointment">Search From :</label>
        <input type="datetime-local" id="appointment" name="appointment">

        <label for="appointment">Search Till :</label>
        <input type="datetime-local" id="appointment" name="appointment">
        
        <input type="submit" value="Submit">
      </div>
    </form>
  `;

    reqDiv.innerHTML = data;
    

});


newTrip.addEventListener('click', function(){
  document.getElementById('searchTrip').style.backgroundColor = '#FFFF8F';
  document.getElementById('newTrip').style.backgroundColor = '#FDDA0D';
    let data = `
    <form class="loginForm" id="newTripForm" action="#" method="post">
      <div class="form-content">
        <label for="start">NewStart:</label>
        <input type="text" name="start" id="start" required>
        <input style = "display:none" type="text" name="type" id="fromsearch" value="2">
        <label for="destination">Destination:</label>
        <input type="text" name="destination" id="destination" required>

        <label for="appointment">Select Date and Time:</label>
        <input type="datetime-local" id="appointment" name="appointment" required>

        <label for="type">Taxi Type:</label>
        <input type="text" name="cabtype" id="type" required>

        <label for="max">Max Limit:</label>
        <input type="text" name="max" id="max" required>

        <input type="submit" value="Submit">
      </div>
    </form>
  `;
    reqDiv.innerHTML = data;
    
    
});