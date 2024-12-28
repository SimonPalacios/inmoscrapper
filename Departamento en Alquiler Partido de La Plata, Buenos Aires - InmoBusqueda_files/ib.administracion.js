function $gid(v) { return(document.getElementById(v)); }
function $S(v) { return($gid(v).style); }
function $SD(v) { return($gid(v).style.display); }


function vermas(id){
mostrar('vmas'+ id);
mostrar('vmenos'+ id);
}


function rotar(image) {
  let angulo = Number(image.getAttribute("rotangle")) + 90;
  image.setAttribute("style", "transform: rotate(" + angulo + "deg)");
  image.setAttribute("rotangle", "" + angulo);
}


function validarEmail(valor) {
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valor)){
return (true)
} else {
alert("La dirección de email es incorrecta.");
return (false);
}
}


function NuevoAjax(){
var xmlhttp=false;
try{
	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
}catch(e){
	try{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 	}catch(E){
		xmlhttp = false;
	}
}
if(!xmlhttp && typeof XMLHttpRequest!='undefined'){
	xmlhttp = new XMLHttpRequest();
}
return xmlhttp;
}

mppUrl = "http://www.inmobusqueda.com.ar/administracion/web/";
function EmailCheck(casilla,id,opcion){
ajax=NuevoAjax();
$gid(id).innerHTML = '<img src="http://www.inmobusqueda.com.ar/images/emailload.gif">';
ajax.open("GET", mppUrl+"email.recargar.php?c="+casilla+"&id="+id+"&opcion="+opcion+"&aleatorio="+Math.random(),true);
ajax.onreadystatechange=function(){
	if(ajax.readyState==4){
		if(ajax.status==200){
		  $gid(id).innerHTML = ajax.responseText;		
		}else $gid(id).innerHTML = "Error:".ajax.status;		
	}
}
ajax.send(null);
}

function EmailDelete(casilla,id,opcion){

 var elementos = document.getElementsByName("opcion"+opcion);
 var texto = '';
 for (x=0;x<elementos.length;x++){
    if (elementos[x].checked) texto = texto + (elementos[x].value) + '-';
 }
 if (texto.length < 2){ 
   alert('No seleccionó emails para borrar');
   return false;
 }
ajax=NuevoAjax();
$gid(id).innerHTML = '<img src="http://www.inmobusqueda.com.ar/images/emailload.gif">';
ajax.open("POST", mppUrl+"email.borrar.php?aleatorio="+Math.random(),true);
ajax.onreadystatechange=function(){
	if(ajax.readyState==4){
		if(ajax.status==200)  EmailCheck(casilla,id,opcion);
		                else $gid(id).innerHTML = "Error:".ajax.status;		
	}
}
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ajax.setRequestHeader("Connection", "close");
ajax.send("&casilla="+casilla+'&emails='+texto);
}


function control(dato){
  campo = document.getElementById(dato);
  
   var palabras = new Array ('estrena','oportunid','escucho','oferta','amoblado','frente','alquilad','m2','nuevo','muy','calle','financio','asfalto','promo',
   'rentable','www','http','.com.ar','.com','sitio','web','221-4220669/221-5111019','155110898','5770018','5118111','4704569','4220669','5111019','vanraappropiedades','propiedades','ultimas','últimas',
   'disponible','disponibles','ultima','última','mono','monoambiente','monoambientes','cochera','cocheras','oportunidad','procear','depto','departamentos','estrenar','construcción','cuota','cuotas',
   'anticipo','departamento','habitación','ideal','profesional', 'oficina','banco','necesitamos', 'consultorio','Nuevo','Edificio','m2','contrafrente',
   'Excelente','inversion','inversión','entrega','inmediata','comprado','vendido','imediata','pozo','inflación','inflacion','ganale','"','°','/','7663','7663','9512','4981','celular','urgente','*','4243424','3424','piso',
   '!','#','$','%','&','(',')','=','?','¿','-','_',',','<','>',':','lote','especial','oport','oportu');
 
 for (x=0;x<palabras.length;x++){
  if (campo.value.toLowerCase().indexOf(palabras[x].toLowerCase()) != -1 
    && campo.value.toLowerCase() != 'jorge a calle'
    && campo.value.toLowerCase() != 'combate de los pozo'
    && campo.value.toLowerCase() != 'combate de los pozos'){ 
     alert('Sin observaciones en la dirección por favor');
	  campo.value = '';
  }
 }   
 
  if ( campo.value.indexOf(" zona ") != -1 ){ 
     alert('ingrese la zona en el campo zona');
	  campo.value = '';
  } 
  if ( campo.value.indexOf("suspen") != -1 ){ 
     alert('Modifique es estado para marcar como suspendida. Sin observaciones en la dirección por favor.');
	  campo.value = '';
  }
}

