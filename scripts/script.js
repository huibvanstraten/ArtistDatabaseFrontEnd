let artistArray = [];

function addData() {
    let firstName = document.querySelector('#firstName');    
    let lastName = document.querySelector('#lastName');  
    let bandName = document.querySelector('#bandName');  
    let bestSong = document.querySelector('#bestSong');
    let musicGenre = document.querySelector('#musicGenre');

    let url = "http://localhost:8080/artistdatabase/artist";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
        if(this.status == 200) {
           getData();
        }
    }

    var data = JSON.stringify({"firstName": firstName.value, "lastName": lastName.value, "bandName": bandName.value, "bestSong": bestSong.value, "musicGenre": musicGenre.value});
    xhr.send(data);
}

function getData() { 
    let url = "http://localhost:8080/artistdatabase/artist/all";
    
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if(this.status == 200) {
            artistArray = JSON.parse(this.responseText);  
            showData(artistArray);
        }
    }
    xhr.send();
}

function clearStorage() { 
    let url = "http://localhost:8080/artistdatabase/artist";
    
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("DELETE", url, true);
    xhr.onload = function() {
	    if (this.status == 200) {
            getData();
	    }        
	}
    xhr.send();
}

function showData(artistArray) { 
    let tbl = document.getElementById("databasetable"); 
    let x = tbl.rows.length;
    while (--x) {
        tbl.deleteRow(x);
    }

    if (artistArray !== undefined && artistArray.length !== 0) {
        for (let i = 0; i < artistArray.length; i++) {
            let row = tbl.insertRow();
            let cellFirstName = row.insertCell();
            let cellLastName = row.insertCell();
            let cellbandName = row.insertCell();
            let cellBestSong = row.insertCell();
            let cellMusicGenre = row.insertCell();
            cellFirstName.innerHTML = artistArray[i].firstName;
            cellLastName.innerHTML = artistArray[i].lastName;
            cellbandName.innerHTML = artistArray[i].bandName;
            cellBestSong.innerHTML = artistArray[i].bestSong;
            cellMusicGenre.innerHTML = artistArray[i].musicGenre;
        }
    }
}