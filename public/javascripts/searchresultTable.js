// const dataArray = [
//     {
//         "from": "San Francisco",
//         "to": "Miami",
//         "departure": "2023-10-16 12:30",
//         "nop": 2,
//         "ml": 5,
//         "tripid": "Trip2"
//       },
//       {
//         "from": "San Diego",
//         "to": "Gotham",
//         "departure": "2023-11-11 12:31",
//         "nop": 1,
//         "ml": 4,
//         "tripid": "Trip3"
//       }
//       ,
//       {
//         "from": "San Diego",
//         "to": "Gotham",
//         "departure": "2023-11-11 12:31",
//         "nop": 1,
//         "ml": 4,
//         "tripid": "Trip4"
//       }
//       ,
//       {
//         "from": "San Diego",
//         "to": "Gotham",
//         "departure": "2023-11-11 12:31",
//         "nop": 1,
//         "ml": 4,
//         "tripid": "Trip5"
//       }
//       ,
//       {
//         "from": "San Diego",
//         "to": "Gotham",
//         "departure": "2023-11-11 12:31",
//         "nop": 1,
//         "ml": 4,
//         "tripid": "Trip6"
//       }
//       ,
//       {
//         "from": "San Diego",
//         "to": "Gotham",
//         "departure": "2023-11-11 12:31",
//         "nop": 1,
//         "ml": 4,
//         "tripid": "Trip7"
//       }
// ]

var dataArray;

function bookSearch(bookingId) {
    var requestData = { booking_id: bookingId };
    openModal();
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

function getDataArray() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.toString());
    console.log(urlParams.get('start'));
    console.log(urlParams.get('destination'));
    console.log(urlParams.get('et'));
    console.log(urlParams.get('st'));
    fetch(`/searchResult/get_json?${urlParams}`)
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
            displaySearchTable();
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}

function displaySearchTable(){

    var tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    dataArray.forEach(function(item) {
        tableBody.innerHTML += `
            <tr>
                <td>${item.start_dest}</td>
                <td>${item.final_dest}</td>
                <td>${item.etd}</td>
                <td>${item.cur_num}</td>
                <td>${item.max_num}</td>
                <td>${item.bid}</td>
                <td><button onclick="bookSearch('${item.bid}')">Book</button></td>
            </tr>
        `;
    });
}
function openModal() {
    var modal = document.getElementById('myModal');
    var overlay = document.getElementById('overlay');
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('myModal');
    var overlay = document.getElementById('overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

getDataArray();