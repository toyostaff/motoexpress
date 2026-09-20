import { useState } from "react";

import StepIndicator from "../components/booking/StepIndicator";

import PersonalForm from "../components/booking/PersonalForm";
import MotorcycleForm from "../components/booking/MotorcycleForm";
import ServiceForm from "../components/booking/ServiceForm";
import ScheduleForm from "../components/booking/ScheduleForm";
import Confirmation from "../components/booking/Confirmation";

import personalImage from "../assets/images/booking/booking-personal.jpg";
import motoImage from "../assets/images/booking/booking-moto.jpg";
import serviceImage from "../assets/images/booking/booking-service.jpg";
import calendarImage from "../assets/images/booking/booking-calendar.jpg";
import confirmImage from "../assets/images/booking/booking-confirm.jpg";

function getTodayLima() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date());
}

function Booking() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    nombre_cliente: "",
    telefono: "",
    direccion: "",
    referencia: "",

    marca_moto: "",
    detalle_marca: "",
    placa: "",

    motivo_trabajo: "",
    detalle_motivo: "",

    fecha: getTodayLima(),
    bloque_hora: "",
  });

  const stepContent = {
    1: {
      image: personalImage,
    },

    2: {
      image: motoImage,
    },

    3: {
      image: serviceImage,
    },

    4: {
      image: calendarImage,
    },

    5: {
      image: confirmImage,
    },
  };

  const currentVisual = stepContent[currentStep];

  const isConfirmation = currentStep === 5;

  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      py-6
      md:py-10
      px-4
      md:px-6
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        bg-white
        rounded-2xl
        shadow-xl
        overflow-hidden
        "
      >
        <div
          className="
          p-6
          md:p-10
          "
        >
          <h1
            className="
            text-2xl
            md:text-3xl
            font-bold
            text-[#0B1115]
            mb-8
            "
          >
            Agenda tu cita
          </h1>

          <StepIndicator currentStep={currentStep} />
        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-[380px_1fr]
          "
        >
          {/* IMAGEN LATERAL */}

          <div
            className={`
            relative

            ${
              isConfirmation
                ? "h-65 md:h-[720px]"
                : currentStep === 4
                  ? "h-65 md:h-[820px]"
                  : "h-65 md:h-[720px]"
            }

            `}
          >
            <img
              src={currentVisual.image}
              className={`

              absolute
              inset-0
              w-full
              h-full
              object-cover


              ${
                isConfirmation
                  ? "object-[center_20%] md:object-center"
                  : "object-[center_40%] md:object-center"
              }


              `}
              alt=""
            />

            <div
              className="
              absolute
              inset-0
              bg-black/50
              "
            />

            <div
              className="
              relative
              z-10
              h-full
              flex
              items-end
              pb-6
              p-6
              md:p-10
              "
            >
              <h2
                className="
                text-white
                text-2xl
                md:text-3xl
                font-bold
                leading-tight
                max-w-sm
                "
              ></h2>
            </div>
          </div>

          {/* FORMULARIO */}

          <div
            className="
            p-6
            md:p-10
            flex
            items-center
            "
          >
            <div className="w-full">
              {currentStep === 1 && (
                <PersonalForm
                  formData={formData}
                  setFormData={setFormData}
                  nextStep={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 2 && (
                <MotorcycleForm
                  formData={formData}
                  setFormData={setFormData}
                  previousStep={() => setCurrentStep(1)}
                  nextStep={() => setCurrentStep(3)}
                />
              )}

              {currentStep === 3 && (
                <ServiceForm
                  formData={formData}
                  setFormData={setFormData}
                  previousStep={() => setCurrentStep(2)}
                  nextStep={() => setCurrentStep(4)}
                />
              )}

              {currentStep === 4 && (
                <ScheduleForm
                  formData={formData}
                  setFormData={setFormData}
                  previousStep={() => setCurrentStep(3)}
                  nextStep={() => setCurrentStep(5)}
                />
              )}

              {currentStep === 5 && (
                <Confirmation
                  formData={formData}
                  previousStep={() => setCurrentStep(4)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
