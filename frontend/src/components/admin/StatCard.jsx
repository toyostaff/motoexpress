function StatCard({
  title,
  value,
  icon,
  color,
  subtitle
}) {


  return (

    <div

      className="
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition
        p-5
        border
        border-gray-100
        flex
        items-center
        justify-between
      "

    >


      <div>


        <p
          className="
            text-gray-500
            text-sm
            mb-2
          "
        >

          {title}

        </p>



        <h3

          className="
            text-3xl
            font-bold
            text-gray-800
          "

        >

          {value}

        </h3>



        <p

          className="
            text-xs
            text-green-600
            mt-2
            font-medium
          "

        >

          {subtitle}

        </p>



      </div>




      <div

        className={`
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          text-2xl
          ${color}
        `}

      >

        {icon}


      </div>



    </div>

  );

}


export default StatCard;