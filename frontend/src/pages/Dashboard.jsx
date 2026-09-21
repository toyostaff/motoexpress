import {useEffect,useState} from "react";

import api from "../api/axios";

import AdminLayout from "../layouts/AdminLayout";

import StatCard from "../components/admin/StatCard";

import AppointmentTable from "../components/admin/AppointmentTable";

import CalendarWidget from "../components/admin/CalendarWidget";



function Dashboard(){


const [stats,setStats]=useState({

pendientes:0,

confirmadas:0,

atendidas:0,

canceladas:0

});




useEffect(()=>{


cargarDashboard();


},[]);




async function cargarDashboard(){


try{


const response =
await api.get("/admin/dashboard");



setStats(response.data.data);



}

catch(error){

console.log(error);

}


}





return(


<AdminLayout>


<h2 className="
text-3xl
font-bold
text-gray-800
">

Resumen general

</h2>



<p className="
text-gray-500
mt-2
mb-6
">

Estado actual del servicio MotoExpress

</p>



<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-5
">


<StatCard

title="Pendientes"

value={stats.pendientes}

icon="📅"

color="bg-orange-100"

/>


<StatCard

title="Confirmadas"

value={stats.confirmadas}

icon="✅"

color="bg-blue-100"

/>



<StatCard

title="Atendidas"

value={stats.atendidas}

icon="🔧"

color="bg-green-100"

/>



<StatCard

title="Canceladas"

value={stats.canceladas}

icon="❌"

color="bg-red-100"

/>



</div>



<AppointmentTable/>


<CalendarWidget/>


</AdminLayout>


);


}


export default Dashboard;