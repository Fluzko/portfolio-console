import { FC, Ref, forwardRef, useImperativeHandle, useRef } from "react";
import { Input } from "./CommandInput.styles";

interface CommandInputProps {
  onEnter: (value: string) => void;
}

const CommandInput = (
  { onEnter }: CommandInputProps,
  ref: Ref<{ focus: () => void }>,
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any): void => {
    if (e?.key === "Enter") {
      onEnter(e?.target.value);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return <Input ref={inputRef} onKeyDown={handleKeyDown} />;
};

export default forwardRef(CommandInput);
