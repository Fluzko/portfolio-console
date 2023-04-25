import { FC, useRef } from "react";
import { Input } from "./CommandInput.styles";

type CommandInputComponent = {
  onEnter: (value: string) => unknown;
};

export const CommandInput: FC<CommandInputComponent> = ({ onEnter }) => {
  const inputRef = useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any): void => {
    if (e?.key === "Enter") {
      onEnter(e?.target.value);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return <Input ref={inputRef} onKeyDown={handleKeyDown} />;
};
