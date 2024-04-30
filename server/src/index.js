const express=require("express");
const cors =require("cors");
const axios =require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());



try {
    //all currency
app.get("/getAllCurrencies" , (reg,res)=>{
    const nameURL =`https://openexchangerates.org/api/currencies.json?app_id=0131139365eb42a98552d55eb46249a4`
    
    const nameResponse =await axios.get(nameURL);
    const nameData = nameResponse.data;
    
    return res.json(nameData);
    
    
    });
} catch (err) {
    console.error(err);
}

//lisint to a port
app.listen( 5000,()=>{
    console.log("Server Started");
});