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
					<li>Hai's flood control has a significant economic and environmental impact on Beijing and Tianjin.   <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/extreme-weather-events/\">Extreme Weather Events</a></li>\
          <li>Although being the river with the most Grade V+ (worst category) water, its proportion of Grade V+ water markedly improved from 41% to 32.9% In 2016-2017. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/war-on-pollution/\">War on Pollution</a></li>\
          <li>Grade I-III water (fit for human touch) also improved from 37.3% to 41.7%. It is its first time to reverse the trend of “more good water; but also more really bad water” since 2012.</li>\
          </li>\
                    </ul><p></p></div>\
				</div>",

        'huai':"<div class=\"basin-info huai-info\">\
					<h4>Huai River (淮河)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The 1,078km Huai River originates in the Tongbai Mountain in Henan province and flows through northern Anhui, finally entering the Yangtze River at Jiangdu, Yangzhou.</p>\
                     <p>Key Facts:<br>\
                    </p><ul>\
					<li>Water pollution has been linked to cancer villages in the basin during  the 1980s & 1990s <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/hidden-risks/\">Hidden Risks</a></li>\
          <li>In 2016-2017, Grade I-III water quality (fit for human touch) deteriorated from 53.3% to 46.1%. Grade V+ water quality (worst category) also slightly worsened from 7.2% to 8.3%. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/war-on-pollution/\">War on Pollution</a></li>\
                    </ul><p></p></div>\
				</div>",

        'liao':"<div class=\"basin-info liao-info\">\
					<h4>Liao River  (辽河)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>Also known as the 'Mother' River, the 1,390km Liao flows through Hebei, Inner Mongolia, Jilin and Liaoning provinces. It empties into the Bohai Sea with a drainage area of over 200,000km<sup>2</sup>.</p>\
                     <p>Key Facts:<br>\
                    </p><ul>\
                    <li>In 2016-2017, Grade I-III (fit for human touch) water in Liao River improved from 45.3% to 49% but Grade V+ water (worst category) deteriorated from 15.1% to 18.9%. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/war-on-pollution/\">War on Pollution</a></li>\
                    <li>Basin-wide flooding is rare but localised flooding occurs almost every year. Since 1886, the basin has suffered around 50 flood disasters. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/extreme-weather-events/\">Extreme Weather Events</a></li>\
                    </ul><p></p></div>\
				</div>",

        'songhua':"<div class=\"basin-info songhua-info\">\
					<h4>Songhua River (松花江)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>Also known as the Sungari, the Songhua River is 2,308km long. It is the largest tributary of the Heilongjiang River and flows from the Changbai Mountains.</p>\
					 <p>Key Facts:<br>\
                    </p><ul>\
                    <li>Since a decline in 2016, Songhua has improved markedly across all categories in 2017. Grade I-III (fit for human touch) water quality materially improved from 60% to 69%, almost reaching the Water Ten target of 70%. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/war-on-pollution/\">War on Pollution</a></li>\
                    <li>Grade V+ (worst category) water quality also improved from 6.5% to 5.6%.</li>\
                    </ul><p></p></div>\
				</div>",

        'yangtze':"<div class=\"basin-info yangtze-info\">\
					<h4>Yangtze River (长江)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The longest river in China and the third longest in the world at 6,300km, it originates in the Tibetan plateau and flows through Qinghai, Tibet, Yunnan, Sichuan, Hubei, Hunan, Jiangxi, Anhui and Jiangsu before entering the East China Sea in Shanghai. It has 8 major tributaries and a catchment area of 1.8million km<sup>2</sup>, equivalent to around 20% of China's land mass.</p>\
                     <p>Key Facts:<br>\
                    </p>\
                    <ul>\
					<li>Low water stress (4%) but high exposure to climate & water risks. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/10-hkh-rivers/\">10 HKH Rivers</a> <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/river-resources/\">River Resources</a></li>\
          <li>The Yangtze flows through nine provinces and two municipalities that form the Yangtze River Economic Belt (YREB), a region which contributes to 42% of China’s GDP and home to 456mn people. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/yangtze-water-nomics/\">Yangtze Water-nomics</a></li>\
          <li>Green development of the YREB was specifically mentioned by President Xi in his 14 points during the 19th National Congress of the Communist Party of China.</li>\
          <li>The Yangtze River Delta is also one of the focus regions for the Water Ten plan. In 2016-2017, Grade I-III water quality (fit for human touch) improved from 82.3% in 2016 to 84.5%. Grade V+ water quality (worst category) also improved from 3.5% to 2.2%  <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/war-on-pollution/\">War on Pollution</a></li>\
          </ul><p></p></div>\
				</div>",

        'pearl':"<div class=\"basin-info pearl-info\">\
          <h4>Pearl River (珠江)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The Pearl flows through dense population areas of Yunnan, Guizhou, Guangxi, Guandong and empties into the South China Sea between Hong Kong and Macau where it forms a delta. The river is 2,214km long and its basin is over 400,000km<sup>2</sup>.</p>\
                     <p>Key Facts:<br>\
                    </p><ul>\
          <li>The Pearl River feeds the Greater Bay Area (GBA), a region earmarked by the Chinese government to become a globally competitive metropolis. The GBA already accounts for 5% of China’s entire population and 12% of national GDP.</li>\
          <li>In 2016-2017, Grade I-III water quality (fit for human touch) deteriorated from 89.6% to 87.3%. Grade V+ (worst category water quality also slightly worsened from 3.6% to 4.2%. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/war-on-pollution/\">War on Pollution</a></li>\
        <li>88% of the Pearl River Delta’s GDP is generated by 6 cities in “water poverty”.\
        The Pearl River Delta is one of the focus regions for the Water Ten plan.</li>\
        <li>The Dongjiang River which feeds Hong Kong is a tributary of the Pearl River; 11% of water from the Dongjiang River was classified as Grade V+ water quality (worst category) in 2015.</li>\
      </ul><p></p></div>\
      </div>",

        'yellow':"<div class=\"basin-info yellow-info\">\
					<h4>Yellow River (黄河)</h4>\
          <div class='bp-text bp-paragraph-text'>\
                    <p>The Yellow River is China's second longest river at almost 5,500km. The river is noted for its associations with ancient Chinese culture and civilization. Originating in the Bayanhar Mountains in Qinghai Province, it meanders across 9 provinces and reaches the ocean in Shandong Province.</p>\
                    <p>Key Facts:<br>\
                    </p>\
                    <ul>\
                    <li>High water stress (63%) and high exposure to climate & water risks.  <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/10-hkh-rivers/\">10 HKH Rivers</a>  <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/river-resources/\">River Resources</a></li>\
                    <li>Impact of agri-chemicals on the river in China’s agricultural heartland as it suffers from intense irrigation.</li>\
                    <li>In 2016-2017, Grade I-III water quality (fit for human touch) deteriorated from 59.1% to 57.7%. Grade V+ (worst category) water quality also worsened from 13.9% to 16.1%. <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/war-on-pollution/\">War on Pollution</a></li>\
                    <li>Changing river flows - runoffs from its upper reaches in 2016 were 30% less than an average year, the driest in recent 14 years.   <a class=\"bp-bp-link\" href=\"http://chinawaterrisk.org/the-big-picture/river-runoff-mix/\">River Runoff Mix</a></li>\
                    </ul><p></p></div>\
				</div>",

        // 'upper-mekong': "<div class=\"basin-info upper-mekong-info\">\
        // 					<h4>Upper Mekong River (澜沧江)</h4>\
        //                     <p>The Mekong is the longest river in South East Asia at over 2,300km.\
        //                     It starts in Qinghai leaving China in Yunnan, flowing through Laos and\ Cambodia and emptying out into the sea in south Vietnam.</p>\
        // 					<p>Key Facts:<br>\
        //                     </p><ul>\
        // 					<li>Social and environmental impacts of dams and hydropower projects</li>\
        //                     <li>River flow diversion from downstream countries - Vietnam in\ particular </li>\
        //                     <li>Potential transnational tension with Cambodia, Laos and\ Vietnam</li>\
        //                    </ul><p></p>\
        // 				</div>",
        //
        //   'brahmaputra':
        //         "<div class=\"basin-info brahmaputra-info\">\
				// 	<h4>Brahmaputra River (雅鲁藏布江)</h4>\
        //             <p>Starting from Tibet, the 2,900 km long river first flows east and then south through India and Bangladesh into the Indian Ocean. </p>\
        //              <p>Key Facts:<br>\
        //             </p><ul>\
				// 	<li>Important source for transportation and irrigation</li>\
        //             <li>Dam building and river diversion</li>\
        //             <li>Natural habitat of rare river dolphins</li>\
        //             <li>Potential transnational tension  with India and Bangladesh</li>\
        //             </ul><p></p>\
				// </div>"
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

      // map.addLayer({
      //   id: 'prec',
      //   type: 'raster',
      //   source: {
      //     type: 'raster',
      //     tiles: ['https://api.mapbox.com/v4/chinawaterrisk.b69jkhaz/{z}/{x}/{y}.png?access_token='+mapboxgl.accessToken],
      //   },
      //   minzoom: 2.8,
      //   maxzoom: 2.8
      // },'rivers');


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
          basin = e.features[0].properties.River.replace(/\s+/g, '-').toLowerCase();

          // change only if basin exists
          if( basin in basins_infos){
            jQuery(".basin-info").hide();
            jQuery("."+basin+"-info").show();
          }


      }

      function checkEmpty(info) {
        return (info) ? info : "No data";
      }

      // CHANGE: Add layer names that need to be interactive

      // map.on('mouseover', 'basins', showPopup);
      // map.on('mouseleave', 'basins', hidePopup);
      // map.on('mousemove', 'basins', updatePopup);
      map.on('click', 'basins', showBasinInfo);
      map.on('click', 'rivers-name', showBasinInfo);


      map.dragPan.disable();
      map.doubleClickZoom.disable();



    });

  }
}

jQuery( document ).ready(function() {
  ns_watersources_map.init();

  // Select a first basin
  jQuery(".yangtze-info").show();

  // Legend
  const legend = document.getElementById('legend_prec_scale');
  legend.style.backgroundImage = `linear-gradient(to right, #4d0d04, #931019,#d21e32,#e76f62,#f5af90,#f6ccb9,#f7e9e3,#e8f0f4,#c9e0ec,#a9d1e4,#87bfdb,#5ca5cd,#308bbe,#0571b0)`;
});
