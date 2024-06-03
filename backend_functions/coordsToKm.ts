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


  export function getInfo(latitude1, longitude1) {
    console.log(latitude1);
    console.log(longitude1);
    const distance = calculateDistance(latitude1, longitude1, 52.080181, 5.137187);
    console.log(`Distance: ${distance.toFixed(1)} km`);
    return distance.toFixed(1);

  }