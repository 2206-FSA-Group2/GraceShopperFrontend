import React, {useState, useEffect} from "react"
import { getAllPurchasedCarts } from "../../api";
import ItemsSold from "../AdminPage/KPI/ItemsSold";
import Sales from "../AdminPage/KPI/Sales";

const AdminHomePage = () => {
    const user = localStorage.getItem("user")
    const isAdmin = JSON.parse(user)
    if (!isAdmin) return <UnauthorizedRoute/>
    const token = localStorage.getItem("token");
    const [realData, setRealData] = useState([])

    let allData = []


    useEffect(()=>{
        async function getData() {
            const data = await getAllPurchasedCarts(token)
            console.log(data)
            data.map((order)=>{    let totalSales = {};
            let total = 0;
            let itemQuantity = 0;
            order.items.map((item)=>{totalSales["orderId"] = order.id; totalSales["usd"] = total += Number(item.price); totalSales["quantity"] = itemQuantity += Number(item.quantity)});allData.push(totalSales)})
            setRealData(allData)
          }
          getData();
    }, [])
   
    return (
        <div style={{backgroundImage: "url('https://images.freeimages.com/images/large-previews/a3b/website-rays-background-pattern-1637863.png')", backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        height: "900px"}}>
    <h1 style={{textAlign:"center", paddingTop: "2rem"}}>Welcome, Admin.</h1>
    <h5 style={{textAlign:"center", paddingTop: "2rem"}}> Use the navbar to navigate through the admin functions.</h5>
    <Sales allData={realData}/>
    <ItemsSold allData={realData}/>
    </div>

    )
}

export default AdminHomePage;