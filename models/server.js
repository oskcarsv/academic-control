const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.cursosPath = '/api/cursos';
        this.cursoUsuariosPath = '/api/cursoUsuarios';
        this.authPath = '/api/auth'


        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
        this.app.use(this.cursosPath, require('../routes/curso.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.cursoUsuariosPath, require('../routes/cursoUsuario.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

module.exports = Server;