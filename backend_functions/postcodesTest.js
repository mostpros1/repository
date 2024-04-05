// Assume you have a function GetPointFromPostcode(postcode) that retrieves coordinates
// from Google Maps API asynchronously
/*
// Initialize search control and distance search
const searchControl = new google.search.SearchControl();
const distanceSearch = new google.search.LocalSearch();
searchControl.addSearcher(distanceSearch);

// Set search complete callback
distanceSearch.setSearchCompleteCallback(null, function() {
    if (distanceSearch.results.length > 0 && distanceSearch.postcode2) {
        distanceSearch.point1 = new GLatLng(distanceSearch.results[0].lat, distanceSearch.results[0].lng);
        const postcode2 = distanceSearch.postcode2;
        distanceSearch.postcode2 = null;
        distanceSearch.execute(postcode2 + ", UK");
    } else if (distanceSearch.results.length > 0 && !distanceSearch.postcode2) {
        distanceSearch.point2 = new GLatLng(distanceSearch.results[0].lat, distanceSearch.results[0].lng);
        // Calculate distance and handle the result
        const distanceKm = calculateDistance(distanceSearch.point1, distanceSearch.point2);
        console.log(`Distance between postcodes: ${distanceKm} km`);
    } else {
        // No search results
    }
});

// Function to measure distance
function measureDistance(postcode1, postcode2) {
    distanceSearch.postcode2 = postcode2;
    distanceSearch.execute(postcode1 + ", UK");
}

// Example usage:
measureDistance("3981TS", "3531HB");
*/



function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    lat1 = deg2rad(lat1);
    lat2 = deg2rad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceKm = earthRadiusKm * c;
    return distanceKm;
}

// Example usage:
//const distance = calculateDistance(52.080181, 5.137187, 52.068354, 5.188855);
//console.log(`Distance: ${distance.toFixed(1)} km`);


function getInfo(data){
    console.log(data.latitude);
    console.log(data.longitude);
    const distance = calculateDistance( data.latitude, data.longitude, 52.080181, 5.137187);
    console.log(`Distance: ${distance.toFixed(1)} km`);

}

const myHeaders = new Headers();
myHeaders.append('token', 'api key');
// Add other headers if needed (e.g., Content-Type)

const postcode = '3981TS';

fetch('https://json.api-postcode.nl?postcode=' + postcode + '&number=1', {
  method: 'GET',
  headers: myHeaders,
})
  .then(response => response.json())
  .then(data => getInfo(data))
  .catch(error => console.error('Error fetching data:', error));