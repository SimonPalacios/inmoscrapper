
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

function AgregarFavorito(url, id){
var contenido, preloader;

contenido = document.getElementById(id);
contenido.innerHTML = '<img src="https://www.inmobusqueda.com.ar/images/indicator.gif" alt="cargando" width="16" height="16" />';
ajax=NuevoAjax();
ajax.open("GET", url,true);
ajax.onreadystatechange=function(){
	if(ajax.readyState==1){
		contenido.innerHTML = '<img src="https://www.inmobusqueda.com.ar/images/indicator.gif" alt="cargando" width="16" height="16" />';
	}else if(ajax.readyState==4){
		if(ajax.status==200){
			contenido.innerHTML = ajax.responseText;			
		}else if(ajax.status==404){
			contenido.innerHTML = "La página no existe";
		}else{
			contenido.innerHTML = "Error:".ajax.status;
		}
	}
}
ajax.send(null);

}

function ComboCiudad(url, contenido){
var contenido;

    contenido = document.getElementById(contenido);
    ajax=NuevoAjax();
	ajax.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.ciudad.php?id='+url,true);
	ajax.onreadystatechange=function(){
	   if(ajax.readyState==1){
		   contenido.innerHTML = "Cargando ciudad...";
	   }else if(ajax.readyState==4){
		   if(ajax.status==200) contenido.innerHTML = ajax.responseText;						
		                   else contenido.innerHTML = "Error:".ajax.status;		   
	   }
    }
    ajax.send(null);
} 

function ComboCiudadHome(url, contenido){
var contenido;

    contenido = document.getElementById(contenido);
    ajax=NuevoAjax();
	ajax.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.ciudad.home.php?id='+url,true);
	ajax.onreadystatechange=function(){
	   if(ajax.readyState==1){
		   contenido.innerHTML = "Cargando ciudad...";
	   }else if(ajax.readyState==4){
		   if(ajax.status==200) contenido.innerHTML = ajax.responseText;						
		                   else contenido.innerHTML = "Error:".ajax.status;		   
	   }
    }
    ajax.send(null);
}

function ComboCiudadHomeIB(id){
var contenido;

    contenido = document.getElementById('comboCiudad');
    operacion = document.getElementById('operacion').value;
    tipo = document.getElementById('tipo').value;
    ajax=NuevoAjax();
	ajax.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.ciudad.home.php?home=1&id='+id+'&op='+operacion+'&tipo='+tipo+'&aleatorio='+Math.random(),true);
	ajax.onreadystatechange=function(){
	   if(ajax.readyState==1){
		   contenido.innerHTML = "Cargando ciudad...";
	   }else if(ajax.readyState==4){
		   if(ajax.status==200) contenido.innerHTML = ajax.responseText;						
		                   else contenido.innerHTML = "Error:".ajax.status;		   
	   }
    }
    ajax.send(null);
}


function ComboPrecio(valor){
    
	desde = document.getElementById('boxdesde');
    ajax1=NuevoAjax();
	ajax1.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.desde.php?id='+valor,true);
	ajax1.onreadystatechange=function(){
	   if(ajax1.readyState==1){
		   desde.innerHTML = "Cargando ...";
	   }else if(ajax1.readyState==4){
		   if(ajax1.status==200) desde.innerHTML = ajax1.responseText;						
		                   else desde.innerHTML = "Error:".ajax1.status;		   
	   }
    }
    ajax1.send(null);
	
	hasta = document.getElementById('boxhasta');
	ajax=NuevoAjax();
	ajax.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.hasta.php?id='+valor,true);
	ajax.onreadystatechange=function(){
	   if(ajax.readyState==1){
		   hasta.innerHTML = "Cargando ...";
	   }else if(ajax.readyState==4){
		   if(ajax.status==200) hasta.innerHTML = ajax.responseText;						
		                   else hasta.innerHTML = "Error:".ajax.status;		   
	   }
    }
    ajax.send(null);

}

 function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;

      }

