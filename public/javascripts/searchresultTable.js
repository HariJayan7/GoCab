const dataArray = [
    {
        "from": "San Francisco",
        "to": "Miami",
        "departure": "2023-10-16 12:30",
        "nop": 2,
        "ml": 5,
        "tripid": "1"
      },
      {
        "from": "San Diego",
        "to": "Gotham",
        "departure": "2023-11-11 12:31",
        "nop": 1,
        "ml": 4,
        "tripid": "2"
      }
]

function bookSearch(bookingId) {
    var requestData = { booking_id: bookingId };

    fetch('/searchResult', {
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


function displaySearchTable(){
    var tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    dataArray.forEach(function(item) {
        tableBody.innerHTML += `
            <tr>
                <td>${item.from}</td>
                <td>${item.to}</td>
                <td>${item.departure}</td>
                <td>${item.nop}</td>
                <td>${item.ml}</td>
                <td>${item.tripid}</td>
                <td><button onclick="bookSearch('${item.tripid}')">Book</button></td>
            </tr>
        `;
    });

        // dataArray.forEach(function(item) {
        //     var row = tableBody.insertRow();
        //     var cell1 = row.insertCell(0);
        //     var cell2 = row.insertCell(1);
        //     var cell3 = row.insertCell(2);
        //     var cell4 = row.insertCell(3);    
        //     var cell5 = row.insertCell(4);
        //     var cell6 = row.insertCell(5);
        //     // Modify cell count based on your array structure
        //     cell1.textContent = item.from;
        //     cell2.textContent = item.to;
        //     cell3.textContent = item.departure;
        //     cell4.textContent = item.nop;
        //     cell5.textContent = item.ml;
        //     cell6.textContent = item.tripid;
        // });
}

displaySearchTable();