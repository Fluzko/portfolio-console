import { ReadlinePrompt, TextPrompt } from "../prompt";
import { useFileSystem } from "../../contexts/fileSystem";
import { ConsoleContainer, MainContainer } from "./Console.styles";
import { FC, useRef, useState } from "react";
import { LoginAnimation } from "../LoginAnimation";
import { useKeepBottomScroll } from "../../hooks/useKeepBottomScroll";

type ConsoleComponent = FC;

export const Console: ConsoleComponent = () => {
  const { executionStack } = useFileSystem();
  const [isConsoleReady, setIsConsoleReady] = useState(false);
  const inputRef = useRef<{ focus: () => void }>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  useKeepBottomScroll(consoleRef.current);

  return (
    <MainContainer onClick={() => inputRef.current?.focus()}>
      <ConsoleContainer ref={consoleRef}>
        <LoginAnimation onReady={() => setIsConsoleReady(true)} />
        {isConsoleReady && (
          <>
            {executionStack.map((execution, i) => (
              <TextPrompt key={i} execution={execution} />
            ))}
            <ReadlinePrompt inputRef={inputRef} />
          </>
        )}
      </ConsoleContainer>
    </MainContainer>
  );
};
