import React, { useState, useEffect, useRef } from "react";
import "./TrafficLight.scss";

enum Lights {
  Red,
  RedYellow,
  Yellow,
  Green,
}

type ActiveLight = Lights.Red | Lights.RedYellow | Lights.Yellow | Lights.Green;

const DURATIONS: Record<ActiveLight, number> = {
  [Lights.Red]: 4_000,

  [Lights.RedYellow]: 2_000,

  [Lights.Yellow]: 1_000,

  [Lights.Green]: 6_000,
};

// transitions:
// red -> red + yellow
// red + yellow -> green
// green -> yellow
// yellow -> red
const TRANSITIONS: Record<ActiveLight, ActiveLight> = {
  [Lights.Red]: Lights.RedYellow,
  [Lights.RedYellow]: Lights.Green,
  [Lights.Green]: Lights.Yellow,
  [Lights.Yellow]: Lights.Red,
};

const TrafficLight = () => {
  const [active, setActive] = useState<ActiveLight>(Lights.Red);
  const timeoutRef = useRef<number | null>(null);

  const handleTimeouts = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(TRANSITIONS[active]);
    }, DURATIONS[active]);
  };

  const clearTimeoutRef = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    handleTimeouts();

    return () => {
      clearTimeoutRef();
    };
  }, [active]);

  return (
    <div className="TrafficLight">
      <div
        className={`TrafficLight__light ${[Lights.Red, Lights.RedYellow].includes(active) ? "TrafficLight__light--active" : ""} TrafficLight__light--red`}
      ></div>
      <div
        className={`TrafficLight__light ${[Lights.Yellow, Lights.RedYellow].includes(active) ? "TrafficLight__light--active" : ""} TrafficLight__light--yellow`}
      ></div>
      <div
        className={`TrafficLight__light ${active === Lights.Green ? "TrafficLight__light--active" : ""} TrafficLight__light--green`}
      ></div>
    </div>
  );
};

export default TrafficLight;
