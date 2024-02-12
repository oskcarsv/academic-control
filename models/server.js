const express = require('express');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
    }

    middlewares() {
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

module.exports = Server;