var ns_watersources_map = {

  init: function(){


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbmF3YXRlcnJpc2siLCJhIjoiY2prYXVienJqMmR6bjNrbWU2bnFwd3Q2bCJ9.oNhqTOCTIyovQdJgCb91Eg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chinawaterrisk/cjkauhqyv2fut2ro2lkp822x8',
    center: [110, 34.5],
    zoom: 2.8,
    scrollZoom : false,
});


// When the checkbox changes, update the visibility of the layer.
var input = document.createElement

jQuery("input[name='basemap']")
.on("change", function() {
//input.addEventListener('change', function(e) {
    map.setLayoutProperty(jQuery(this).val(), 'visibility',
        jQuery(this).is(':checked') ? 'visible' : 'none');
});

map.on('load', function() {

  map.addLayer({
    id: 'prec',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: ['https://api.mapbox.com/v4/chinawaterrisk.b69jkhaz/{z}/{x}/{y}.png?access_token='+mapboxgl.accessToken],
    },
    minzoom: 2.8,
    maxzoom: 2.8
  },'rivers');


  jQuery("input[name='basemap']").each(function(){
    map.setLayoutProperty(jQuery(this).val(), 'visibility',
        jQuery(this).is(':checked') ? 'visible' : 'none');
  });


  // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    function showPopup(e) {
      // Updates the cursor to a hand (interactivity)
      map.getCanvas().style.cursor = 'pointer';

      // Show the popup at the coordinates with some data
      // popup.setLngLat(e.features[0].geometry.coordinates)
      popup.setLngLat(e.lngLat)
        .setHTML(checkEmpty(e.features[0].properties.River))
        .addTo(map);
    }

    function hidePopup() {
      map.getCanvas().style.cursor = '';
      popup.remove();
    }

    function updatePopup(e){
      popup.setLngLat(e.lngLat)
        .setHTML("<div class='tooltip'>"+e.features[0].properties.River+"</div>")
    }

    function checkEmpty(info) {
      return (info) ? info : "No data";
    }

  // CHANGE: Add layer names that need to be interactive

    map.on('mouseover', 'basins', showPopup);
    map.on('mouseleave', 'basins', hidePopup);
    map.on('mousemove', 'basins', updatePopup);


});

}
}

jQuery( document ).ready(function() {
  ns_watersources_map.init();

  // Legend
  const legend = document.getElementById('legend_prec_scale');
  legend.style.backgroundImage = `linear-gradient(to right, #4d0d04, #931019,#d21e32,#e76f62,#f5af90,#f6ccb9,#f7e9e3,#e8f0f4,#c9e0ec,#a9d1e4,#87bfdb,#5ca5cd,#308bbe,#0571b0)`;
});
