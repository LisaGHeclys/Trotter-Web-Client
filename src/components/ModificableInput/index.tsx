import { Edit } from "@mui/icons-material";
import { Input } from "antd";
import React, { useState } from "react";

import "./index.scss";

type ModificableInputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  label: string;
};

const ModificableInput = ({
  onChange,
  value,
  label
}: ModificableInputProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <div className="modificableInputContainer">
      <label className="modificableInputLabel">{label}</label>
      <div className="modificableInput">
        <Input
          variant={isEditing ? "outlined" : "borderless"}
          onChange={handleChange}
          onClick={handleClick}
          value={value}
          className={!isEditing ? "unmodifiedInput" : undefined}
        />
        <span className={isEditing ? "isEditing" : undefined}>
          <Edit
            onClick={() => {
              setIsEditing(true);
            }}
            sx={{ width: 16, cursor: isEditing ? "default" : "pointer" }}
          />
        </span>
      </div>{" "}
    </div>
  );
};

export default ModificableInput;
