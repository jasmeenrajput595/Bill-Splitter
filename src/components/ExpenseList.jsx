import {useState} from 'react'

export default function ExpenseList(){
    const[expense , setExpense]= useState([])
     return(
        <div className="grid grid-cols-2">
            <div  className=" bg-gray-100 m-5 h-60 w-80 ">
                 <h1 className="font-bold flex justify-center m-2 p-4">OverView :</h1>
                 <h1 className="font-bold m-4">Event cost to group : </h1>
                 <h1 className="font-bold m-4">You Paid: </h1>
                 <h1 className="font-bold m-4">You Owed : </h1>
            </div>
             <div  className=" bg-gray-100 m-5 h-60 w-80 ">
                 <h1 className="font-bold flex justify-center m-2 ">All Debts :</h1>
                 <h1 className="font-bold m-4">{}</h1>
                 
            </div>
             <div  className=" bg-gray-100 m-5 h-60 w-80 ">
                 <h1 className="font-bold flex justify-center m-2 ">Expenses :</h1>
                 <h1 className="font-bold m-4">{}</h1>
                 <h1 className="font-bold m-4">People Involved : {}</h1>
                 <h1 className="font-bold m-4">Your Share : {}</h1>
                 
            </div>
        </div>
     )
}
// test