import express from 'express';
import { SERVER_PORT } from '../global/environment';

import socketIO from 'socket.io'
import http from 'http'

import * as socket from '../sockets/socket';
import { Socket } from 'socket.io';

export default class Server{
    
    private static _instance: Server;
    //Express es un servidor que sea levatnado desde node
    public app : express.Application;
    public port : number;

    public io: socketIO.Server;
    private httpServer : http.Server;
    
    
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        //Necesitamos este para que sea de enlace entre Socket IO y el Servidor
        this.httpServer = new http.Server(this.app);
        //Socket 
        this.io = socketIO(this.httpServer);

        //Meotod que sea el observador es decir sera el sockets que esta atendo a todos lo emtis y lisnten quie se haga desde los que consuman el socket
        this.escucharSockects();
    }
    //Retorna una instancia para que sea Singleton y evitar que varios sockets corran sin que nosotros tengamos el control
    public static get instance()
    {
        return this._instance || (this._instance = new this());
    }
    private escucharSockects() {
        console.log('Escuchando conexiones Sockets');
        this.io.on('connection', (cliente: Socket)=>{

            console.log('Nuevo cliente conectado');   
            
            //mesae
            socket.mensaje(cliente, this.io);


            //Desconectar 
            socket.desconectar(cliente);
        });        
    }

    
    //Inicia el servidor 
    start(callback: any){

        this.httpServer.listen(this.port, callback);
    }
}
