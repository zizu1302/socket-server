import Server from './classes/server';
import router from './routes/router';
import bodyParser from "body-parser";
import cors from 'cors'
const server = new Server();

//BOdyPaerser
server.app.use(bodyParser.urlencoded({ extended:true}));
server.app.use(bodyParser.json());


//CORS permitir peticiones a servidores externos
server.app.use(cors({origin : true, credentials: true}));

//Rutas de servicios
server.app.use('/', router);

server.start(()=>{
    console.log('servidor correfidn' + server.port);    
});
