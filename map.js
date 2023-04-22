const urlCachedPins = 'https://masterdirect.herokuapp.com/map/pins/cached';
// const urlCachedPins = 'http://localhost:1968/map/pins/cached';

const lovatoIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/614b0c9c316426410dd24bb4_lovato-icon.svg';
const lovatoImagesIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/614b0c9c6a2bd37fda58d46f_lovato-icon-photo.svg';
const lovatoPremiumIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/627fdaba1f774b4bdca62024_lvt-star.svg';
const lovatoPremiumImagesIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/627fdb302095ef883cced98c_lvt-star-photo.svg';
const gogasIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/627fda977980b6dec98b7bd1_go-gas.svg';
const gogasImagesIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/627fdaa4fc672a46a2a8c3fa_go-gas-photo.svg';
const gogasPremiumIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/629f3cc31cc45f1ac3eedd44_gogas_prem.svg';
const gogasPremiumImagesIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/629f3cc3dce9f201dc0d1a7c_gogas_prem_star.svg';
const gogasWhiteImagesIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/629b1a5f4ed1a81b7521861c_gogas-pin-photo-07.svg';
const gogasWhiteIconUrl =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/629b1a5cb35cbe239ec4c5e3_gogas-pin-06.svg';

const markerClustererIcon =
  'https://uploads-ssl.webflow.com/60362f40a83dcf0034eb880b/6059ab2542758022d1e784de_m1.png';

const mapCenter = { lat: 38.64, lng: 24.16 };
const startZoom = 6;
const searchZoom = 14;
const gpsZoom = 11,
  gpsZoomMobile = 10;
foundMarkerZoom = 14;
const maxZoomClusterer = 10;
let markers = [],
  clusterer;

const gridSizesDependedOnZoom = { 6: 40, 7: 35, 8: 30, 9: 25, 10: 30 };
const gridSizesDependedOnZoomMobile = { 6: 40, 7: 35, 8: 30, 9: 25, 10: 15 };
const zoomLevelsDependedOnZoom = { 6: 9, 7: 10, 8: 10, 9: 12, 10: 12 };

let map,
  infoWindow,
  userMarker,
  selectedMarker,
  geocoder,
  geocoderFoundAddress = false,
  thAddress,
  infoWindowDiv,
  slideIndex = 1,
  cachedPins,
  clusterAlgo;

document.addEventListener('DOMContentLoaded', async () => {
  console.log('domcontent loaded');
});

async function getCachedPins() {
  try {
    const res = await fetch(urlCachedPins);
    return await res.json();
  } catch (e) {
    console.error('Error Fetching Cached Pins:', e);
    return null;
  }
}

