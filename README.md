# API REST (ASTR) 

El proyecto desarrollado en Angular consume la API de esta carpeta, por lo que es pertinente que esté en funcionamiento este servicio antes de correr el proyecto ASTR para su buen funcionamiento. En este apartado se encuentra toda la lógica o el back-end, conexión a base de datos, sentencias sql entre otros, por lo que todos los datos del proyecto no se mostraran en la aplicación sin haber configurado la API primero.

## Prerequisitos
Como primera medida debe instalar node.js dirigiéndose al apartado `https://nodejs.org/es/` y descargar la versión actual para el buen funcionamiento de la API e instalarlo.

## Importando la API

Una vez descargado la API, elija el editor de texto de su preferencia, nosotros recomendamos visual studio code por hechos de contener una terminal que facilita el correr los comando sin tener que ir a la consola del sistema operativo. Una vez abierto vaya a la esquina superior izquierda en el apartado de "file" o "archivo" escogiendo la opcion "open folder" y busque el apartado donde guardo la el proyecto, seleccione la carpeta con nombre **NODE**.

## Ejecutando el proyecto
Sitúese en la terminal, si no encuentra una en el editor de texto vaya al apartado superior en la opción terminal y seleccione la opción "nueva terminal". Ya la haya localizado, asegúrese la ruta de la consola sea la correcta de acuerdo donde haya guardado el proyecto, esta última debe terminar en ASTR `C:\Usuarios\tuUsuario\..\...\...\node>`.
Ahora bien, digite el siguiente comando en la consola `npm run dev` esto inicializará la conexión con la bd y el puerto de escucha del servidor.

Deberá aparecer las siguiente líneas para corroborar el buen funcionamiento):

	[nodemon] 2.0.15
	[nodemon] to restart at any time, enter `rs`
	[nodemon] watching path(s): *.*
	[nodemon] watching extensions: js,mjs,json
	[nodemon] starting `node api/index.js`
	api started
	Connected!

Muy importante aparezca la línea api started la cual nos indica inicio sin ningún inconveniente, lo mismo la línea Connected! dado esta nos informa que hizo la conexión a la base de datos sin ningún problema.
