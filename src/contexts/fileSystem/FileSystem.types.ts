import { ReactNode } from "react";

export enum Command {
    LS = "ls",
    CD = "cd",
    CAT = "cat",
    CLEAR = "clear",
  }
  
  export interface IFileSystem {
    execute: (script: string) => void;
    pwd: string;
    executionStack: IExecution[];
    user: string;
  }
  
  export interface IExecution {
    script: string;
    cmd: string;
    result?: ReactNode;
    dir: string;
  }