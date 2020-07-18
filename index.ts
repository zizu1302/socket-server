import Server from './classes/server';
import router from './routes/router';
import bodyParser from "body-parser";
import cors from 'cors'

const server = Server.instance;;

//Configuracion BodyPaerser para que todas las peticiones que se hagan al servidor lo podamos transforma JSON
server.app.use(bodyParser.urlencoded({ extended:true}));
server.app.use(bodyParser.json());


//CORS permitir peticiones a servidores externos
server.app.use(cors({origin : true, credentials: true}));

//Rutas de servicios
server.app.use('/', router);

server.start(()=>{
     console.log('start servidor en el puerto:' + server.port);    
});
