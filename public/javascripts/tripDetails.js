var dataArray;

function unbook() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const bookingId = urlSearchParams.get('bid');
    console.log('Booking ID : ',bookingId);
    var requestData = { booking_id: bookingId };
    fetch('/tripDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
        // Log the raw response
        response.text().then(text => console.error('Raw response:', text));
    });
}

function getDataArray() {
    const urlParams = new URLSearchParams(window.location.search);
    fetch(`/tripdetails/get_json?${urlParams}`)
        .then(response => {
            // Log the entire response for debugging
            console.log('Full response:', response);

            // Check if the response status is OK (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the response body as JSON
            return response.json();
        })
        .then(data => {
            // Use the data received from the server
            dataArray = data;
            console.log('Data from server:', data);
            displayDetailsTable();
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}

function displayDetailsTable(){
    var tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    var generalDetailsTableBody = document.getElementById('generalDetails').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    generalDetailsTableBody.innerHTML = '';
    console.log(dataArray[0]);
    var trip_id = dataArray[0].bid;
    var from = dataArray[0].start_dest;
    var to = dataArray[0].final_dest;
    var departure = dataArray[0].etd;
    var max_num = dataArray[0].max_num;
    var cur_num = dataArray[0].cur_num;

    generalDetailsTableBody.innerHTML += `
        <tr>
            <th>Trip ID</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Number of Passengers</th>
            <th>Max Limit</th>
        </tr>
        <tr>
            <td>${trip_id}</td>
            <td>${from}</td>
            <td>${to}</td>
            <td>${departure}</td>
            <td>${cur_num}</td>
            <td>${max_num}</td>
        </tr>
        `

    dataArray.forEach(function(item) {
        tableBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.gender}</td>
                <td>${item.phone}</td>
                <td>${item.email}</td>
            </tr>
        `;
    });
}

getDataArray();