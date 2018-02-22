let weatherBox = $('.weather-box');
	searchField = $('#search-field'),
    searchBtn = $('#search-btn'),
    city = '',
    dateBox = $('.date'),
    timeBox = $('.time'),
    cityNameBox = $('.city-name'),
    descriptionBox = $('.weather-description'),
    tempBox = $('.temp'),
    pressureBox = $('.pressure'),
    humidityBox = $('.humidity'),
    windBox = $('.wind');

time()
	searchBtn.on('click', getData);
	searchField.keypress(function(e) {
    if (e.which == 13) {
        getData();
    }
});

function getData() {
    city = searchField.val();
    $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=bca3cf316106a3ce829dcd5e02021444',
            type: 'get',
            dataType: 'json',
        })
        .done(function(data) {
            displayData(data)
        })
        .fail(function() {
            cityNotFound();

        })
}

function displayData(data) {
    searchField.val('');
    cityNameBox.html(data.name).css({

    });
    descriptionBox.html(data.weather[0].description).css({
        "background-image": 'url(img/' + data.weather[0].main + "-icon" + '.png)',
    });
    tempBox.html(Math.round(data.main.temp - 273.15) + "&deg");
    pressureBox.html(data.main.pressure + " mb");
    humidityBox.html(data.main.humidity + "%");
    windBox.html(data.wind.speed + " m/s");
    weatherBox.css({
        "background-image": 'url(img/' + data.weather[0].main + '.gif)',
    });
}

function time() {
    let time = new Date(),
        day = time.getDate(),
        month = time.getMonth(),
        year = time.getFullYear(),
        hours = time.getHours(),
        minutes = time.getMinutes();

    dateBox.html(day + "." + month + "." + year)
    if (minutes < 10) {
        timeBox.html(hours + ':' + 0 + minutes)
    } else {
        timeBox.html(hours + ':' + minutes)
    }

}

function cityNotFound() {
    cityNameBox.html("City not found");
    searchField.focus();
    searchField.val('');
    tempBox.html("- " + "&deg");
    pressureBox.html("-");
    humidityBox.html("-");
    windBox.html("-");
    weatherBox.css({
        "background-image": 'url(img/weatherbg.gif)',
    });
}