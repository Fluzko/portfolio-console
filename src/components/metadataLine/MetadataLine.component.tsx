import { HiUserCircle as UserIcon } from "react-icons/hi";
import { AiFillFolder as FolderIcon } from "react-icons/ai";
import {
  DirectoyContainer,
  MetadataContainer,
  UserContainer,
} from "./MetadataLine.styles";
import { FC } from "react";

type MetadataLineComponent = FC<{ user: string; path: string }>;

export const MetadataLine: MetadataLineComponent = ({ user, path }) => {
  return (
    <MetadataContainer>
      <UserContainer>
        <UserIcon />
        <span>{user}</span>
        <span>on</span>
      </UserContainer>
      <DirectoyContainer>
        <FolderIcon />
        <span>{path}</span>
      </DirectoyContainer>
    </MetadataContainer>
  );
};
