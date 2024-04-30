import React, { useEffect, useState } from 'react'
import axios from "axios";
export default function Mainpage() {
    //states for the from feilds
    const[date,setDate]=useState(null); 
    const[sourceCurrency, setSourceCurrency]=useState("");
    const[targetCurrency,setTargetCurrency]=useState("");
    const[amountInSourceCurrency,setAmountInSourceCurrency]=useState(0);
    const[amountInTargerCurrency,setAmountInTargetCurrency]=useState(0);
    const [currecyNames, setCurrencyNames] = useState([]);

    //handleSubmit methods
    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            const response=await axios.get("http://localhost:5000/convert",{
            params:{ 
                date,
                sourceCurrency,
                targetCurrency,
                amountInSourceCurrency
                }, });

                setAmountInSourceCurrency(response.data);

        } catch (err) {
            console.error(err);
        }
        console.log(
            date,
            setSourceCurrency,
            targetCurrency,
            targetCurrency,
            amountInSourceCurrency
        );
    };
    
    //gell all currecy names
    useEffect(()=>{
        const getCurrencyNames = async() =>{
            try{
                const response=await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                );
                setCurrencyNames(response.data);
            }catch(err){ 
            console.error(err);
            }
        };
        getCurrencyNames();
        } , [])
  
    return (
    <div>
        <h1 className="lg:mx-32 text-5xl font-bold text-green-500">Covert Your Currencis Today</h1>
        <p className='lg:mx-32 opacity-40 py-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Sed mattis nec orci at venenatis. In vestibulum mi sit amet
           quam facilisis fermentum. Praesent finibus, nibh nec luctus gravida, 
           nisi dolor lacinia nisl, eu cursus sem magna ut nibh. Sed volutpat augue 
           et blandit sodales. Duis in sollicitudin nibh. Duis auctor enim aliquet elit
            porta pharetra.
           </p>
        <div className='mt-5 flex items-center justify-center flex-co'>
            <section className="w-full lg:w-1/2">
                <form onSubmit={handleSubmit} >
                    
                  <div className="mb-5">

                            <label htmlFor={date} 
                            
                            className="block mb-3 mt-4 text-sm font-medium text-gray-900 dark:text-white">Select Date</label>
                            
                            <input type="date" id={date}
                            onChange={(e)=>setDate(e.target.value)}
                            name={date} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" 
                           
                             required />


                            <label htmlFor='sourceCurrency'
                             id={sourceCurrency} value={sourceCurrency} name={sourceCurrency} className="block mb-3 mt-4 text-sm font-medium text-gray-900 dark:text-white">Select Source Currency</label>
                            
                            <select
                            onChange={(e) =>setSourceCurrency(e.target.value)} 
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" 
                            >
                                <option value="">Select Source Currency</option>
                                {Object.keys(currecyNames).map((currecy) =>(
                                   <option className='p-1' key={currecy} value={currecy}>
                                    {currecyNames[currecy]}
                                   </option>
                                ) )}
                             </select>
                            <label htmlFor={targetCurrency} className="block mb-3 mt-4 text-sm font-medium text-gray-900 dark:text-white">Select Targer Currency</label>
                            <select onChange={(e)=>setTargetCurrency(e.target.value)}
                             className="shadow-sm bg-gray-50 borderborder-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
                            name='targetCurrency' id='targetCurrency'value={targetCurrency}
                            >   
                                <option value="">Select Target Currency</option>
                                {Object.keys(currecyNames).map((currecy) =>(
                                   <option className='p-1' key={currecy} value={currecy}>
                                    {currecyNames[currecy]}
                                   </option>
                                ) )}
                             </select>

                            <label htmlFor={amountInSourceCurrency} className="block mb-3 mt-4 text-sm font-medium text-gray-900 dark:text-white">Amount in Source Currency</label>
                            <input 
                            onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
                            type="number" id={amountInSourceCurrency} name={amountInSourceCurrency} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light mb-3"
                            placeholder='Amount in Source Currency' 
                            required />
                            <button className='bg-green-600 hover:bg-green-700
                            text-white font-medium py-2 px-3
                             rounded-md '>Get the target Currency</button>

                          </div>
                </form>
            </section>
        </div>
        {amountInTargerCurrency}
    </div>
   
  );
}