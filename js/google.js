var map;
var infoWindow;
var geocoder;
var polygonArray = [];
var polygonIndex = 0;
var icon

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 25.125, lng: 121.537},
    zoom: 11
  });
    var ctaLayer = new google.maps.KmlLayer({
     url:'test.kml',
     map: map
   });
  infoWindow = new google.maps.InfoWindow;
  icon ={
    url: "img/googleMark.png", 
    scaledSize: new google.maps.Size(20, 30), 
    origin: new google.maps.Point(0,0), 
    anchor: new google.maps.Point(0,30) 
  };

google.maps.event.addDomListener(document, 'keyup', function (e) { 
        var code = (e.keyCode ? e.keyCode : e.which);
        switch(code){
            case 27://ESC
                drawingManager.setDrawingMode(null);
                break;
            case 90://z
                drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                break;
            default:
                break;
        }
    });   



  var drawingManager = new google.maps.drawing.DrawingManager({
    // drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ]
    },
    polygonOptions: {
      fillColor: '#d1088a',
      fillOpacity: 0.5,
      strokeColor:'#d1088a',
      strokeWeight: 2,
      clickable: true,
      editable: true,
	  draggable:true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);
    
  google.maps.event.addListener(drawingManager,'polygoncomplete', function(polygon){
    var markers = [];  
	  var str = '';
    drop(polygon,markers);  
    str += '<span style="font-weight:700; font-size:16px; display:block;">Polygon '+(polygonIndex+1)+' points:</span>';
	  
    polygon.getPaths().forEach(function(path,index){
		    polygonArray[polygonIndex]=[];
        for(var i=0;i< path.getLength(); i++){
            str+= '<span style="font-size:16px; display:block;">'+path.getAt(i).toUrlValue(6) + '</span>';
			      polygonArray[polygonIndex].push(path.getAt(i).toUrlValue(6));
        }
        var content ='<div><div class="polygonPoint">'+str+'</div><div class="polygonContent form-group"><label>Polygon'+(polygonIndex+1)+' Name: <input class="form-control" type="text" name="pl_name[]"></label><label>Polygon'+(polygonIndex+1)+' Description<textarea class="form-control" name="pl_des[]"></textarea></label></div></div>'; 
		    document.getElementById('newPolygon').innerHTML+= content;
		    polygonIndex++;
		
        google.maps.event.addListener(path,'insert_at',function(){
           drop(polygon,markers);
           showNode('new point',path,'path');
        });
        google.maps.event.addListener(path,'remove_at',function(){
           drop(polygon,markers);
           showNode('remove point',path,'path');           
        });
        google.maps.event.addListener(path,'set_at',function(){
           showNode('point moved',path,'path');
        });
    });  
    google.maps.event.addListener(polygon,'dragend',function(){
        drop(polygon,markers);
        showNode('Polygon was dragged',polygon,'polygon');
    });
    google.maps.event.addListener(polygon,'rightclick',function(e){
        if(e.vertex != undefined){
            polygon.getPath().removeAt(e.vertex);
            drop(polygon,markers);
        }
    });
    polygon.addListener('click',function(e){
        var str='<img src="img/mark.png"></br></br><b>polygon field</b></br><label>點選範圍：</label></br>';
            str+=e.latLng.lat() + ',' + e.latLng.lng()+'</br>';
        for(var i =0; i < this.getPath().getLength(); i++) {
            str+= '土界範圍'+(i+1)+':<br>'+this.getPath().getAt(i).lat()+','+this.getPath().getAt(i).lng()+'</br>';
        }
        infoWindow.setContent(str);
        infoWindow.setPosition(e.latLng);
        infoWindow.open(map);
    });
      
    //polygonArray.push(polygon);
    console.log(polygonArray);  
  });   
}

function showNode(comment,polygonOrpath,type){
    console.log(comment);
    switch(type){
        case 'polygon':
              for(var i=0;i<polygonOrpath.getPath().getLength();i++){
                  console.log(polygonOrpath.getPath().getAt(i).toUrlValue(6));
              }
            break;
        case 'path':
              for(var i=0;i<polygonOrpath.getLength();i++){
                  console.log(polygonOrpath.getAt(i).toUrlValue(6));
              }            
            break;
        default:
            break;
    }
}

// function zoomIn(){
//     map.setZoom(15);
//     map.setCenter(centerPonit);
// }