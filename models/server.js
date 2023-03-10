const express = require('express');
var cors = require('cors')




class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Middlewares - Funcion que siempre se va a ejecutar cada vez que levantemos el server
        this.middlewares();
        
        // Rutas
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        })
    }
}

module.exports = Server;