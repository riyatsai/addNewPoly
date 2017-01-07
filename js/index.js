      function deletePolygon(id){
          $.post('sql/delete.php',{id:id}).done(function(){
            alert('The polygon has been deleted.');
            window.location.reload();
         });
      }

      function zoomIn(json){
         var data = JSON.parse(json.replaceAll('!','"'));
         var bounds = new google.maps.LatLngBounds();
         for(var i=0;i<data.length;i++){
            bounds.extend(data[i]);
         }
         map.fitBounds(bounds);
      }

      String.prototype.replaceAll = function(search, replacement) {
    			var target = this;
    			return target.split(search).join(replacement);
			};	
			function upload(){
				event.preventDefault();
				var obj = {
					pl_name:JSON.stringify([].map.call(document.getElementsByName('pl_name[]'),function(input){return input.value;})),
					pl_des :JSON.stringify([].map.call(document.getElementsByName("pl_des[]"),function(input){return input.value;})),
					vecList:JSON.stringify(polygonArray)
				}
				$.post('sql/insert.php',obj).done(function(data){
					alert('insert complete');
          window.location.reload();
				});
			}
			(function(){
				window.fromDB = [];
        var marker = [];
  				$.post('sql/select.php').done(function(data){
            var str='';
     			  data = JSON.parse(data);
     			  for(var i=0;i<data.length;i++){
     			  	  var triangleCoords = [].map.call(JSON.parse(data[i]['polyCoor'].replaceAll('\\"','"')),function(input){
     			  	  		  var tmp = input.split(',');
     			  	  		  return {lat:parseFloat(tmp[0]),lng:parseFloat(tmp[1])};
     			  	  });

                str+='<tr><td>'+data[i]["polyName"]+'</td><td>'+data[i]["comment"]+'</td><td><button style="display:block; margin:1px auto;" class="btn btn-default"; onclick="zoomIn(\''+JSON.stringify(triangleCoords).replaceAll('"','!')+'\')">Zoom</button></td><td><button style="display:block; margin:1px auto;" class="btn btn-danger" onclick="deletePolygon('+data[i]["id"]+')">Delete</button></td></tr>';

                console.log(triangleCoords);
          			  var polygon = new google.maps.Polygon({
                		  paths: triangleCoords,
                      fillColor: '#d1088a',
                      fillOpacity: 0.5,
                      strokeColor:'#d1088a',
                      strokeWeight: 2,
                      clickable: true,
                      // editable: true,
                      // draggable:true,
                      zIndex: 1
          			  });
                  drop(polygon,marker);
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


          			  window.fromDB.push(polygon);
          			  polygon.setMap(map);
      			  }
              $('#polygonDbList').html(str);
      			  console.log(window.fromDB);
  				}); 
			})();


