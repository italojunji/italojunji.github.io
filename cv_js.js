var mapHidden = true;
var listsHidden = new Array( true, true,true,true, true );


$(document).ready(function(){
	$("#map_canvas").hide();
	$("ul").hide();
;})

function inicializaMapa(){
	//Necessário setTimeout para esperar o mapa deslizar completamente, senão ficava destorcido.
	setTimeout(function initialize() {
		var icon = {url: 'images/icon.png',
		scaledSize: new google.maps.Size(50, 50)};
		var mapCanvas = document.getElementById('map_canvas');
		var mapOptions = {
			center: new google.maps.LatLng(-19.9246363,-43.9380552),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.HYBRID
		}
		var map = new google.maps.Map(mapCanvas, mapOptions)
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(-19.9246363,-43.9380662),
			title: "Meu endereço",
			map: map,
			icon: icon,
			animation: google.maps.Animation.BOUNCE,
			
		});
	},2000);
	
}

function toggleMap(){
	$("#map_canvas").slideToggle(1000);
	if (mapHidden){
		inicializaMapa();
		mapHidden = false;
		replaceButtonText("buttonMap", "Esconder Mapa")
	}
	else{
		mapHidden=true;
		replaceButtonText("buttonMap", "Ver Mapa")
	}

}

function toggleList(idButton){
	var typeList= idButton.split('button')[1];
	$("#list"+typeList).slideToggle(1000);
	var num = idButton[idButton.length-1];
	if (listsHidden[num]){
		listsHidden[num] = false;
		$("#"+idButton).html("&#10548;");
		$("#"+idButton).blur();
	}
	else{
		listsHidden[num]=true;
		$("#"+idButton).html("&#10549;");
	$("#"+idButton).blur();}
}

function replaceButtonText(buttonId, text)
{
	if (document.getElementById)
	{
		var button=document.getElementById(buttonId);
		if (button)
		{
			button.innerHTML=text;
		}
	}
}


$.ajax({
	url: 'http://rarolabs.com.br:88/alunos.json',
	dataType: 'json',
	
	success: function (data) {
		data.sort(function (a, b) {
			if (a.nome > b.nome)
			return 1;
			
			if (a.nome == b.nome)
			return 0;
			
			if (a.nome > b.nome)
			return -1;
		});
		data.forEach(function (e, i) {
			var link;
			
			if (e.link_html != "") {
				link = e.link_html
                } else {
				link = "#"
			}
			
			if (e.nome.toLowerCase().indexOf("italo junji") < 0)
			{
				$("#divRelacionados").append("\n <li><a target='_blank' href='" + link + "' class='list-group-item'><span class='list-group-item-heading'>" + e.nome + "</span></a><p class='list-group-item-text'>" + e.mini_curriculo + "</p></li><hr class='curriculos'>");
			}
		});
		$("#divAlerta").remove();
	},
	error: function (xhr, status, errorThrown) {
		console.log(errorThrown + '\n' + status + '\n' + xhr.statusText);
	}
});

