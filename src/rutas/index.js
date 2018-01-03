const router = require ('express').Router();


//asi es como se escriben las rutas
//esto quiere decir que cuando estemos en la ruta principal nos mande un mensaje de hello world
router.get('/',(req, res, next) =>{
   // res.send('hello world!');



    //con el render lo que hace es renderizar el html que ya hemos preparado en la carpeta de views
    res.render('index.html');
});


//esto nos ayud a expotar este modulo en todo nuestro proyecto, es decir que lo podemos usar en cualquier parte de nuestro proyecto.
module.exports = router;