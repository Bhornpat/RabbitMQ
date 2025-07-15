import {connect} from "amqplib"
const queue = "concurrent-queue"
const connection = await connect ("amqp://bomi:bomi@localhost")
const channel = await connection.createChannel()    //when have a connection , we have to create channal
await channel.assertQueue(queue,{durable:true})     //สร้าง queue by giving the queue's name and queue option 

//waiting for measage that had sent
channel.prefetch(1);   // This is a Quality of Service เพื่อให้ รับงานตัวที่ 1 และเมื่อ acknowladge เสร็จ ค่อยรับงานตัวที่ 2 ต่อ
channel.consume(queue, async (msg)=>{
    let processingTime = Math.floor(Math.random() * 8)+1;  //1-8 sec
    // the func that wait for message 
    console.log(`Receive ${msg.content.toString()}`)    // make to be a string
    await sleep(processingTime*1000);
    console.log(`✅ done ${msg.content.toString()}`)
channel.ack(msg)
},{noAck:false})  //mannaul ack  // it's mean if i already receiving the message ,i wouldn't have to acknowledge //คือข้อความจะถูกดึงออกจาก  queue by ackowledge
// auto ack // it's mean if i already receiving the message ,i wouldn't have to acknowledge //คือข้อความจะถูกดึงออกจาก  queue by ackowledge

function sleep (ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}