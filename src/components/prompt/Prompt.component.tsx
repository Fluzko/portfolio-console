import { MetadataLine } from "../metadataLine";
import { UserInputLine } from "../userInputLine";
import { FC, ReactNode, Ref } from "react";
import { IExecution, useFileSystem } from "../../contexts/fileSystem";
import { CommandInput } from "../commadInput";
import { Text } from "../text";
import { PromptContainer, TextPrompContainer } from "./Prompt.styles";

type PromptComponent = FC<{ children: ReactNode; path: string }>;

export const GenericPrompt: PromptComponent = ({ children, path }) => {
  const { user } = useFileSystem();
  return (
    <PromptContainer>
      <MetadataLine user={user} path={path} />
      <UserInputLine>{children}</UserInputLine>
    </PromptContainer>
  );
};

export const ReadlinePrompt: FC<{ inputRef: Ref<{ focus: () => void }> }> = ({
  inputRef,
}) => {
  const { pwd, execute } = useFileSystem();

  return (
    <GenericPrompt path={pwd}>
      <CommandInput onEnter={execute} ref={inputRef} />
    </GenericPrompt>
  );
};

type TextPromptComponent = FC<{
  execution: IExecution;
}>;

export const TextPrompt: TextPromptComponent = ({ execution }) => {
  return (
    <TextPrompContainer>
      <GenericPrompt path={execution.dir}>
        <Text>{execution.script}</Text>
      </GenericPrompt>
      <Text>{execution.result}</Text>
    </TextPrompContainer>
  );
};
