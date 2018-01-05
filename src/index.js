const cors = require('cors');
const path = require('path');
const express = require ('express');
const app = express();


//indexRoute es una variable que nos trae las rutas que se encuenta en nuestro documento index de nuestra carpeta ruta.
const indexRoute = require('./rutas/index');
const taskRoute = require('./rutas/tasks');


//configuraciones


/**
 * para poder renderizar html, debemos hacer los que esta aca abajo, pero antes que eso debemos usar un modulo de node
 * que se llama path, y lo usamos requiriendolo en la parte de arriba como ahi se ve.
 * 
 * _dirname es lo qeu me hubica en la carpeta de src, pero como lo queremos concatenar a nuestra carpeta de las vistas
 * pasamos una coma (,) y decimos en nombre de la carpeta delas vitas en este caso views, y con esto ahora nuestro servidor
 * sabe donde estan las vistas. y como ya tenemos configurado el ejs solo debemos ir al index.js de las rutas y hacer lo que ahi se dice.
 */
app.set('views', path.join(__dirname, 'views'));


/*process.env.PORT || 3000 = si hay un puerto en el sistema operativo usenlo si no utilizen el 3000 */
app.set('port', process.env.PORT || 3000)

//en este punto empezaremos a renderizar por pantalla.
//require('ejs').renderFile es lo que nos va a permitir renderizar html o poder enviar al cliente o al navegador html.
app.engine('html', require('ejs').renderFile);


/*y para poder usar el app.engine debemos configurarlo y lo hacemos como se ve aqui abajo*/
app.set('view engine', 'ejs');


//middlewares
/**
 * middlewares son funciones que se ejecutan antes de recibir la informacion que me esta enviando en navegador
 * o los clientes.
 */

app.use(cors())

//esto es lo que va a permitir que el servidor de la API pueda entender json
app.use(express.json());

/**
 * 
 */
//esto es lo que nos va a permitir recibir datos de la url
/**
 *esto tambien lo podemos usar para recibir informacion desde los campos del formulario
 ahora por estar configurando un API no lo necesitamos.
 */
app.use(express.urlencoded( { extended : false } ));



//rutas


// de esta manera es como usamos las rutas que se han configurado en nuestro documento index que se encuntra en la carpeta rutas.
//indexRoute es una variable que se ha declarado alla arriba
app.use(indexRoute); ///se ha comentado esta linea ya qu eno queremos que esta vista sea la que aparezca al momento de poner  a correr nuesrto servidor, de igual manera se ha comentaso la variable indexRoute.
app.use('/api', taskRoute);

//static files
//son todos esos archivos que el navegador toma para mostrar por pantalla.
//app.use(express.static(path.join(_dirname,'dist')));



//start server




/*app.get('port') = a decir 3000 como  el ejemplo de ahi abajo, o el puerto que este disponible en el sistema operativo*/ 
app.listen(app.get('port'),() => {

    console.log('server on port', app.get('port'))

});
/*con app.listen estamos diciendo que queremos que nuestro servidor se vea reflejado en el puerto 3000 */
/*app.listen(3000,() => {

    console.log('hola mundo!!')

});*/