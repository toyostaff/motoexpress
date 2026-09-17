function Services() {
  const services = [
    "🔧 Cambio de aceite",

    "⚙️ Revisión de frenos",

    "💡 Revisión de luces",

    "🔋 Revisión de batería",
  ];

  return (
    <section
      id="servicios"
      className="
bg-white
py-16
px-20
"
    >
      <h2
        className="
text-4xl
font-bold
text-center
"
      >
        Nuestros servicios
      </h2>

      <div
        className="
grid
grid-cols-4
gap-6
mt-10
"
      >
        {services.map((item, index) => (
          <div
            key={index}
            className="
p-8
rounded-xl
shadow
text-center
border
"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
