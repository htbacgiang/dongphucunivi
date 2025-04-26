import { useState } from "react";
import SlideVN from "../slide/Vietnam/SlideVN"


const Vietnam = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>

      <div className="container mx-auto">
        <div className={toggleState === 1 ? "block" : "hidden"}>
          <SlideVN />
        </div>
      </div>
    </div>
  );
};

export default Vietnam;
