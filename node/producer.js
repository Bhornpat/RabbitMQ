import {connect} from "amqplib"
const queue = "concurrent-queue"
const connection = await connect ("amqp://bomi:bomi@localhost")
const channel = await connection.createChannel()    //when have a connection , we have to create channal
await channel.assertQueue(queue,{durable:true})     //สร้าง queue by giving the queue's name and queue option 

for(let i=0; i<151; i++){
const message = "Hello Bomi "+i                       // ข้อความที่จะส่ง a message that wanna send 
channel.sendToQueue(queue,Buffer.from(message),{persistent:false})
}   // sending the message to queue  //converting to binary >Buffer.from(message)<   
// at the point of "{durable:true}" and "{persistent:false}" is it will store in memory no in disk
await channel.close()   // after sending  the message , have to close channel and connectionn, bc if not , it would be keep waiting
await connection.close()