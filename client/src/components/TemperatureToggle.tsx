import React from "react";
import { Switch } from "antd";

interface TemperatureToggleProps {
  isCelsius: boolean;
  setIsCelsius: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({
  isCelsius,
  setIsCelsius,
}) => {
  const handleToggle = (checked: boolean) => {
    setIsCelsius(checked);
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">{isCelsius ? "Celsius" : "Fahrenheit"}</span>
      <Switch
        checked={isCelsius}
        onChange={handleToggle}
        checkedChildren="C"
        unCheckedChildren="F"
      />
    </div>
  );
};

export default TemperatureToggle;
