(function() {
  var contador = 0;

  var crearTarjetaRestauante = function() {

    $("#formulario").submit(crearRestauante);
    $("#nombre").keyup(validarRestauante);
  };

  var crearRestauante = function(e) {
    e.preventDefault();
    // Obtenemos datos
    var $publicacion = $("#tarjeta1");
    var $nombre = $("#nombre");
    var $numeroLocal = $("#numeroLocal");
    var $direccion = $("#direccion");
    var $recomendaciones = $("#recomendaciones");
    var $botonRestauante = $("#boton-agregar-contacto");
    var $nombreTitulo = $("#nombre-visual");
    var $acordion = $("#accordion");
    var nombreRestauante = $nombre.val();
    var numeroRestauante = $numeroLocal.val();
    var direccionRestauante = $direccion.val();
    var recomendaciones = $recomendaciones.val();


    // Creamos elementos
    var $equis = $("<span>" + "&times;" + "</span>", {
      "aria-hidden": "true"
    });
    var $eliminar = $('<button type="button"/>', {
      "class": "close",
      "aria-label": "Close"
    });
    var $tarjeta = $("<div />", {
      "class": "panel panel-group restaurantesGarnacha"
    });
    var $encabezadoTarjeta = $("<div />", {
      "class": "panel-heading",
      "role": "tab"
    });
    var $tituloTarjeta = $("<h4 />", {
      "class": "panel-title"
    });
    var $enlaceTitulo = $("<a />", {
      "role": "button"
    });
    var $cuerpoTarjeta = $("<div />");
    var $datosTarjeta = $("<div />", {
      "class": "panel-body"
    });
    var $enlaceDatos = $("<a />");
    var $botonGarnacha = $("<button />",{
      "type":"button",
      "class":"btn btn-success btn-large"
    });

    var id = "marcador-" + contador;
    var idcuerpoTarjeta = "collapse-" + contador;



    // Personalizamos elementos
    $eliminar.id = id;
    $nombreTitulo.attr("for", id);
    $cuerpoTarjeta.id = "tituloTarjeta" + contador;
    $enlaceDatos.id = "enlaceDatos" + contador;
    $enlaceTitulo.attr("aria-controls", idcuerpoTarjeta);
    $botonGarnacha.id = "get-location" + contador;
    $eliminar.click(borrarRestauante);
    $enlaceTitulo.click(colapso);
    $botonGarnacha.click(obtenerUbicacion);


    // Agregarlos al DOM
    $enlaceDatos.append(recomendaciones); // no lo inserta :(
    $datosTarjeta.html("Dirección: " + direccionRestauante + "<br> " + "Recomendación: " + recomendaciones);
    $cuerpoTarjeta.append($datosTarjeta);
    $enlaceTitulo.html(" Nombre: " + nombreRestauante + "<br> " + "Contacto: " + numeroRestauante);
    $tituloTarjeta.append($enlaceTitulo);
    $encabezadoTarjeta.append($tituloTarjeta);
    $tarjeta.append($encabezadoTarjeta, $cuerpoTarjeta);
    $acordion.append($tarjeta);
    $eliminar.append($equis);
    $botonGarnacha.text("Obtener Ubicacion");
    $tarjeta.append($eliminar);
    $tarjeta.append($botonGarnacha);



    //Borrar contenido de textarea
    $nombre.val("");
    $numeroLocal.val("");
    $direccion.val("");
    $recomendaciones.val("");
    $botonRestauante.attr("disabled", true);
    //Mardar llamar el mapa
    $botonGarnacha.click(obtenerUbicacion);
    var restaurantes= [];
     restaurantes.push($tarjeta);
     console.log(restaurantes);

    contador++;
  };

  var borrarRestauante = function() {
    $(this).parent().remove();
  };

  var validarRestauante = function() {
    var $addButton = $("#boton-agregar-contacto");
    if ($(this).val().trim().length > 0) {
      $addButton.removeAttr("disabled");
    } else {
      $addButton.attr("disabled", true);
    }
  };


  var colapso = function() {
    var $tarjetaEsconder = $(this).parent().parent().next("div");


    if ($tarjetaEsconder.css("display") == "block") {
      $tarjetaEsconder.hide();
    } else {
      $tarjetaEsconder.show();
      $tarjetaEsconder.css("background-color", "#56f159");
      $tarjetaEsconder.css("color", "#060517");
    }
  };
  //para funcionalidad de geolocalizacion



var obtenerUbicacion = function(event) {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(mostrarPosicion);
} else {
  alert("Actualice su navegador");
}
};

var mostrarPosicion = function (posicion) {
var coordenadas = {
  lat: posicion.coords.latitude,
  lng: posicion.coords.longitude
};
mostrarMapa(coordenadas);
};

var mostrarMapa = function (coordenadas) {
  var map = new google.maps.Map($('#map')[0], {
    zoom: 17,
    center: coordenadas
  });
  var marker = new google.maps.Marker({
    position: coordenadas,
    map: map
  });
};
  $("#ubicacion").click(obtenerUbicacion);

// funcion para buscar.
$("#formularioBuscar").change(filtrarContactos);
   var filtrarContactos = function (e) {
  	e.preventDefault();
    var restaurantesGarnacha = $(".restaurantesGarnacha");
 	  var criterioBusqueda = $("#buscarRestaurante").val().toLowerCase();
  	var contactosFiltrados = restaurantesGarnacha.filter(function (contacto) {
  		return restaurantesGarnacha.child.child.child.toLowerCase().indexOf(criterioBusqueda) >= 0;
        console.log(contactosFiltrados);
  });
  console.log(contactosFiltrados);
  // 	//mostrarContactos(contactosFiltrados);
   };



   var directionsDisplay = new google.maps.DirectionsRenderer();
   var directionsService = new google.maps.DirectionsService();


   var request = {
    origin: $('#origen').val(),
    destination: $('#destino').val(),
    travelMode: google.maps.DirectionsTravelMode[$('#modo_viaje').val()],
    unitSystem: google.maps.DirectionsUnitSystem[$('#tipo_sistema').val()],
    provideRouteAlternatives: true
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel($("#panel_ruta").get(0));
            directionsDisplay.setDirections(response);
        } else {
                alert("No existen rutas entre ambos puntos");
        }
    });
    $('#buscar').live('click', function(){
    rockAndRoll();
});

$('.opciones_ruta').live('change', function(){
    rockAndRoll();
});






  // Cuando carga la página
  $(document).ready(crearTarjetaRestauante);
})();
