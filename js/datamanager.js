/*
    Ultrastar Songlist Web
    Copyright (C) 2023  Marcel Krepinsky

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/


var fullcsv = "";
var data = [];

var req = new XMLHttpRequest();
req.open("GET", "songlist.csv", true);
req.onreadystatechange = function()
{
    fullcsv = req.responseText;
    data = $.csv.toArrays(fullcsv, {
        delimiter: "|", // Sets a custom value delimiter character -- Here set to an unlikely character because it's unused but kept in as an option
        separator: ';', // Sets a custom field separator character
    });

    updateTable("");


};
req.send();


$( "#search-field" ).val("");
$( "#search-field" ).on('input', function updateTableSearch() {
    let searchstr = $( "#search-field" ).val();
    updateTable(searchstr);
});



function updateTable(filter) {
    filter = filter.toLowerCase();
    $( "#table-body" ).empty();

    let htmlOut = "";
    for(i=1; i < data.length; i++) {
        if(data[i][1].toLowerCase().includes(filter) || data[i][2].toLowerCase().includes(filter)) {
            let lineString = "<tr><td>" + data[i][0] + "</td><td>" + data[i][1] + "</td><td>" + data[i][2] + "</td></tr>";
            htmlOut = htmlOut + lineString;
        }
    }
    $( "#table-body" ).html(htmlOut);
}

