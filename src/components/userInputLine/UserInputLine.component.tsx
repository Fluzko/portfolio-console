import { FC, ReactNode } from "react";
import { Hash, UserInputContainer } from "./UserInputLine.styles";

type IUserInputLine = FC<{ children: ReactNode }>;

export const UserInputLine: IUserInputLine = ({ children }) => {
  return (
    <UserInputContainer>
      <Hash>#</Hash>
      {children}
    </UserInputContainer>
  );
};
