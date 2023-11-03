//Creamos la clase Github con dos atributos, la URL a la API y la cabecera de la tabla para mostrar la info.

function Github() {
            this.apiUrl = 'https://api.openweathermap.org/';
            this.key = '717290cd13ab3d6af5db756585281636'    
}

        // obtiene texto plano o html
var lat = "";
var long = "";
Github.prototype.getJqueryLatestCommits = function() {
            var city = $("#lugar").val();
            
            $.get(this.apiUrl + '/geo/1.0/direct?q='+city+"&limit=5&appid="+this.key,
            function(ciudades) {
                var result="";

                if (ciudades && ciudades.length > 0) {
                    lat = ciudades[0].lat
                    long = ciudades[0].lon
                    var map = new Github(); 
                    map.getweather();
                } else {
                    result = 'No se han encontrado commits en el repositorio de jQuery';
                    lat= null;
                }
                $('#results').html(result);
            });
};

Github.prototype.getweather = function() {

    $.get(this.apiUrl + '/data/2.5/weather?lat='+lat+"&lon="+long+"&appid="+this.key,
    function(ciudad) {
        const imagen = $("#imagen");
        var result1="";
        var iconUrl
        if (lat!= null) {
             result1 += ciudad.weather[0].icon
             iconUrl = "http://openweathermap.org/img/w/"+result1+".png";
             description = ciudad.weather[0].main
    
        } else {
            result1 = "";
        }
        
        imagen.attr("src", iconUrl);
        $('#card-main').html(description); 
    });
};


$(function(){
   var map = new Github();

   $('#buscar').on('click', function(){
        map.getJqueryLatestCommits();
   });

})

