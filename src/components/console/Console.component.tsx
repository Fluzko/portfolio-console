import { ReadlinePrompt, TextPrompt } from "../prompt";
import { useFileSystem } from "../../contexts/fileSystem";
import { ConsoleContainer, MainContainer } from "./Console.styles";
import { FC, useState } from "react";
import { LoginAnimation } from "../LoginAnimation";

type ConsoleComponent = FC;

export const Console: ConsoleComponent = () => {
  const { executionStack } = useFileSystem();
  const [isConsoleReady, setIsConsoleReady] = useState(false);

  return (
    <>
      <MainContainer>
        <ConsoleContainer>
          <LoginAnimation onReady={() => setIsConsoleReady(true)} />
          {isConsoleReady && (
            <>
              {executionStack.map((execution, i) => (
                <TextPrompt key={i} execution={execution} />
              ))}
              <ReadlinePrompt />
            </>
          )}
        </ConsoleContainer>
      </MainContainer>
    </>
  );
};
