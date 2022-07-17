//Crear el servidor back-end
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

//Definición de rutas
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// “Express” y “cors” se importan primero. Luego, se inicializa una aplicación rápida. app.use cors que habilita el uso compartido de recursos entre orígenes para que las solicitudes HTTP entrantes no sean bloqueadas por la política de cors.
// Necesitamos importar “body-parser” para analizar el cuerpo de la solicitud y para obtener detalles de tareas pendientes cada vez que llegue una solicitud de publicación

//Conexión a la base de datos
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todoapp", {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("open", () => {
 console.log("Connected to mongoDB");
});
db.on("error", (error) => {
    console.log(error);
});
// Entonces, mongoose.connect se utiliza para conectarse a MongoDB. 27017 como el puerto predeterminado para MongoDB y todoapp es el nombre de nuestra base de datos.

//Importar todo_schema como modelo
let todoModel = require("./todo_schema");

//Crear una tarea pendiente
// ROUTES
app.get("/", (req, res) => {
    res.send("hello");
   });
// add todo
app.post("/todo/add", (req, res) => {
let newTodo = new todoModel();
    newTodo.title = req.body.todo;
    newTodo.completed = false;
    newTodo.save(err => {
        if (err) {
            console.log(err);
            res.send("Error while adding Todo");
        } else {
            console.log(newTodo);
            res.send("Todo added");
        }
    });
});
// El código anterior crea un nuevo modelo de tareas pendientes llamado “newTodo” y guarda los detalles de las tareas pendientes al analizar la solicitud y luego los guarda en la base de datos.

//Obteniendo tareas pendientes
// FETCH TO-DO
// completed: tareas completas
app.get("/todo/completed", (req, res) => {
    todoModel.find({ completed: true }, (err, todos) => {
            if (err) {
                res.send("Error while fetching Todos");
            } else {
                res.json(todos);
            }
        });
   });
   
// uncompleted: tareas incompletas
app.get("/todo/uncompleted", (req, res) => {
    todoModel.find({ completed: false }, (err, todos) => {
        if (err) {
            res.send("Error while fetching Todos");
        } else {
            res.json(todos);
        }
    });
});

//Actualización de las tareas pendientes
// update
app.post("/todo/complete/:id", (req, res) => {
    todoModel.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    (err, todo) => {
            if (!err) {
                res.send("Good Work");
            }
        }
    );
});
// Para actualizar una tarea pendiente como completada, cambiamos el campo completado de tarea pendiente a “true”. Para cada documento en MongoDB, MongoDB proporcionará un “ID” de objeto por sí mismo. Pasaremos este “ID” de objeto a la API de back-end y actualizaremos el campo completo de la tarea pendiente como ”true”.

//Borrar tareas
// delete todo
app.delete("/todo/:id", (req, res) => {
    let query = { _id: req.params.id };
    todoModel.deleteOne(query, err => {
        if (err) {
            res.send("Error while deleting todo");
        } else {
            res.send("Todo deleted");
        }
    });
});
   

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
// app.listen crea un servidor back-end en http://localhost:3000 . Para iniciar el servidor, ejecute el siguiente comando en la terminal.


   