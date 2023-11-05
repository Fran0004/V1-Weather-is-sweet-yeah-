//Creamos la clase Github con dos atributos, la URL a la API y la cabecera de la tabla para mostrar la info.

function Github() {
    this.apiUrl = 'https://api.openweathermap.org/';
    this.key = '717290cd13ab3d6af5db756585281636'
}

// obtiene texto plano o html
var lat = "";
var long = "";
Github.prototype.getJqueryLatestCommits = function () {
    var city = $("#lugar").val();

    const contenidoOculto = document.getElementById("cartas");

    $.get(this.apiUrl + '/geo/1.0/direct?q=' + city + "&limit=5&appid=" + this.key,
        function (ciudades) {
            var result = "";

            if (ciudades && ciudades.length > 0) {
                lat = ciudades[0].lat
                long = ciudades[0].lon
                var map = new Github();
                map.getweather();
            } else {
                result = 'No se han encontrado commits en el repositorio de jQuery';
                lat = null;
            }
            contenidoOculto.style.display = "block";
            $('#results').html(result);
        });
};

Github.prototype.getweather = function () {

    $.get(this.apiUrl + '/data/2.5/forecast?lat=' + lat + "&lon=" + long + "&appid=" + this.key,
        function (dias) {
            const imagen = $("#imagen");
            var result1 = "";
            var iconUrl
            if (lat != null) {

                for (let i = 0; i < 6; i++) {
                    result1 = dias.list[i].weather[0].icon
                    iconUrl = "http://openweathermap.org/img/w/" + result1 + ".png";
                    description = dias.list[i].weather.mian
                    tiempo = dias.list[i].main.temp + " Kº"
                    const imagen = $("#imagen" + i);
                    imagen.attr("src", iconUrl);
                    $('#card-main' + i).html(description);
                    $('#card-temp' + i).html(tiempo);

                }

            } else {
                result1 = "";
            }


        });
};
Github.prototype.getweatherLocal = function (latitud,longitud) {

    $.get(this.apiUrl + '/data/2.5/weather?lat=' + latitud + "&lon=" + longitud + "&appid=" + this.key,
        function (dias) {
            const imagen = $("#imagen");
            var result1 = "";
            var iconUrl
            if (lat != null) {

                result1 = dias.weather[0].icon
                iconUrl = "http://openweathermap.org/img/w/" + result1 + ".png";
                description = dias.name
                tiempo = dias.main.temp + " Kº"
                const imagen = $("#imagenLocal");
                imagen.attr("src", iconUrl);
                $('#card-mainLocal').html(description);
                $('#card-tempLocal').html(tiempo);

            } else {
                result1 = "";
            }
        });
};


$(function () {
    var map = new Github();

    $('#buscar').on('click', function () {
        map.getJqueryLatestCommits();
    });

})

function showContent(tabName) {
    var git = new Github
    var content = document.getElementsByClassName("content");
    for (var i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
    if (tabName == "cartasola") {
       
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitud = position.coords.latitude;
                var longitud = position.coords.longitude;
                 git.getweatherLocal(latitud,longitud);
            });
        } else {
            console.error("La geolocalización no está soportada por este navegador.");
        }
       
    }
}