async function initMap() {
  console.log('initMap');

  const mapOptions = {
    zoom: startZoom,
    center: mapCenter,
    mapTypeId: 'roadmap',
    minZoom: startZoom,
    disableDefaultUI: false,
    scaleControl: true, // ?
    clickableIcons: false, //map places not clickable
    keyboardShortcuts: false,
    mapTypeControl: false, //Χάρτης | Δορυφόρος
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    gestureHandling: 'greedy', //disable ctrl for zoom

    restriction: {
      latLngBounds: {
        north: 60.7,
        south: 20.43,
        east: 40.5,
        west: 8.56
      }
    },
    styles: [
      {
        featureType: 'water',
        stylers: [{ color: '#cae4ff' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#F7F9F9' }]
      },

      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#D0E9FF' }]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ saturation: -100 }]
      }
    ]
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  cachedPins = await getCachedPins();
  console.log(cachedPins);

  // geocoder = new google.maps.Geocoder();

  // //Init Variables
  // infoWindow = new google.maps.InfoWindow({
  //   disableAutoPan: false,
  //   maxWidth: 500,
  //   minWidth: 290,
  //   zIndex: 1001
  // });

  userMarker = new google.maps.Marker();
  selectedMarker = new google.maps.Marker();

  markers = cachedPins.map(cachedPin => {
    return new google.maps.Marker({
      position: cachedPin.geometry,
      icon: {
        url: lovatoIconUrl,
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0)
      },
      clickable: true,
      title: cachedPin.properties.name,
      cursor: 'pointer',
      animation: google.maps.Animation.DROP,
      visible: true,
      props: cachedPin.properties

      // zIndex: google.maps.Marker.MAX_ZINDEX + 1
    });
  });

  clusterAlgo = new markerClusterer.SuperClusterAlgorithm({
    maxZoom: maxZoomClusterer,
    radius: 70
    // gridSize: isMobile()
    //   ? gridSizesDependedOnZoomMobile[startZoom]
    //   : gridSizesDependedOnZoom[startZoom], //default=60,
    // averageCenter: true,
    // zoomOnClick: false,
    // //minimumClusterSize: 3,
    // ignoreHidden: true
  });
  clusterer = new markerClusterer.MarkerClusterer({
    markers,
    map,
    renderer: {
      render: ({ count, position }) => {
        return new google.maps.Marker({
          label: {
            text: String(count),
            color: '#fff',
            fontSize: '11px',
            fontWeight: 'bold'
          },
          icon: {
            url: markerClustererIcon,
            scaledSize: new google.maps.Size(53, 52)
          },
          position,
          zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count
        });
      }
    },
    algorithm: clusterAlgo
  });
  // clusterer = new MarkerClusterer(map, markers, {
  //   styles: [
  //     {
  //       url: markerClustererIcon,
  //       width: 53,
  //       height: 52,
  //       anchorText: [20, 0],
  //       textColor: '#fff',
  //       textSize: 11,
  //       fontWeight: 'bold'
  //     }
  //   ],
  //   // imagePath:
  //   // 	'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  //   averageCenter: true,
  //   zoomOnClick: false,
  //   //minimumClusterSize: 3,
  //   maxZoom: maxZoomClusterer,
  //   gridSize: isMobile()
  //     ? gridSizesDependedOnZoomMobile[startZoom]
  //     : gridSizesDependedOnZoom[startZoom], //default=60,
  //   ignoreHidden: true
  // });

  markers.forEach(marker => {
    marker.addListener('mouseover', () => {
      if (selectedMarker === marker) return;
      marker.setIcon({
        ...marker.getIcon(),
        scaledSize: new google.maps.Size(62, 62),
        origin: new google.maps.Point(0, 0)
      });
    });

    marker.addListener('click', () => {
      // map.setZoom(searchZoom);
      // map.setCenter(marker.position);

      if (selectedMarker === marker) return;
      if (selectedMarker) selectedMarker.setAnimation(null);

      marker.setIcon({
        ...marker.getIcon(),
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0)
      });
      selectedMarker = marker;
      selectedMarker.setAnimation(google.maps.Animation.BOUNCE);
      // openInfoWindow(marker);
      document.querySelector('#infoWindow').classList.add('show-info-window');
    });

    //Optional
    marker.addListener('mouseout', e => {
      if (selectedMarker === marker) return;
      marker.setIcon({
        ...marker.getIcon(),
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0)
      });
    });
    //   // marker.addListener('mouseout', e => {
    //   // 	infoWindow.close();
    //   // 	if (selectedMarker) {
    //   // 		selectedMarker.setAnimation(null);
    //   // 	}
    //   // 	selectedMarker = null;
    //   // });
  });

  // map.addListener('click', e => {
  //   infoWindow.close();
  //   if (selectedMarker) {
  //     selectedMarker.setAnimation(null);
  //   }
  //   selectedMarker = null;
  // });

  map.addListener('zoom_changed', () => {
    let currentZoom = map.getZoom();
    //console.log('current zoom', currentZoom);
    if (currentZoom > maxZoomClusterer) return;
    // gridAlgo.gridSize = isMobile()
    //   ? gridSizesDependedOnZoomMobile[currentZoom]
    //   : gridSizesDependedOnZoom[currentZoom];
  });

  // google.maps.event.addListener(markerClusterer, 'clusterclick', cluster => {
  //   infoWindow.close();
  //   if (selectedMarker) {
  //     selectedMarker.setAnimation(null);
  //   }
  //   selectedMarker = null;
  //   map.setZoom(zoomLevelsDependedOnZoom[map.getZoom()]);
  //   //map.setZoom(map.getZoom() + 2);
  //   map.setCenter(cluster.getCenter());
  // });

  // google.maps.event.addListener(markerClusterer, 'mouseover', cluster => {
  //   infoWindow.close();
  //   if (selectedMarker) {
  //     selectedMarker.setAnimation(null);
  //   }
  //   selectedMarker = null;
  //   let label = cluster.clusterIcon_.div_.querySelector('span');
  //   label.classList.add('cluster-hover');
  //   cluster.clusterIcon_.div_.classList.add('grow');
  // });
  // google.maps.event.addListener(markerClusterer, 'mouseout', cluster => {
  //   let label = cluster.clusterIcon_.div_.querySelector('span');
  //   label.classList.remove('cluster-hover');
  //   cluster.clusterIcon_.div_.classList.add('grow');
  // });

  // infoWindow.addListener('closeclick', () => {
  //   if (selectedMarker) {
  //     selectedMarker.setAnimation(null);
  //   }
  //   selectedMarker = null;
  // });

  // userMarker.addListener('click', () => {
  //   map.setZoom(searchZoom);
  //   map.setCenter(userMarker.position);
  // });
}

function isMobile() {
  return window.matchMedia('(max-width: 430px)').matches;
}
