import { Link } from "react-router-dom";


function AppointmentTable() {


    const appointments = [

        {
            id: 1,
            cliente: "Carlos Pérez",
            moto: "Honda CB190",
            servicio: "Cambio de aceite",
            fecha: "21/09/2026",
            hora: "10:00",
            estado: "Pendiente",
        },

        {
            id: 2,
            cliente: "María López",
            moto: "Yamaha MT-03",
            servicio: "Revisión de frenos",
            fecha: "21/09/2026",
            hora: "14:00",
            estado: "Confirmada",
        },

        {
            id: 3,
            cliente: "José Ramírez",
            moto: "Bajaj Pulsar",
            servicio: "Revisión batería",
            fecha: "21/09/2026",
            hora: "16:00",
            estado: "En proceso",
        },

        {
            id: 4,
            cliente: "Ana Torres",
            moto: "Suzuki GSX",
            servicio: "Mantenimiento general",
            fecha: "20/09/2026",
            hora: "11:00",
            estado: "Finalizada",
        },

    ];





    const estadoColor = (estado) => {


        switch (estado) {


            case "Pendiente":

                return "bg-orange-100 text-orange-700";


            case "Confirmada":

                return "bg-blue-100 text-blue-700";


            case "En proceso":

                return "bg-yellow-100 text-yellow-700";


            case "Finalizada":

                return "bg-green-100 text-green-700";


            default:

                return "bg-gray-100 text-gray-700";


        }

    };





    return (


        <div

            className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-gray-100
                mt-8
                overflow-hidden
            "

        >



            <div

                className="
                    p-5
                    border-b
                    border-gray-100
                "

            >


                <h3

                    className="
                        text-xl
                        font-bold
                        text-gray-800
                    "

                >

                    Últimas citas

                </h3>


            </div>





            <div className="overflow-x-auto">



                <table

                    className="
                        w-full
                        text-left
                    "

                >



                    <thead

                        className="
                            bg-gray-50
                            text-gray-600
                            text-sm
                        "

                    >


                        <tr>


                            <th className="px-5 py-4">
                                Cliente
                            </th>


                            <th className="px-5 py-4">
                                Moto
                            </th>


                            <th className="px-5 py-4">
                                Servicio
                            </th>


                            <th className="px-5 py-4">
                                Fecha
                            </th>


                            <th className="px-5 py-4">
                                Hora
                            </th>


                            <th className="px-5 py-4">
                                Estado
                            </th>


                            <th className="px-5 py-4">
                                Acción
                            </th>



                        </tr>



                    </thead>





                    <tbody>


                        {appointments.map((item) => (



                            <tr

                                key={item.id}

                                className="
                                    border-t
                                    hover:bg-gray-50
                                "

                            >



                                <td className="px-5 py-4">

                                    {item.cliente}

                                </td>




                                <td className="px-5 py-4">

                                    {item.moto}

                                </td>




                                <td className="px-5 py-4">

                                    {item.servicio}

                                </td>




                                <td className="px-5 py-4">

                                    {item.fecha}

                                </td>




                                <td className="px-5 py-4">

                                    {item.hora}

                                </td>




                                <td className="px-5 py-4">



                                    <span

                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${estadoColor(item.estado)}
                                        `}

                                    >

                                        {item.estado}


                                    </span>



                                </td>





                                <td className="px-5 py-4">


                                    <Link

                                        to={`/admin/citas/${item.id}`}

                                        className="
                                            text-[#FF6A00]
                                            font-semibold
                                            hover:underline
                                        "

                                    >

                                        Ver detalle


                                    </Link>


                                </td>





                            </tr>



                        ))}



                    </tbody>




                </table>




            </div>




        </div>



    );

}



export default AppointmentTable;