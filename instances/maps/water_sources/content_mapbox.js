var ns_watersources_map = {

  init: function(){


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbmF3YXRlcnJpc2siLCJhIjoiY2prYXVienJqMmR6bjNrbWU2bnFwd3Q2bCJ9.oNhqTOCTIyovQdJgCb91Eg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chinawaterrisk/cjkauhqyv2fut2ro2lkp822x8',
    center: [110, 39.5],
    zoom: 3.1
});


// When the checkbox changes, update the visibility of the layer.
var input = document.createElement

jQuery("input[name='basemap']")
.on("change", function() {
//input.addEventListener('change', function(e) {
    map.setLayoutProperty($(this).val(), 'visibility',
        $(this).is(':checked') ? 'visible' : 'none');
});

}
}

ns_watersources_map.init();