function ComboPrecioyCiudadNuevo(valor){

    operacion = document.getElementById('operacion').value;
    
    if (operacion == 0){
       document.getElementById('moneda').selectedIndex = 0;
       document.getElementById('desde').value = "0";
       document.getElementById('hasta').value = "100.000";
    }else{
    	 document.getElementById('moneda').selectedIndex = 1;
    	 document.getElementById('desde').value = "0";
       document.getElementById('hasta').value = "10.000.000";
    }

    provid = document.getElementById('provincia').value;
    contenido = document.getElementById('comboCiudad');

    tipo = document.getElementById('tipo').value;
    ajax2=NuevoAjax();
	ajax2.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.ciudad.home.php?home=1&id='+provid+'&op='+operacion+'&tipo='+tipo+"&aleatorio="+Math.random(),true);
	ajax2.onreadystatechange=function(){
	   if(ajax2.readyState==1){
		   contenido.innerHTML = "Cargando ciudad...";
	   }else if(ajax2.readyState==4){
		   if(ajax2.status==200) contenido.innerHTML = ajax2.responseText;						
		                   else contenido.innerHTML = "Error:".ajax.status;		   
	   }
    }
    ajax2.send(null);

}

function ComboPrecioyCiudad(valor){

    
	desde = document.getElementById('boxdesde');
    ajax1=NuevoAjax();
	ajax1.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.desde.php?id='+valor,true);
	ajax1.onreadystatechange=function(){
	   if(ajax1.readyState==1){
		   desde.innerHTML = "Cargando ...";
	   }else if(ajax1.readyState==4){
		   if(ajax1.status==200) desde.innerHTML = ajax1.responseText;						
		                   else desde.innerHTML = "Error:".ajax1.status;		   
	   }
    }
    ajax1.send(null);
	
	hasta = document.getElementById('boxhasta');
	ajax=NuevoAjax();
	ajax.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.hasta.php?id='+valor,true);
	ajax.onreadystatechange=function(){
	   if(ajax.readyState==1){
		   hasta.innerHTML = "Cargando ...";
	   }else if(ajax.readyState==4){
		   if(ajax.status==200) hasta.innerHTML = ajax.responseText;						
		                   else hasta.innerHTML = "Error:".ajax.status;		   
	   }
    }
    ajax.send(null);

    provid = document.getElementById('provincia').value;
    contenido = document.getElementById('comboCiudad');
    operacion = document.getElementById('operacion').value;
    tipo = document.getElementById('tipo').value;
    ajax2=NuevoAjax();
	ajax2.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.ciudad.home.php?home=1&id='+provid+'&op='+operacion+'&tipo='+tipo+"&aleatorio="+Math.random(),true);
	ajax2.onreadystatechange=function(){
	   if(ajax2.readyState==1){
		   contenido.innerHTML = "Cargando ciudad...";
	   }else if(ajax2.readyState==4){
		   if(ajax2.status==200) contenido.innerHTML = ajax2.responseText;						
		                   else contenido.innerHTML = "Error:".ajax.status;		   
	   }
    }
    ajax2.send(null);

}

function ComboDormitorios(valor){

    texto = document.getElementById('masopcionestext');
    desde = document.getElementById('dorm');
    hasta = document.getElementById('dorm2');

	ajax=NuevoAjax();
	ajax.open("GET", 'https://www.inmobusqueda.com.ar/config/combo.dormitorios.php?id='+valor,true);
	ajax.onreadystatechange=function(){
	   if(ajax.readyState==1){

	   }else if(ajax.readyState==4){
		   if(ajax.status==200){
               if (ajax.responseText==0){
                    texto.innerHTML='<STRIKE>Dormitorios</STRIKE> : ';
                    desde.disabled=true;
                    hasta.disabled=true;
                    desde.value=0;
                    hasta.value=0;
               }else{
                    texto.innerHTML='Dormitorios : ';
                    desde.disabled=false;
                    hasta.disabled=false;
               }
           }

	   }
    }
    ajax.send(null);
}

/////



///////////////////////////////////////////////////////////////

function $(v) { return(document.getElementById(v)); }
function $S(v) { return($(v).style); }
function agent(v) { return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0)); }
function isset(v) { return((typeof(v)=='undefined' || v.length==0)?false:true); }
function XYwin(v) { var z=agent('msie')?Array(document.body.clientHeight,document.body.clientWidth):Array(window.innerHeight,window.innerWidth); return(isset(v)?z[v]:z); }

function IbTOG() {
    document.onclick=function(){
        $S('IbBG').display='none';
        $S('IbBOX').display='none';
        document.onclick=function(){};
        };
    }
function Cerrar(){
  $S('IbBG').display='none';
  $S('IbBOX').display='none';
}
    
