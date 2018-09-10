var ns_watersources_map = {

  init: function(){

    // Basin infos
    basins_infos=
    {
      'heilongjiang':"<div class='basin-info heilongjiang-info'>\
					<h4>Heilongjiang River (黑龙江)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>This \"Black Dragon River\" marks the boundary between Russia and China and runs east across Northern China and empties into the Sea of Okhotsk. At over 4,300km, it is the 11<sup>th</sup> longest river in the world.</p>\
                      <p>Key Facts:<br>\
                    </p><ul>\
                    <li>Pollution from lack of water treatment by heavy industry</li>\
                    <li>Potential transnational tension with Russia</li>\
                    <li>Natural habitat of the Siberian Tiger, black bear and many rare bird species</li>\
                   </ul><p></p></div>\
				</div>",

        'hai':"<div class=\"basin-info hai-info\">\
					<h4>Hai River (海河)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The longest tributary of this sediment-rich river runs 1,329km through Beijing and Tianjin before emptying into the Bohai Gulf of the Yellow Sea.</p>\
                     <p>Key Facts:<br>\
                    </p><ul>\
					<li>Hai's flood control has a significant economic and environmental impact on Beijing and Tianjin</li>\
                    <li>Water treatment needed for a range of industrial pollution</li>\
                    <li>68.3% of the water quality is poor = not fit for human contact (Ministry of Environmental Protection, 2009 State of Environment Report). This has deteriorated from 65.6% in 2009.</li>\
                    </ul><p></p></div>\
				</div>",

        'huai':"<div class=\"basin-info huai-info\">\
					<h4>Huai River (淮河)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The 1,078km Huai River originates in the Tongbai Mountain in Henan province and flows through northern Anhui, finally entering the Yangtze River at Jiangdu, Yangzhou.</p>\
                     <p>Key Facts:<br>\
                    </p><ul>\
					<li>Investment in flood control</li>\
					<li>58.1% of the water quality is poor = not fit for human contact (Ministry of Environmental Protection, 2009 State of Environment Report). This has improved from 62.7% in 2009.</li>\
                    </ul><p></p></div>\
				</div>",

        'liao':"<div class=\"basin-info liao-info\">\
					<h4>Liao River  (辽河)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>Also known as the 'Mother' River, the 1,390km Liao flows through Hebei, Inner Mongolia, Jilin and Liaoning provinces. It empties into the Bohai Sea with a drainage area of over 200,000km<sup>2</sup>.</p>\
                     <p>Key Facts:<br>\
                    </p><ul>\
                    <li>Pollution from lack of water treatment by heavy industry</li>\
                    <li>59.5% of the water quality is poor = not fit for human contact (Ministry of Environmental Protection, 2009 State of Environment Report)</li>\
                    <li>Potential transnational tension with Russia</li></ul><p></p></div>\
				</div>",

        'songhua':"<div class=\"basin-info songhua-info\">\
					<h4>Songhua River (松花江)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>Also known as the Sungari, the Songhua River is 2,308km long. It is the largest tributary of the Heilongjiang River and flows from the Changbai Mountains.</p>\
					 <p>Key Facts:<br>\
                    </p><ul>\
                    <li>Pollution from lack of water treatment by heavy industry</li>\
                    <li>54.8% of the waater quality is poor = not fit for human contact(Ministry of Environmental Protection, 2011 State of Environment Report). This has improved from 59.5% in 2009.</li>\
                    <li>Potential transnational tension with Russia</li></ul><p></p></div>\
				</div>",

        'yangtze':"<div class=\"basin-info yangtze-info\">\
					<h4>Yangtze River (长江)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The longest river in China and the third longest in the world at 6,300km, it originates in the Tibetan plateau and flows through Qinghai, Tibet, Yunnan, Sichuan, Hubei, Hunan, Jiangxi, Anhui and Jiangsu before entering the East China Sea in Shanghai. It has 8 major tributaries and a catchment area of 1.8million km<sup>2</sup>, equivalent to around 20% of China's land mass.</p>\
                     <p>Key Facts:<br>\
                    </p><ul>\
					<li>Social &amp; environmental impacts of massive hydropower projects such as the Three Gorges Dam </li>\
                    <li>Investments that bolster integrated water resource management</li>\
                    <li>Important source for transportation and irrigation</li>\
                    <li>Suffers from sewage and industrial waste dumping</li>\
                    <li>19.1% of the water quality is poor = not fit for human contact (Ministry of Environmental Protection, 2009 State of Environment Report). This has deteriorated from 12.6% in 2009.</li></ul><p></p></div>\
				</div>",

        'pearl':"<div class=\"basin-info pearl-info\">\
          <h4>Pearl River (珠江)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The Pearl flows through dense population areas of Yunnan, Guizhou, Guangxi, Guandong and empties into the South China Sea between Hong Kong and Macau where it forms a delta. The river is 2,214km long and its basin is over 400,000km<sup>2</sup>.</p>\
                     <p>Key Facts:<br>\
                    </p><ul>\
          <li>Water treatment from a range of industries including textile</li>\
                    <li>Initiatives under way to clean up the Pearl River Delta</li>\
                    <li>Surrounded by fertile soil and abundant natural resources</li>\
                    <li>15.2% of the water quality is poor = not fit for human contact (Ministry of Environmental Protection, 2009 State of Environment Report)</li>\
                    </ul><p></p></div>\
         </div>",


        'yellow':"<div class=\"basin-info yellow-info\">\
					<h4>Yellow River (黄河)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The Yellow River is China's second longest river at almost 5,500km. The river is noted for its associations with ancient Chinese culture and civilization. Originating in the Bayanhar Mountains in Qinghai Province, it meanders across 9 provinces and reaches the ocean in Shandong Province.</p>\
                    <p>Key Facts:<br>\
                    </p><ul>\
                    <li>Impact of agri-chemicals on the river in China’s agricultural heartland as it suffers from intense irrigation</li>\
                    <li>Water volumes decreasing and flows less predictable</li>\
					<li>30.2% of the water quality is poor = not fit for human contact (Ministry of Environmental Protection, 2011 State of Environment Report)</li>\
                    </ul><p></p></div>\
				</div>",



    }

    for(var basin in basins_infos) {
      jQuery( "#basins-infos" ).append(basins_infos[basin]);
    }

    jQuery(".basin-info").hide();



    // Mapbox
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

      function showBasinInfo(e){
          basin = e.features[0].properties.River.toLowerCase();
          jQuery(".basin-info").hide();
          jQuery("."+basin+"-info").show();

      }

      function checkEmpty(info) {
        return (info) ? info : "No data";
      }

      // CHANGE: Add layer names that need to be interactive

      // map.on('mouseover', 'basins', showPopup);
      // map.on('mouseleave', 'basins', hidePopup);
      // map.on('mousemove', 'basins', updatePopup);
      map.on('click', 'basins', showBasinInfo);


    });

  }
}

jQuery( document ).ready(function() {
  ns_watersources_map.init();

  // Legend
  const legend = document.getElementById('legend_prec_scale');
  legend.style.backgroundImage = `linear-gradient(to right, #4d0d04, #931019,#d21e32,#e76f62,#f5af90,#f6ccb9,#f7e9e3,#e8f0f4,#c9e0ec,#a9d1e4,#87bfdb,#5ca5cd,#308bbe,#0571b0)`;
});
