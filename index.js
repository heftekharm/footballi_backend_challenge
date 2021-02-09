const express =require('express');
const apis =require('./routes/apis.js');


const app=express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.json("Salam");
});
app.use('/api/v1/',apis);

app.listen(3232,()=>{
    console.log("Listening to 3232");
});