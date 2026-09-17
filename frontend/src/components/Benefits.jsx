const benefits = [
    {
        icon: "⚡",
        title: "Atención rápida",
        description:
            "Servicio eficiente para que vuelvas a la ruta lo antes posible."
    },
    {
        icon: "🛡️",
        title: "Seguridad garantizada",
        description:
            "Revisiones enfocadas en el correcto funcionamiento de tu moto."
    },
    {
        icon: "⚙️",
        title: "Repuestos de calidad",
        description:
            "Utilizamos productos confiables para el mantenimiento."
    },
    {
        icon: "👨‍🔧",
        title: "Técnicos expertos",
        description:
            "Personal preparado para diferentes marcas y modelos."
    }
];


function Benefits() {

    return (

        <section
            className="
bg-[#0B1115]
text-white
py-20
px-6
md:px-20
"
        >


            <div
                className="
max-w-6xl
mx-auto
"
            >


                <h2
                    className="
text-4xl
font-bold
text-center
"
                >

                    Más que un taller,
                    <br />

                    <span className="text-orange-500">
                        tu aliado en el camino
                    </span>

                </h2>



                <div
                    className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-8
mt-12
"
                >


                    {
                        benefits.map((item, index) => (


                            <div

                                key={index}

                                className="
text-center
p-6
rounded-xl
bg-[#111820]
hover:bg-[#17232d]
transition
"

                            >


                                <div
                                    className="
text-5xl
"
                                >

                                    {item.icon}

                                </div>



                                <h3
                                    className="
mt-5
text-xl
font-bold
"
                                >

                                    {item.title}

                                </h3>



                                <p
                                    className="
mt-3
text-gray-300
text-sm
"
                                >

                                    {item.description}

                                </p>



                            </div>


                        ))

                    }


                </div>


            </div>


        </section>

    )

}


export default Benefits;