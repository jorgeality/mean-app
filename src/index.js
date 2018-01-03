const express = require ('express');
const app = express();

//configuraciones
/*process.env.PORT || 3000 = si hay un puerto en el sistema operativo usenlo si no utilizen el 3000 */
app.set('port', process.env.PORT || 3000)

//en este punto empezaremos a renderizar por pantalla.
//require('ejs').renderFile es lo que nos va a permitir renderizar html o poder enviar al cliente o al navegador html.
app.engine('html', require('ejs').renderFile);
/*y para poder usar el app.engine debemos configurarlo y lo hacemos como se ve aqui abajo*/
app.set('view engine', 'ejs');



/*app.get('port') = a decir 3000 como  el ejemplo de ahi abajo, o el puerto que este disponible en el sistema operativo*/ 
app.listen(app.get('port'),() => {

    console.log('server on port', app.get('port'))

});
/*con app.listen estamos diciendo que queremos que nuestro servidor se vea reflejado en el puerto 3000 */
/*app.listen(3000,() => {

    console.log('hola mundo!!')

});*/