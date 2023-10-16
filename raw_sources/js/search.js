let searchTrip = document.getElementById('searchTrip');
let reqDiv = document.getElementById('searchDiv');
let newTrip = document.getElementById('newTrip');

searchTrip.addEventListener('click', function() {
  let data = `
    <form class="loginForm" id="searchForm" action="#" method="post">
      <div id="button_div">
        <button id="searchTrip" style="background-color:red;">Search Trip</button>
        <button id="newTrip">New Trip</button>
      </div>
      <div class="form-content">
        <label for="start">Start:</label>
        <input type="text" name="start" id="start" >

        <label for="destination">Destination:</label>
        <input type="text" name="destination" id="destination" >

        <label for="appointment">Select Date and Time:</label>
        <input type="datetime-local" id="appointment" name="appointment">

        <label for="type">Taxi Type:</label>
        <input type="text" name="type" id="type">

        <label for="max">Max Limit:</label>
        <input type="text" name="max" id="max">

        <input type="submit" value="Submit">
      </div>
    </form>
  `;

    reqDiv.innerHTML = data;
    

});


newTrip.addEventListener('click', function(){
    let data = `
    <form class="loginForm" id="newTripForm" action="#" method="post">
      <div id="button_div">
        <button id="searchTrip">Search Trip</button>
        <button id="newTrip" style="background-color:red;">New Trip</button>
      </div>
      <div class="form-content">
        <label for="start">Start:</label>
        <input type="text" name="start" id="start" required>

        <label for="destination">Destination:</label>
        <input type="text" name="destination" id="destination" required>

        <label for="appointment">Select Date and Time:</label>
        <input type="datetime-local" id="appointment" name="appointment" required>

        <label for="type">Taxi Type:</label>
        <input type="text" name="type" id="type" required>

        <label for="max">Max Limit:</label>
        <input type="text" name="max" id="max" required>

        <input type="submit" value="Submit">
      </div>
    </form>
  `;
    reqDiv.innerHTML = data;
    
    
});
