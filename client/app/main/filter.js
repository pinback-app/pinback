angular.module('greenfield.main').filter('filter', [function() {
  return function(geojson, searchProperty, searchValue) {
    console.log('Matches:');
    var matches = {'type': 'FeatureCollection', 'features': []};
    angular.forEach(geojson.features, function(featureObject, featureKey) {
      if (featureObject.properties.hasOwnProperty(searchProperty)) {
        var property = featureObject.properties[searchProperty].toLowerCase();
        var search = searchValue.toLowerCase();
        if (property.indexOf(search) > -1) {
          matches.features.push(featureObject);
          console.log(featureObject.properties.name);
        }
      }
    });
    return matches;
  };
}]);