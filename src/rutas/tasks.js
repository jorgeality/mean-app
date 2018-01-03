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

//este metdo nos ayudara a obtener datos por el id
router.get('/tasks/:id', (req, res, next) => {
    //en este punto solo vamos a manejar una sola tarea. asiq ue solo usamos task
     db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id)},(err, task) => {
         if(err) return next(err);
         res.json(task);
         
     });
 
 });
 //en este punto usamos post y no get para que nuestro servidor sepa que se va a hacer alguna modificacion a nuesrros datos, en la direccion la cual se le esta pasando.


 //este metodo no ayudara a guardar datos.
 router.post('/tasks', (req, res, next) => {
 
    //req.body es lo que trae la infomcion de el cliente por eso es que se almacena en una variable, la cual es la que se va a almacenar en nestra base dde datos.
    const task  = req.body;
    /**
     * esto es una validacion bastante sencilla, donde se dice que si la tarea que recibimos no tiene ciertas propiedades
     * que mande un error convertido en json, para decirle qe envio un dato malo.
     * task.isDone+'' = una variable boleana vuelta string 
     */
    if (!task.title || !(task.isDone+'')){

        res.status(400).json({
            error : 'bad data'
        });
    }else{
        db.tasks.save((err,task) =>{
            /**
             * en caso dado aparezca algun error, lo manejamos de la manera en que sabemos, osea mandarlo a express
             * si no que lo almacene en nuestra db
             */
            if(err) return next(err);
            res.json(task);
        });
    }
 });

//metodo usado para eliminar elemento probablemente por el id
 router.delete('/task/:id',(req, res, next ) => {
     db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if(err) return next(err);
        res.json(result);
     });
 });

 router.put('/tasks/:id',(req, res, next ) => {
    const task = req.body;
    //este objeto es el que va a contene los nuevos datos para actualizar en la db
    const updateTask = {};
    //se hace una pequeña validacion para saber que todo esta bn 
    
    if(task.isDone){
        updateTask.isDone = task.isDone;
    }if(task.title){
        updateTask.title = task.title;
    }if(!updateTask){
        req.status(400).json({
                error : 'bad request'
        });
    }else{
        //y si todo esta bn, lo mandamos a actualizar
        db.tasks.update({_id : mongojs.ObjectId(req.params.id)}, (err, task) => {
            if(err) return next(err);
            res.json(task);
        });
    }

    

 });

module.exports = router;