function IbBOX(v,b) {
    setTimeout("IbTOG()",100);
    $S('IbBG').height=document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px';
    $S('IbBG').display='block';
    $('IbBOX').innerHTML=v+'<div class="IbX"><a href="#" onClick="javascript:Cerrar();">( Click para cerrar )</a>'+"<\/div>";
    $S('IbBOX').left=Math.round((XYwin(1)-b)/2)+'px';
    $S('IbBOX').width=b+'px';
    $S('IbBOX').display='block';
}
 
function LoadBox(url,b){

    contenido = $('IbBOX');
	setTimeout("IbTOG()",100); 
	$S('IbBG').height=document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px';
  	$S('IbBG').display='block'; 
  	$S('IbBOX').left=Math.round((XYwin(1)-b)/2)+'px'; 
  	$S('IbBOX').width=b+'px'; 
  	$S('IbBOX').display='block'; 
  
    ajax=NuevoAjax();
	ajax.open("GET", url,true);
	ajax.onreadystatechange=function(){
	   if(ajax.readyState==1){
		    contenido.innerHTML = "Cargando..." + url;
            contenido.style.background = "url('https://www.dedicado1.com/ticket/loading.gif') no-repeat";
	   }else if(ajax.readyState==4){
		   if(ajax.status==200){
			contenido.innerHTML = ajax.responseText +'<div class="IbX" align="center"><a href="#" onClick="javascript:Cerrar();">( Click para cerrar )</a>'+"<\/div>";
			contenido.style.background = '';
		   }else if(ajax.status==404){
			contenido.innerHTML = "La página no existe";
			contenido.style.background = '';
		   }else{
			contenido.innerHTML = "Error:" + ajax.status;
			contenido.style.background = '';
		   }
	   }
    }
    ajax.send(null);
}


/////////////////////////


function mostrar(id){

 estado = document.getElementById(id).style.display;
 if (estado == 'none') document.getElementById(id).style.display='block';
 else  document.getElementById(id).style.display='none';

}

function OcultarDetalles(id,texto){
 estado = document.getElementById(id).style.display;
 if (estado == 'none'){ 
   document.getElementById(id).style.display='block';
   document.getElementById(texto).innerHTML = 'Ocultar Detalles';
 }
 else{  
 document.getElementById(id).style.display='none';
 document.getElementById(texto).innerHTML = 'Mostrar Detalles';
 }
}

function OcultarVideo(id,texto){
 estado = document.getElementById(id).style.display;
 if (estado == 'none'){ 
   document.getElementById(id).style.display='block';
   document.getElementById(texto).innerHTML = 'Ocultar Video';
 }
 else{  
 document.getElementById(id).style.display='none';
 document.getElementById(texto).innerHTML = 'Mostrar Video';
 }
}



//////////////////////////

var submitcount=0;



function check() {
    var error;
	error = '';
    tempt=document.form.nombre.value;
    if ((tempt.length<1)) {
	  error+="Complete su nombre completo antes de enviar\n";	  
	}   
	errorenmail = false;
	email=document.form.email.value;
	if ((email.length<1)) {
	  errorenmail = true; 
	}

	filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
	if (filter.test(email)) { 
	}else{
	  errorenmail = true;
	}

   var palabras = new Array ('hotmial','hotmal','htomail','gmial','yahooo','hotmal');

   for (x=0;x<palabras.length;x++){
     if (email.toLowerCase().indexOf(palabras[x].toLowerCase()) != -1 ){
     		errorenmail = true;
  	  }
  }

  if (errorenmail) {
	  error+="Complete correctamente su email antes de enviar\n";	 
	} 

	 tempc=document.form.consulta.value;
	if ((tempc.length<1)) {
	  error+="Complete su consulta antes de enviar\n";	 
	}
	
	if (error.length>0){
	    alert(error);
      return false;	
	}else{
      if (submitcount == 0){
         submitcount++;
      	return true;
   	}else{
      	alert("El formulario fue enviado, aguarde a que se complete el envio.");
      	return false;
   	}
	}




}

function Control(campo){

  campo.value = campo.value.toLowerCase();
  if ( campo.value.indexOf("@") != -1 ){
     alert('No ingrese su dirección de email en el mensaje');
	 campo.value = '';
  }

  if ( campo.value.indexOf("www") != -1 ){
     alert('No ingrese direcciones web en el mensaje');
	 campo.value = '';
  }  
}

function VerMapa(url){
stringa="width=680,height=540,scrollbars=yes,top=5";
var ventana = window.open(url,"InmoBusqueda",stringa);
}
