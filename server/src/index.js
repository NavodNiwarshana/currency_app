const express=require("express");
const cors =require("cors");
const axios =require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());



try {
    //all currency 
app.get("/getAllCurrencies" ,async (req, res)=>{
    const nameURL =`https://openexchangerates.org/api/currencies.json?app_id=0131139365eb42a98552d55eb46249a4`;
    
    const namesResponse = await axios.get(nameURL);
    const namesData = namesResponse.data;
    //console.log(nameResponse.data);
    return res.json(namesData);
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
        amountInSourceCurrency}= req.query;
    try {
        const dataUrl=`https://openexchangerates.org/api/historical/${date}.json?app_id=0131139365eb42a98552d55eb46249a4`;
        const dataResponce=await axios.get(dataUrl);
        const rates = dataResponce.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        console.log("sourceCurrency:", sourceCurrency);
        console.log("targetCurrency:", targetCurrency);
        console.log("targetRate:", targetRate);
        console.log("sourceRate:", sourceRate);
        console.log("amountInSourceCurrency:", amountInSourceCurrency);

        //final targer value
        const targetAmount=(targetRate/sourceRate)*amountInSourceCurrency;
        console.log("targetAmount:", targetAmount);


        return res.json(targetAmount.toFixed(2));



    } catch (err) {
        console.error(err);
    }
    

});
//lisint to a port
app.listen( 5000,()=>{
    console.log("Server Started");
});
