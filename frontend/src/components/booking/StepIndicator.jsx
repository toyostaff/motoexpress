const steps = [
  "Datos personales",
  "Datos moto",
  "Servicio",
  "Fecha y horario",
  "Confirmacion"
];


function StepIndicator({ currentStep }) {


  return (

    <div
      className="
      w-full
      mb-10
      "
    >


      <div
        className="
        relative
        flex
        justify-between
        items-start
        "
      >


        {/* LINEA DE PROGRESO */}

        <div
          className="
          absolute
          top-5
          left-0
          right-0
          h-1
          bg-gray-200
          "
        />


        <div
          className="
          absolute
          top-5
          left-0
          h-1
          bg-orange-500
          transition-all
          duration-300
          "
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
          }}
        />



        {
          steps.map((step, index) => {


            const number = index + 1;

            const active = number <= currentStep;

            const current = number === currentStep;



            return (

              <div

                key={step}

                className="
                relative
                z-10
                flex
                flex-col
                items-center
                flex-1
                "

              >


                <div

                  className={`
                  w-11
                  h-11
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                  border-4
                  transition-all
                  duration-300

                  ${
                    active
                    ?
                    "bg-orange-500 text-white border-orange-200"
                    :
                    "bg-gray-200 text-gray-500 border-white"
                  }

                  ${
                    current
                    ?
                    "scale-110 shadow-lg"
                    :
                    ""
                  }

                  `}

                >

                  {number}

                </div>



                <span

                  className={`
                  mt-3
                  text-center
                  text-xs
                  md:text-sm
                  font-medium
                  
                  ${
                    active
                    ?
                    "text-[#0B1115]"
                    :
                    "text-gray-400"
                  }

                  `}

                >

                  {step}

                </span>


              </div>

            )


          })

        }


      </div>


    </div>

  );

}


export default StepIndicator;