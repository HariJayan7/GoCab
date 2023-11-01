var dataArray;
var curr;
var hist;

function viewDetails(bid){
    window.location.href = `/tripDetails?bid=${bid}`;
}

function dateFormat(dateString){
    const dateObject = new Date(dateString);

    // Format the date components
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = dateObject.getDate().toString().padStart(2, '0');
    // Create a formatted string
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function timeFormat(dateString){
    const dateObject = new Date(dateString);
    // Format the date components
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    
    // Create a formatted string
    const formattedDate = `${hours}:${minutes}`;
    return formattedDate;
}

function getDataArray() {
    fetch(`/dashboard/get_json`)
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
            // HERE
            const currentDate = new Date();
            curr = dataArray.filter(item => new Date(item.etd) >= currentDate);
            hist = dataArray.filter(item => new Date(item.etd) < currentDate);

            console.log('Current data:', curr);
            console.log('Historical data:', hist);
            showCurrent();
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}

function showHistory(){
    var tableHistory = document.getElementById('dash_table').getElementsByTagName('tbody')[0];
    tableHistory.innerHTML = '';
    hist.forEach(function(item) {
        tableHistory.innerHTML += `
            <tr>
                <td>${item.bid}</td>
                <td>${item.start_dest}</td>
                <td>${item.final_dest}</td>
                <td>${dateFormat(item.etd)}</td>
                <td>${timeFormat(item.etd)}</td>
                <td><button onclick="viewDetails('${item.bid}')">View</button></td>
            </tr>
        `;
    });
    let current = document.getElementById('current');
    let history = document.getElementById('history');
    current.style.backgroundColor = "#FFFF8F";
    history.style.backgroundColor = "#FDDA0D";

}
function showCurrent(){
    var tableHistory = document.getElementById('dash_table').getElementsByTagName('tbody')[0];
    tableHistory.innerHTML = '';
    curr.forEach(function(item) {
        tableHistory.innerHTML += `
            <tr>
                <td>${item.bid}</td>
                <td>${item.start_dest}</td>
                <td>${item.final_dest}</td>
                <td>${dateFormat(item.etd)}</td>
                <td>${timeFormat(item.etd)}</td>
                <td><button onclick="viewDetails('${item.bid}')">View</button></td>
            </tr>
        `;
    });
    let current = document.getElementById('current');
    let history = document.getElementById('history');
    current.style.backgroundColor = "#FDDA0D";
    history.style.backgroundColor = "#FFFF8F";
}

getDataArray();