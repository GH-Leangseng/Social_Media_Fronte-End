import React from "react";
import metfone from "../assets/metfone.jpg";
type Props = {};

const Sponser = (props: Props) => {
  return (
    <div className=" bg-white dark:bg-gray-800 p-5 rounded-lg ">
      <h2>Sponsor</h2>
      <img
        src={metfone}
        alt=""
        className="h-40  w-full object-cover rounded-lg mt-2"
      />
      <p className="mt-2 font-bold">Cellcard Play</p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam atque
        repellat quam itaque consequuntur optio explicabo nesciunt assumenda
        repellendus sunt? Vel dolores nesciunt sint eius! Ab debitis quo quae.
        Doloremque.
      </p>
    </div>
  );
};

export default Sponser;
