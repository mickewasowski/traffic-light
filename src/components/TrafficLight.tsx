import { useState } from "react";
import "./TrafficLight.scss";

enum Lights {
  Red,
  Yellow,
  Green,
}

type ActiveLight = Lights.Red | Lights.Yellow | Lights.Green;

const TrafficLight = () => {
  const [active, setActive] = useState<ActiveLight[]>([Lights.Red]);

  return (
    <div className="TrafficLight">
      <div className={`TrafficLight__light ${active.includes(Lights.Red) ? 'TrafficLight__light--active' : ''} TrafficLight__light--red`}></div>
      <div className={`TrafficLight__light ${active.includes(Lights.Yellow) ? 'TrafficLight__light--active' : ''} TrafficLight__light--yellow`}></div>
      <div className={`TrafficLight__light ${active.includes(Lights.Green) ? 'TrafficLight__light--active' : ''} TrafficLight__light--green`}></div>
    </div>
  );
};

export default TrafficLight;
