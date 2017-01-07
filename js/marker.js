function drop(polygon,markers){
  clearMarkers(markers);
  for(var i=0;i<polygon.getPath().getLength();i++){
    console.log(polygon.getPath().getAt(i)); 
    addMarkerWithTimeout(polygon.getPath().getAt(i),i*200,markers);
  }
}
function addMarkerWithTimeout(position,timeout,markers){
  window.setTimeout(function(){
    markers.push(new google.maps.Marker({
      position: position,
      map: map,
      icon:icon,
      animation: google.maps.Animation.DROP
    }));
  }, timeout);
}

function clearMarkers(markers){
  for (var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
  markers = [];
}    
