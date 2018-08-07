var ns_watersources_map = {

  init: function(){


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbmF3YXRlcnJpc2siLCJhIjoiY2prYXVienJqMmR6bjNrbWU2bnFwd3Q2bCJ9.oNhqTOCTIyovQdJgCb91Eg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chinawaterrisk/cjkauhqyv2fut2ro2lkp822x8',
    center: [110, 36.5],
    zoom: 2.8
});


// When the checkbox changes, update the visibility of the layer.
var input = document.createElement

jQuery("input[name='basemap']")
.on("change", function() {
//input.addEventListener('change', function(e) {
    map.setLayoutProperty($(this).val(), 'visibility',
        $(this).is(':checked') ? 'visible' : 'none');
});

map.on('load', function() {
jQuery("input[name='basemap']").each(function(){
  map.setLayoutProperty($(this).val(), 'visibility',
      $(this).is(':checked') ? 'visible' : 'none');
});
});

}
}

jQuery( document ).ready(function() {
  ns_watersources_map.init();
});

// Legend
const legend = document.getElementById('legend_prec_scale');
const grad = chroma.scale(["#4d0d04","#931019","#d21e32","#e76f62","#f5af90","#f6ccb9","#f7e9e3","#e8f0f4","#c9e0ec","#a9d1e4","#87bfdb","#5ca5cd","#308bbe","#0571b0"])
    .domain([1,2,3,4,5,6,7,8,9,10,11,12,13,14])
    .mode('lab');





//legend.style.backgroundImage = `linear-gradient(to right, ${grad(0)}, ${grad(14)})`;
legend.style.backgroundImage = `linear-gradient(to right, #4d0d04, #931019,#d21e32,#e76f62,#f5af90,#f6ccb9,#f7e9e3,#e8f0f4,#c9e0ec,#a9d1e4,#87bfdb,#5ca5cd,#308bbe,#0571b0)`;
