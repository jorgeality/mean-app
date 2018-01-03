const router = require('express').Router();

//esto no basta solo requrirlo sino usarlo tambien 
const mongojs = require('mongojs');
//y lo usamos al ejecutarlo , le pasamos el nombre de la base de datos, y el nombre dela coleccion que vamos a usar
const db = mongojs('mean-db', ['tasks']);
//una vez ya habiendo hecho esto  ya podemos usar nuestra db.
/**
 * no esta demas decir que cuando pasamos un nombre nomas, lo toma como una base de datos local, si tenemos alguna db
 * en algun servicio web, le pasamos la url donde esta almcenada. 
 */




/**
 * no esta de mas decir que en esta parte es donde se van a hacer todas esas operaciones (post, put, delete), 
 * mostrar o ingresar datos (post)
 * actualizar datos (put)
 * eliminar datos(delete) 
 * para ello debemos hacer la conexion con mongodb. con el conector mongojs que ya hemos instalado con anterioridad
 * y que sepuede ver en el package.json
 */
router.get('/tasks', (req, res, next) => {
   //res.send('API HERE'); esto es un ejemplo que nos muetsra que realmente hemos entrado en esta ruta.
   /**
    *con lo que esta abajo estamos haciendo lo sgt.
    le estamos pidiendo que una vez haga la busqueda con la db y la respectiva coleccion.
    puede hacer dos cosas, o mandarnos un error o mandarnos los datos encontrados en esa collection o en este caso 
    las tareas qu estan en la collection tasks 
    */ 
    //esto nos ayudara a retornar todas las tareas que tengamos en nuestra db
    db.tasks.find((err, tasks) => {
        /**
         * si nos devuelve un error lo vamos a mandar a un manejador de error de express
         */
        if(err) return next(err);

        /***
         * si no sale ningun error respondemos al nvegador con un json que tiene el arreglo de tareas retornado
         */
        res.json(tasks);
        /**
         * eso retornara en primera instancia un arreglo vacio, ya qu ela db no existe. o si hay la db pero no hay datos
         * en el. y es la prueba de qu estamso conectados a mongodb
         */
    });

});


module.exports = router;
