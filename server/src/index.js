const express=require("express");
const cors =require("cors");
const axios =require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());



try {
    //all currency
app.get("/getAllCurrencies" ,async (reg,res)=>{
    const nameURL =`https://openexchangerates.org/api/currencies.json?app_id=0131139365eb42a98552d55eb46249a4`;
    
    const nameResponse = await axios.get(nameURL);
    const nameData = nameResponse.data;
    //console.log(nameResponse.data);
    return res.json(nameData);
    });
} catch (err) {
   // console.error('Error fetching data:', error.message);
    console.error(err);
}
// get the targer amount
app.get("/convert" ,async(req, res)=>{
    const{
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency
    }req.query;
    try {
        const dataURL=`https://openexchangerates.org/api/historical/${date}.json?app_id=0131139365eb42a98552d55eb46249a4`;
        const dataResponce=await axios.get(dataURL);
        const rates = dataResponce.rates;

        //rates
        const SourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //final targer value
        const targerAmount=(targetRate/SourceRate)*amountInSourceCurrency;
        return req.json(targerAmount);

    } catch (err) {
        console.error(err);
    }
});
//lisint to a port
app.listen( 5000,()=>{
    console.log("Server Started");
});
