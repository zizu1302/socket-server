import { Socket } from "socket.io";


export const desconectar =(cliente:Socket)=>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        
    });
}

//Escuchar mensajes
export const mensaje = (cliente:Socket, io:SocketIO.Server)=>{
    //"on" quiere decir escuchar
    cliente.on('mensaje', (payload:{ de :string, cuerpo:string})=>{
        console.log(payload);

        //emit =dar respuesta a lo que estamos escuchado si ai se desea
        io.emit('mensaje-nuevo', payload);

    });
};