function $Bid(v) { return(document.getElementById(v)); }
function $estilo(v) { return($Bid(v).style); }

function ver(){
 
 var campos = new Array ('lidormitorios','ligarage','liestado','superficiel','lisuperficiec','tamanolote','banos','toilette','piscina',
                     'jardin','orientacion','patio','liambientes','dependencia','detallepiso','ubicplanta','balcon','liantiguedad',
					 'aptoprofesional','luminosidad','calefaccion','seguridad','liaptobanco','terraza','fot','detalleedificio','detalleambientes',
					 'lilavadero','liamoblado','libaulera','limascotas','lipmovreducida');
 
 for (x=0;x<campos.length;x++){
    $estilo(campos[x]).display='block';
    console.log(campos[x]); 
 }

 
 
 
 $estilo('numerodelote').display='none';
 $estilo('lbnumerodelote').display='none';
 
  document.getElementById('textopiso').innerHTML = 'Piso';     
  
  
  if ($Bid('operacion').value == 2){
  	 $estilo('camas').display='block';
	 $estilo('ocupantes').display='block';
  }else{
   $estilo('camas').display='none';
	 $estilo('ocupantes').display='none';
  }
  
   
 
  //CASA
  if ($Bid('tipo').value == 1){       
	   var camposb = new Array ('dependencia','ubicplanta','seguridad','detalleedificio','detalleambientes','balcon','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }  
        document.getElementById('textopiso').innerHTML = 'Plantas';  
        
                        
  }  
 
 //COCHERA GALPON BODEGA
  if ($Bid('tipo').value == 11 || $Bid('tipo').value == 15 || $Bid('tipo').value == 19){       
	   var camposb = new Array ('lidormitorios','ligarage','liestado','banos','toilette','piscina','balcon',
                     'jardin','orientacion','patio','liambientes','dependencia','detallepiso','ubicplanta',
					 'aptoprofesional','luminosidad','calefaccion','seguridad','terraza','fot','detalleedificio','detalleambientes','lilavadero','liamoblado','libaulera','limascotas');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }
        
  }  
  
  //TERRENO CAMPO LOTE
  if ($Bid('tipo').value == 6 || $Bid('tipo').value == 9 || $Bid('tipo').value == 12 || $Bid('tipo').value == 32){
       var camposb = new Array ('lidormitorios','ligarage','liestado','banos','toilette','piscina','balcon',
                     'jardin','patio','liambientes','dependencia','detallepiso','ubicplanta',
					 'aptoprofesional','luminosidad','calefaccion','terraza','fot','detalleedificio','detalleambientes','liantiguedad','lilavadero','liamoblado','libaulera','limascotas','lipmovreducida');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }
      
       $estilo('numerodelote').display='block';
       $estilo('lbnumerodelote').display='block';

  }
  //PISO OFICINA LOCAL 
  if ($Bid('tipo').value == 7 || $Bid('tipo').value == 10 || $Bid('tipo').value == 5 ){
       var camposb = new Array ('piscina','jardin','fot','balcon','lilavadero','liamoblado','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 	 
  }
  //DEPARTAMENTO
  if ($Bid('tipo').value == 7 || $Bid('tipo').value == 10 || $Bid('tipo').value == 5 || $Bid('tipo').value == 2){
       var camposb = new Array ('piscina','jardin','fot');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  
  //CABAÑA
  if ($Bid('tipo').value == 22 ){
  	   var camposb = new Array (
                     'dependencia','detallepiso','ubicplanta','balcon',
					 'aptoprofesional','luminosidad','terraza','seguridad','fot','detalleedificio','lilavadero','liamoblado','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  
  if ($Bid('tipo').value == 34 ){
  	   var camposb = new Array ('lidormitorios','ligarage','liestado','superficiel','lisuperficiec','tamanolote','banos','toilette','piscina',
                     'jardin','orientacion','patio','liambientes','dependencia','detallepiso','ubicplanta','balcon','liantiguedad',
					 'aptoprofesional','luminosidad','calefaccion','seguridad','liaptobanco','terraza','fot','detalleedificio','detalleambientes',
					 'lilavadero','liamoblado','libaulera','limascotas','lipmovreducida');
 
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  
  
}

function verActualizar(){
 
 var campos = new Array ('lidormitorios','ligarage','liestado','superficiel','lisuperficiec','tamanolote','banos','toilette','piscina',
                     'jardin','orientacion','patio','liambientes','dependencia','ubicplanta','balcon','liantiguedad',
					 		'aptoprofesional','luminosidad','calefaccion','seguridad','liaptobanco','terraza','fot','detalleedificio','detalleambientes',
					 		'lilavadero','liamoblado','libaulera','limascotas','lipmovreducida');
 
 for (x=0;x<campos.length;x++){
    $estilo(campos[x]).display='block'; 
 }

 
  
  if ($Bid('operacion').value == 2){
  	 $estilo('camas').display='block';
	 $estilo('ocupantes').display='block';
  }else{
   $estilo('camas').display='none';
	 $estilo('ocupantes').display='none';
  }
  
   
 
  //CASA
  if ($Bid('tipo').value == 1){       
	   var camposb = new Array ('dependencia','ubicplanta','seguridad','detalleedificio','detalleambientes','balcon','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }  
       
        
                        
  }  
 
 //COCHERA GALPON BODEGA
  if ($Bid('tipo').value == 11 || $Bid('tipo').value == 15 || $Bid('tipo').value == 19){       
	   var camposb = new Array ('lidormitorios','ligarage','liestado','banos','toilette','piscina','balcon',
                     'jardin','orientacion','patio','liambientes','dependencia','ubicplanta',
					 'aptoprofesional','luminosidad','calefaccion','seguridad','terraza','fot','detalleedificio','detalleambientes','lilavadero','liamoblado','libaulera','libaulera','limascotas');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }
        
  }  
  
  //TERRENO CAMPO LOTE
  if ($Bid('tipo').value == 6 || $Bid('tipo').value == 9 || $Bid('tipo').value == 12 || $Bid('tipo').value == 32){
       var camposb = new Array ('lidormitorios','ligarage','liestado','banos','toilette','piscina','balcon',
                     'jardin','patio','liambientes','dependencia','ubicplanta',
					 'aptoprofesional','luminosidad','calefaccion','terraza','fot','detalleedificio','detalleambientes','liantiguedad','lilavadero','liamoblado','libaulera','limascotas');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }
     
  }
  //PISO OFICINA LOCAL 
  if ($Bid('tipo').value == 7 || $Bid('tipo').value == 10 || $Bid('tipo').value == 5 ){
       var camposb = new Array ('piscina','jardin','fot','balcon','lilavadero','liamoblado','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 	 
  }
  //DEPARTAMENTO
  if ($Bid('tipo').value == 7 || $Bid('tipo').value == 10 || $Bid('tipo').value == 5 || $Bid('tipo').value == 2){
       var camposb = new Array ('piscina','jardin','fot');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  
  //CABAÑA
  if ($Bid('tipo').value == 22 ){
  	   var camposb = new Array (
                     'dependencia','ubicplanta','balcon',
					 'aptoprofesional','luminosidad','terraza','seguridad','fot','detalleedificio','lilavadero','liamoblado','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  
  if ($Bid('tipo').value == 34 ){
  	   var camposb = new Array ('lidormitorios','ligarage','liestado','superficiel','lisuperficiec','tamanolote','banos','toilette','piscina',
                     'jardin','orientacion','patio','liambientes','dependencia','ubicplanta','balcon','liantiguedad',
					 'aptoprofesional','luminosidad','calefaccion','seguridad','liaptobanco','terraza','fot','detalleedificio','detalleambientes',
					 'lilavadero','liamoblado','libaulera');
 
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  
  
}

function verdetallesficha(operacion,tipo){

 var campos = new Array ('lidormitorios','ligarage','liestado','superficiel','lisuperficiec','tamanolote','banos','toilette','piscina',
                     'jardin','orientacion','patio','liambientes','dependencia','ubicplanta','balcon','liantiguedad',
					 		'aptoprofesional','luminosidad','calefaccion','seguridad','liaptobanco','terraza','fot','detalleedificio',
					 		'lilavadero','liamoblado','libaulera','limascotas','lipmovreducida');
 
 for (x=0;x<campos.length;x++){
    $estilo(campos[x]).display='block'; 
 }

 
  
  if (operacion == 2){
  	 $estilo('camas').display='block';
	 $estilo('ocupantes').display='block';
  }else{
   $estilo('camas').display='none';
	 $estilo('ocupantes').display='none';
  }
  
   
 
  //CASA
  if (tipo == 1){       
	   var camposb = new Array ('dependencia','ubicplanta','seguridad','detalleedificio','balcon','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }  
       
        
                        
  }  
 
 //COCHERA GALPON BODEGA
  if (tipo == 11 || tipo == 15 || tipo == 19){       
	   var camposb = new Array ('lidormitorios','ligarage','liestado','banos','toilette','piscina','balcon',
                     'jardin','orientacion','patio','liambientes','dependencia','ubicplanta',
					 'aptoprofesional','luminosidad','calefaccion','seguridad','terraza','fot','detalleedificio','lilavadero','liamoblado','libaulera','lipmovreducida');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }
        
  }  
  
  //TERRENO CAMPO LOTE
  if (tipo == 6 || tipo == 9 || tipo == 12 || tipo == 32){
       var camposb = new Array ('lidormitorios','ligarage','liestado','banos','toilette','piscina','balcon',
                     'jardin','patio','liambientes','dependencia','ubicplanta',
					 'aptoprofesional','luminosidad','calefaccion','terraza','fot','detalleedificio','liantiguedad','lilavadero','liamoblado','libaulera','limascotas','lipmovreducida');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       }
     
  }
  //PISO OFICINA LOCAL 
  if (tipo == 7 || tipo == 10 || tipo == 5 ){
       var camposb = new Array ('piscina','jardin','fot','balcon','lilavadero','liamoblado','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 	 
  }
  //DEPARTAMENTO
  if (tipo == 7 || tipo == 10 || tipo == 5 || tipo == 2){
       var camposb = new Array ('piscina','jardin','fot');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  
  //CABAÑA
  if (tipo == 22 ){
  	   var camposb = new Array (
                     'dependencia','ubicplanta','balcon',
					 'aptoprofesional','luminosidad','terraza','seguridad','fot','detalleedificio','lilavadero','liamoblado','libaulera');
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  
  if (tipo == 34 ){
  	   var camposb = new Array ('lidormitorios','ligarage','liestado','superficiel','lisuperficiec','tamanolote','banos','toilette','piscina',
                     'jardin','orientacion','patio','liambientes','dependencia','ubicplanta','balcon','liantiguedad',
					 'aptoprofesional','luminosidad','calefaccion','seguridad','liaptobanco','terraza','fot','detalleedificio',
					 'lilavadero','liamoblado','libaulera','limascotas','lipmovreducida');
 
       for (x=0;x<camposb.length;x++){
          $estilo(camposb[x]).display='none'; 
       } 
  }
  

}

function validarubicacion(){
  var error = '';
  
  if ($("#sobre").val().length < 1){
	  error += "Complete la calle en la dirección\n";
  }

  if ($("#calle1").val().length < 1){
	  error += "Complete entre que calle es la dirección\n";
  }
  
  if ($("#x").val().length < 2){
	  error += "Marque la ubicacion en el mapa\n";
  }
  
    //LAPLATA partido68
  if ($("#partido_id").val() == 68){
  
  	if ($("#localidad_id").val() == 23244){
  		if (($("#sobre").val() > 72 && $("#sobre").val() < 115) || $("#sobre").val() > 122){
  			error += "Por favor seleccione correctamente la localidad\n";
  		} 
  	}
  	
  }
 

  
   if ($("#localidad_id").val() < 1 && $("#partido_id").val() != 516){
	  error += "Seleccione la localidad\n";
  }
  
  if ($("#partido_id").val() == 516 && $("#barrio_id").val() == 0){
	  error += "Cargue el barrio\n";
  }
  
  if (error.length > 1){
  	alert(error);
	return false;
  }else return true;
}


function validaractualizacion(){
  var error = '';

 if ($("#aptobanco").val() == -1){
	  error += "Complete en Caracteristicas si es apto banco\n";
  }
  
  //DEPARTAMENTO
  if ($gid('tipo').value == 7 || $gid('tipo').value == 2){
     if ($("#dormitorios").val() == -1){
	  error += "Complete en Caracteristicas la cantidad de dormitorios\n";
	 }
	 if ($("#antiguedad").val() == -1){
	  error += "Complete en Caracteristicas la antiguedad\n";
	 }
	 if ($("#garage").val() == -1){
	  error += "Complete en Caracteristicas el campo Garage\n";
	 }
	 if ($("#estado").val() == -1){
	  error += "Complete en Caracteristicas el campo estado contrucción\n";
	 }
	 if ($("#superficiecv").val() < 10){
	  error += "Complete en Caracteristicas la  Superficie Construida\n";
     }
     
    if ($("#partido_id").val() == 68){ 
	    if ($("#estado").val() == 1 || $("#estado").val() == 9 || $("#estado").val() == 11){
	 			 if ($("#precio").val() < 10000 && $("#moneda").val() == 0 && $gid('operacion').value == 1 ){
	 			 	error += "Complete el precio final de la propiedad, no el adelanto y las cuotas\n";
	 			 }
	 			
	 			 if ($("#precio").val() < 300000 && $("#moneda").val() == 1 && $gid('operacion').value == 1){
	 			 	error += "Complete el precio final de la propiedad, no el adelanto y las cuotas\n";
	 			 }
	    }
    }
	 	 
  }  
  
  //CASA
  if ($gid('tipo').value == 1){
     if ($("#dormitorios").val() == -1){
	  error += "Complete en Caracteristicas la cantidad de dormitorios\n";
	 }
	 if ($("#antiguedad").val() == -1){
	  error += "Complete en Caracteristicas la antiguedad\n";
	 }
	 if ($("#garage").val() == -1){
	  error += "Complete en Caracteristicas el campo Garage\n";
	 }
	 if ($("#estado").val() == -1){
	  error += "Complete en Caracteristicas el campo estado contrucción\n";
	 }
	 if ($("#superficiecv").val() < 10){
	  error += "Complete en Caracteristicas la  Superficie Construida\n";
     }
     if ($("#partido_id").val() == 68){ 
	     if ($("#estado").val() == 1 || $("#estado").val() == 9 || $("#estado").val() == 11){
	 			 if ($("#precio").val() < 30000 && $("#moneda").val() == 0 && $gid('operacion').value == 1){
	 			 	error += "Complete el precio final de la propiedad, no el adelanto más las cuotas\n";
	 			 }
	 			
	 			 if ($("#precio").val() < 600000 && $("#moneda").val() == 1 && $gid('operacion').value == 1){
	 			 	error += "Complete el precio final de la propiedad, no el adelanto más las cuotas\n";
	 			 }
	     }
     }
  } 
  

 if ($("#precio").val().length < 3){
   error += "El precio no puede estar vacio, luego puede ocultarlo al público\n";
 }
 
  $estilo('botonenviar').display='none';
  $estilo('enviando').display='block';

   
  if (error.length > 1){
    $estilo('botonenviar').display='block';
 	$estilo('enviando').display='none';
 		alert(error);
	return false;
  }else return true;
}

function validarAlta(){
  var error = '';
  
  if ($("#sobre").val().length < 1){
	  error += "Complete la calle en la dirección\n";
  }

  if ($("#calle1").val().length < 1){
	  error += "Complete entre que calle es la dirección\n";
  }
  
  if ($("#aptobanco").val() == -1){
	  error += "Complete en Caracteristicas si es apto banco\n";
  }

  if ($("#partido_id").val() == 68 && $("#x").val().length < 2){
	  error += "Marque la ubicación en el mapa\n";
  }
  
  //LAPLATA partido68
  if ($("#partido_id").val() == 68){
  
  	if ($("#localidad_id").val() == 23244){
  		if ($("#sobre").val() > 122){
  			error += "Por favor seleccione correctamente la localidad\n";
  		} 
  	}
  	
  }
 
  
  if ($("#partido_id").val() == 516 && $("#x").val().length < 2){
	  error += "Marque la ubicación en el mapa\n";
  }
  
   if ($("#localidad_id").val() < 1 && $("#partido_id").val() != 516){
	  error += "Seleccione la localidad\n";
  }
  
  if ($("#partido_id").val() == 516 && $("#barrio_id").val() == 0){
	  error += "Cargue el barrio\n";
  }
  
  //DEPARTAMENTO
  if ($gid('tipo').value == 7 || $gid('tipo').value == 2){
     if ($("#dormitorios").val() == -1){
	  error += "Complete en Caracteristicas la cantidad de dormitorios\n";
	 }
	 if ($("#antiguedad").val() == -1){
	  error += "Complete en Caracteristicas la antiguedad\n";
	 }
	 if ($("#garage").val() == -1){
	  error += "Complete en Caracteristicas el campo Garage\n";
	 }
	 if ($("#estado").val() == -1){
	  error += "Complete en Caracteristicas el campo estado contrucción\n";
	 }
	 if ($("#superficiecv").val() < 10){
	  error += "Complete en Caracteristicas la  Superficie Construida\n";
     }
     
    if ($("#partido_id").val() == 68){ 
	    if ($("#estado").val() == 1 || $("#estado").val() == 9 || $("#estado").val() == 11){
	 			 if ($("#precio").val() < 30000 && $("#moneda").val() == 0 && $gid('operacion').value == 1 ){
	 			 	error += "Complete el precio final de la propiedad, no el adelanto y las cuotas\n";
	 			 }
	 			
	 			 if ($("#precio").val() < 600000 && $("#moneda").val() == 1 && $gid('operacion').value == 1){
	 			 	error += "Complete el precio final de la propiedad, no el adelanto y las cuotas\n";
	 			 }
	    }
    }
	 
	 
  }  
  //CASA
  if ($gid('tipo').value == 1){
     if ($("#dormitorios").val() == -1){
	  error += "Complete en Caracteristicas la cantidad de dormitorios\n";
	 }
	 if ($("#antiguedad").val() == -1){
	  error += "Complete en Caracteristicas la antiguedad\n";
	 }
	 if ($("#garage").val() == -1){
	  error += "Complete en Caracteristicas el campo Garage\n";
	 }
	 if ($("#estado").val() == -1){
	  error += "Complete en Caracteristicas el campo estado contrucción\n";
	 }
	 if ($("#superficiecv").val() < 10){
	  error += "Complete en Caracteristicas la  Superficie Construida\n";
     }
     if ($("#partido_id").val() == 68){ 
     if ($("#estado").val() == 1 || $("#estado").val() == 9 || $("#estado").val() == 11){
 			 if ($("#precio").val() < 10000 && $("#moneda").val() == 0 && $gid('operacion').value == 1){
 			 	error += "Complete el precio final de la propiedad, no el adelanto más las cuotas\n";
 			 }
 			
 			 if ($("#precio").val() < 200000 && $("#moneda").val() == 1 && $gid('operacion').value == 1){
 			 	error += "Complete el precio final de la propiedad, no el adelanto más las cuotas\n";
 			 }
     }
     }
  } 
  

 if ($("#precio").val().length < 3){
   error += "El precio no puede estar vacio, luego puede ocultarlo al público\n";
 }
 
  $estilo('botonenviar').display='none';
  $estilo('enviando').display='block';

   
  if (error.length > 1){
    $estilo('botonenviar').display='block';
 	$estilo('enviando').display='none';
  	alert(error);
	return false;
  }else return true;
}

function validarAltaSIOC(){
  var error = '';
  
  if ($("#sobre").val().length < 1){
	  error += "Complete la calle en la dirección\n";
  }

  if ($("#calle1").val().length < 1){
	  error += "Complete entre que calle es la dirección\n";
  }
  
  if ($("#aptobanco").val() == -1){
	  error += "Complete en Caracteristicas si es apto banco\n";
  }

  if ($("#ciudad").val() == 432 && $("#x").val() == 0){
	  error += "Marque la ubicación en el mapa\n";
  }
  
  //DEPARTAMENTO
  if ($gid('tipo').value == 7 || $gid('tipo').value == 5 || $gid('tipo').value == 2){
   if ($("#superficiel").val().length < 1){
   error += "La superficie no puede estar vacia\n";
 }
     if ($("#dormitorios").val() == -1){
	  error += "Complete en Caracteristicas la cantidad de dormitorios\n";
	 }
	 if ($("#antiguedad").val() == -1){
	  error += "Complete en Caracteristicas la antiguedad\n";
	 }
	 if ($("#garage").val() == -1){
	  error += "Complete en Caracteristicas el campo Garage\n";
	 }
	 if ($("#estado").val() == -1){
	  error += "Complete en Caracteristicas el campo estado contrucción\n";
	 }
	 if ($("#superficiecv").val() < 10){
	  error += "Complete en Caracteristicas la  Superficie Construida\n";
     }
	 
	 
  }  
  //CASA
  if ($gid('tipo').value == 1){
   if ($("#superficiel").val().length < 1){
   error += "La superficie no puede estar vacia\n";
 }
     if ($("#dormitorios").val() == -1){
	  error += "Complete en Caracteristicas la cantidad de dormitorios\n";
	 }
	 if ($("#antiguedad").val() == -1){
	  error += "Complete en Caracteristicas la antiguedad\n";
	 }
	 if ($("#garage").val() == -1){
	  error += "Complete en Caracteristicas el campo Garage\n";
	 }
	 if ($("#estado").val() == -1){
	  error += "Complete en Caracteristicas el campo estado contrucción\n";
	 }
	 if ($("#superficiecv").val() < 10){
	  error += "Complete en Caracteristicas la  Superficie Construida\n";
     }
  } 
  

 if ($("#precio").val().length < 3){
   error += "El precio no puede estar vacio, luego puede ocultarlo al público\n";
 }

   if ($("#descripcion").val().length < 3){
   error += "La descripción no puede estar vacia\n";
 }

   
  if (error.length > 1){
  	alert(error);
	return false;
  }else return true;
}


function CartelPrecio(){
  if ($("#precio").val() > 10){
	  $estilo("cartelPrecio").display='none'; 
  }else{
	 $estilo("cartelPrecio").display='block'; 
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function minuscula(campo){
  campo.value = campo.value.toLowerCase();
  if ( campo.value.indexOf("www") != -1 ){ 
     alert('Sin direcciones web por favor');
	 campo.value = '';
  }
  if ( campo.value.indexOf("@") != -1 ){ 
     alert('Sin emails por favor');
	 campo.value = '';
  }


}

var nav4 = window.Event ? true : false;
function acceptNum(evt){ 
// NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57 
var key = nav4 ? evt.which : evt.keyCode; 
return (key <= 13 || (key >= 48 && key <= 57));
}

function acceptarNumeroPuerta(id){
  var permitido=new Array("s","n","k","m","0","1","2","3","4","5","6","7","8","9","/"," ","º","a","b","c","d","e","f","g","p");
  var nombre = $gid(id).value;
  var nombreFinal = '';
  var anterior='';

  
  for(var x=0; x<(nombre.length); x++){    
	valido = false; 
	letra = nombre.substring(x,x+1).toLowerCase();	
	for(var i=0; i<(permitido.length); i++){

      if(letra==permitido[i]){
        valido = true;

		  break;
      }

    }
    if (valido) nombreFinal +=letra;
  }

  if ( nombreFinal.indexOf("nn") != -1 )    nombreFinal = '';
  if ( nombreFinal.indexOf("apto") != -1 )    nombreFinal = '';
  if ( nombreFinal.indexOf("banco") != -1 )    nombreFinal = '';
  if ( nombreFinal.indexOf("ss") != -1 )    nombreFinal = '';
  if ( nombreFinal.indexOf("//") != -1 )    nombreFinal = '';
 $gid(id).value = nombreFinal;
}

function setOption(form, index) {
  for (var i = 0; i <= 6; i++) {
  // form.preciopor.options[i].text = "";
  //  form.preciopor.options[i].value = "";
  }
  $('#precio1').html('&nbsp; Precio');
  $('#precio2').css( "display", "none" );
  $('#precio2detalle').css( "display", "none" );
  
    if (index == 5){
    $('#precio1').html('&nbsp; Precio Venta');	
	 $('#precio2').css( "display", "none" );
	 $('#precio2detalle').css( "display", "none" );
  }
  
  if ($Bid('operacion').value == 2){
  	 $estilo('camas').display='block';
	 $estilo('ocupantes').display='block';
  }else{
   $estilo('camas').display='none';
	 $estilo('ocupantes').display='none';
  }
  
  if (index == 0 || index == 2){
  	form.preciopor.options[0].text = "x Mes";
  	form.preciopor.options[0].value = "0";
  	form.preciopor.options[1].text = "x Quincena";
  	form.preciopor.options[1].value = "1";
  	form.preciopor.options[2].text = "x Semana";
  	form.preciopor.options[2].value = "2";
  	form.preciopor.options[3].text = "x Día";
  	form.preciopor.options[3].value = "3";
	form.preciopor.options[4].text = "-";
  	form.preciopor.options[4].value = "4";
	form.preciopor.options[5].text = "-";
  	form.preciopor.options[5].value = "5";
	form.preciopor.options[6].text = "-";
  	form.preciopor.options[6].value = "6";
	form.preciopor.selectedIndex = 0;
  }else{
    form.preciopor.options[0].text = "Total";
  	form.preciopor.options[0].value = "0";
  	form.preciopor.options[1].text = "x Hectarea";
  	form.preciopor.options[1].value = "1";
  	form.preciopor.options[2].text = "el m²";
  	form.preciopor.options[2].value = "2";
	form.preciopor.options[3].text = "Libre de todo gasto";
  	form.preciopor.options[3].value = "3";
	form.preciopor.options[4].text = "Libre de gastos de escritura";
  	form.preciopor.options[4].value = "4";
	form.preciopor.options[5].text = "Escritura según ley";
  	form.preciopor.options[5].value = "5";
	form.preciopor.options[6].text = "Más Honorarios";
  	form.preciopor.options[6].value = "6";
	form.preciopor.selectedIndex = 3;
  } 
  

  

}

function mostrar(id){

 estado = document.getElementById(id).style.display;
 if (estado == 'none') document.getElementById(id).style.display='block';
                 else  document.getElementById(id).style.display='none';

}
