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
      "class": "panel panel-group"
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

    var id = "marcador-" + contador;
    var idcuerpoTarjeta = "collapse-" + contador;


    // Personalizamos elementos

    $eliminar.id = id;
    $nombreTitulo.attr("for", id);
    $cuerpoTarjeta.id = "tituloTarjeta" + contador;
    $enlaceDatos.id = "enlaceDatos" + contador;
    $enlaceTitulo.attr("aria-controls", idcuerpoTarjeta);
    $eliminar.click(borrarRestauante);
    $enlaceTitulo.click(colapso);

    // Agregarlos al DOM
    $enlaceDatos.append(recomendaciones); // no lo inserta :(
    $datosTarjeta.html("Dirección: " + direccionRestauante + "<br> " + "Recomendación: " + recomendaciones);
    $cuerpoTarjeta.append($datosTarjeta);
    $enlaceTitulo.html( + nombreRestauante + "<br> " + "Contacto" + numeroRestauante);
    $tituloTarjeta.append($enlaceTitulo);
    $encabezadoTarjeta.append($tituloTarjeta);
    $tarjeta.append($encabezadoTarjeta, $cuerpoTarjeta);
    $acordion.append($tarjeta);
    $eliminar.append($equis);
    $tarjeta.append($eliminar);


    //Borrar contenido de textarea
    $nombre.val("");
    $numeroLocal.val("");
    $direccion.val("");
    $recomendaciones.val("");
    $botonRestauante.attr("disabled", true);

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
      $tarjetaEsconder.css("background-color", "#8b33a1");
      $tarjetaEsconder.css("color", "#ebd8dd");
    }
  };





  // Cuando carga la página
  $(document).ready(crearTarjetaRestauante);
})();
function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: false,
          zoom: 8
        });
      }
