function showHistory(){
    var tableHTML = '<table id="dash_table" class="table">' +
        '<thead>' +
        '<tr>' +
        '<th scope="col">#</th>' +
        '<th scope="col">First</th>' +
        '<th scope="col">asdas</th>' +
        '<th scope="col">Handle</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>' +
        '<th scope="row">1</th>' +
        '<td>Mark</td>' +
        '<td>Otto</td>' +
        '<td>@mdo</td>' +
        '</tr>' +
        '<tr>' +
        '<th scope="row">2</th>' +
        '<td>Jacob</td>' +
        '<td>Thornton</td>' +
        '<td>@fat</td>' +
        '</tr>' +
        '<tr>' +
        '<th scope="row">3</th>' +
        '<td>Larry</td>' +
        '<td>the Bird</td>' +
        '<td>@twitter</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>';

    document.getElementById('table_div').innerHTML = tableHTML;
    let current = document.getElementById('current');
    let history = document.getElementById('history');
    current.style.backgroundColor = "lightyellow";
    history.style.backgroundColor = "yellow";

}
function showCurrent(){
    var tableHTML = '<table id="dash_table" class="table">' +
        '<thead>' +
        '<tr>' +
        '<th scope="col">#</th>' +
        '<th scope="col">First</th>' +
        '<th scope="col">Last</th>' +
        '<th scope="col">Handle</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>' +
        '<th scope="row">1</th>' +
        '<td>Mark</td>' +
        '<td>Otto</td>' +
        '<td>@mdo</td>' +
        '</tr>' +
        '<tr>' +
        '<th scope="row">2</th>' +
        '<td>Jacob</td>' +
        '<td>Thornton</td>' +
        '<td>@fat</td>' +
        '</tr>' +
        '<tr>' +
        '<th scope="row">3</th>' +
        '<td>Larry</td>' +
        '<td>the Bird</td>' +
        '<td>@twitter</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>';
        document.getElementById('table_div').innerHTML = tableHTML;
    let current = document.getElementById('current');
    let history = document.getElementById('history');
    current.style.backgroundColor = "yellow";
    history.style.backgroundColor = "lightyellow";
}