const express=require("express")
const {RtcTokenBuilder,RtcRole}=require("agora-access-token")
const app=express();
require("dotenv").config()
const cors=require("cors")
const port=3000||process.env.PORT;


const appId=process.env.AGORA_APPID;
const appCertificate=process.env.AGORA_APP_CERT;

app.use(cors())

app.get('/get-token',(req,res)=>{
    const channelName=req.query.channelName;
    if(!channelName){
        return res.status(400).json({error:"channelName is reqeuired"});
    }

    const expirationTimeInSecond=3600;
    const currentTimestamp=Math.floor(Date.now()/1000)
    const privilegeExpiredTs=currentTimestamp+expirationTimeInSecond;

    const role=RtcRole.PUBLISHER;
    const token=RtcTokenBuilder(appId,appCertificate,channelName,0,role,privilegeExpiredTs)

    res.json({'token':token})
})


app.listen(port,(err)=>{
    if(err) throw new Error(`server failed on port ${port}`)
    console.log(`server is up on port :${port}`)
})
