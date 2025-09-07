import React, { useState, useEffect, useRef } from "react";
import "./TrafficLight.scss";

enum Lights {
  Red,
  Yellow,
  Green,
}

type ActiveLight = Lights.Red | Lights.Yellow | Lights.Green;

const DURATIONS = {
  [Lights.Red]: {
    light: 4_000,
  },
  [Lights.Yellow]: {
    light: 1_000,
  },
  [Lights.Green]: {
    light: 6_000,
  },
};

const TrafficLight = () => {
  const [active, setActive] = useState<ActiveLight[]>([Lights.Red]);
  const timeoutRef = useRef<number | null>(null);

  // transitions:
  // red -> red + yellow
  // red + yellow -> green
  // green -> yellow
  // yellow -> red
  const handleTimeouts = () => {
    if (active.length === 2) {
      clearTimeoutRef();

      timeoutRef.current = setTimeout(() => {
        setActive([Lights.Green]);
      }, 2_000);
    } else if (active.includes(Lights.Green)) {
      timeoutRef.current = setTimeout(() => {
        setActive([Lights.Yellow]);
      }, DURATIONS[active[0]].light);
    } else if (active.includes(Lights.Yellow)) {
      timeoutRef.current = setTimeout(() => {
        setActive([Lights.Red]);
      }, DURATIONS[active[0]].light);
    } else if (active.includes(Lights.Red)) {
      timeoutRef.current = setTimeout(() => {
        setActive([Lights.Red, Lights.Yellow]);
      }, DURATIONS[active[0]].light);
    }
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
        className={`TrafficLight__light ${active.includes(Lights.Red) ? "TrafficLight__light--active" : ""} TrafficLight__light--red`}
      ></div>
      <div
        className={`TrafficLight__light ${active.includes(Lights.Yellow) ? "TrafficLight__light--active" : ""} TrafficLight__light--yellow`}
      ></div>
      <div
        className={`TrafficLight__light ${active.includes(Lights.Green) ? "TrafficLight__light--active" : ""} TrafficLight__light--green`}
      ></div>
    </div>
  );
};

export default TrafficLight;
