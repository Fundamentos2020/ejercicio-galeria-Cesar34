
document.querySelector('#generar-img').addEventListener('submit', cargarImg);

// Llamado a Ajax e imprimir resultados
function cargarImg(e) {
     e.preventDefault();

     // Leer las variables

     const cantidad = document.getElementById('numero').value;
     
     let url = '';
     url += 'https://picsum.photos/v2/list/?';
     // Si hay una cantidad agregarlo a la URL
     if(cantidad !== '') {
          url += `page=1&limit=${cantidad}`;
     }
     
     // Conectar con ajax
     // Iniciar XMLHTTPRequest
     const xhr = new XMLHttpRequest();
     // Abrimos la conexion
     xhr.open('GET', url, true);
     // Datos e impresion del template
     xhr.onload = function() {
          if(this.status === 200) {
               const img = JSON.parse( this.responseText ) ;
               
               var info =  new Array();
               img.forEach(function(img) 
               {
               		info.push(img.download_url);	               
               })
               
               // Generar el HTML
               let htmlImg = '<h2>Imagenes Generadas</h2>';
               htmlImg += '<ul>';
			   var num = 1;
			   var pag = 100/cantidad;
               // Imprimir cada nombre
               for(num; num <= pag; num++)
               {
                    htmlImg += `
                    <li><a href=${info[num]} target="_black" >${num}</a></li>
            	    `;   
               }
       
               htmlImg += '</ul>';

               document.getElementById('paginacion').innerHTML = htmlImg;
               

          }
     }
     // Enviar el Request
     xhr.send();

}