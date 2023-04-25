import {
  FC,
  ReactNode,
  createContext,
  createElement,
  useContext,
  useRef,
  useState,
} from "react";
import { Directory, Folder } from "../../models";
import { Colors } from "../../globals/colors";
import { Command, IExecution, IFileSystem } from "./FileSystem.types";
import { ConsoleFolder, DirectoryList } from "./FileSystem.components";

// fs
const userRoot = new Folder("~");

userRoot.addFile("linkedin", "https://www.linkedin.com/in/facundo-luzko");
userRoot.addFile(
  "cv",
  "https://docs.google.com/document/d/1sx0aoEQ3h7CFossd7HmLHqM0bTViy-4gklYf_Xyz9F4/edit?usp=sharing",
);
userRoot.addFile("contact", "-email: fluzko@gmail.com  -phone: +5491167672254");

const projects = userRoot.mkdir("projects");
projects.addFile("github", "https://github.com/Fluzko");

const python = projects.mkdir("python");
python.addFile(
  "playlist-migrator",
  "Migrates youtube playlist to spotify ones https://github.com/Fluzko/Youtube-Spotify-playlist-migrator",
);
python.addFile(
  "tinder-bot",
  "Selenium bot that auto-swipes https://github.com/Fluzko/Tinder-bot",
);
python.addFile(
  "data-analysis",
  "Cov-19 progression data analysis https://github.com/Fluzko/Covid-19-Argentina",
);
python.addFile(
  "sudoku-solver",
  "Sudoku solver with backtrack alorithm https://github.com/Fluzko/sudoku-solver",
);
python.addFile(
  "port-scanner",
  "simple python port scanner https://github.com/Fluzko/Port-Scanner",
);
python.addFile(
  "plagiarism-detector",
  "Plagiarism detector project done for uni subject https://github.com/Fluzko/NLP-Plagiarism-detection",
);

const javascript = projects.mkdir("javascript");
javascript.addFile("react-hangman", "https://github.com/Fluzko/react-hangman");
javascript.addFile(
  "api-geo",
  "POC of NestJS microservices + RabbitMQ https://github.com/Fluzko/Api-Geo",
);
javascript.addFile(
  "socket-basis",
  "POC of Socket.io with a small UI client https://github.com/Fluzko/nestjs-sockets-basis",
);
javascript.addFile(
  "async-arrays",
  "npm package to use async arrays done with JS Proxy https://github.com/Fluzko/async-array",
);

const ruby = projects.mkdir("ruby");
ruby.addFile(
  "tadspec",
  "small Ruby test framework done with meta-programming https://github.com/Fluzko/tadspec",
);

type FileSystemProviderComponent = FC<{ children: ReactNode }>;

const FileSystemProvider: FileSystemProviderComponent = ({ children }) => {
  const fs = useRef(userRoot);
  const [user] = useState("facundo");
  const [currentFolder, setCurrentFolder] = useState<Folder>(fs.current);
  const [executionStack, setExecutionStack] = useState<IExecution[]>([]);

  const destructureScript = (script: string): [string, string] => {
    const [cmd, dir] = script.split(" ");
    return [cmd, dir];
  };

  const pushToStack = (script: string, result?: ReactNode) => {
    const [cmd] = destructureScript(script);

    setExecutionStack(acc => {
      const newStack = [...acc];
      newStack.push({
        script,
        result,
        dir: currentFolder.pwd(),
        cmd,
      });
      return newStack;
    });
  };

  const ls = (script: string) => {
    const [, dir] = destructureScript(script);
    try {
      const dirs = currentFolder.ls(dir);
      const toConsoleValue = ([key, val]: [string, Directory | null]) => {
        if (val instanceof Folder)
          return <ConsoleFolder key={key}>{key}</ConsoleFolder>;
        return <span key={key}>{key}</span>;
      };

      pushToStack(
        script,
        <DirectoryList>
          {Object.entries(dirs || {}).map(toConsoleValue)}
        </DirectoryList>,
      );
    } catch {
      pushToStack(script, `${Command.LS}: ${dir}: No such file or directory`);
    }
  };

  const cd = (script: string) => {
    const [, dir] = destructureScript(script);
    try {
      if (!dir) setCurrentFolder(fs.current);
      else {
        const childFolder = currentFolder.cd(dir);
        setCurrentFolder(childFolder);
      }
      pushToStack(script);
    } catch (e) {
      pushToStack(script, `${Command.CD}: not a directory: ${dir}`);
    }
  };

  const cat = (script: string) => {
    const [, dir] = destructureScript(script);

    const urlify = (text: string) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;

      return text.split(urlRegex).map((word, index) =>
        urlRegex.test(word)
          ? createElement(
              "a",
              {
                href: word,
                key: index,
                target: "_blank",
                style: { color: Colors.GREY },
              },
              word,
            )
          : word,
      );
    };

    try {
      const file = currentFolder.getFile(dir);
      if (file) {
        pushToStack(script, urlify(file?.content));
      } else {
        pushToStack(
          script,
          `${Command.CAT}: ${dir}: No such file or directory`,
        );
      }
    } catch (e) {
      pushToStack(script, `${Command.CAT}: ${dir}: Is a directory`);
    }
  };

  const clear = () => {
    setExecutionStack([]);
  };

  const execute = (script: string) => {
    const [cmd] = destructureScript(script);

    const cmdToScript = {
      [Command.LS]: ls,
      [Command.CD]: cd,
      [Command.CAT]: cat,
      [Command.CLEAR]: clear,
    };

    const commandNotFound = () =>
      pushToStack(script, `zsh: command not found: ${cmd}`);

    (cmdToScript[cmd as Command] || commandNotFound)(script);
  };

  const value: IFileSystem = {
    execute,
    pwd: currentFolder.pwd(),
    executionStack,
    user,
  };
  return <FileSystem.Provider value={value}>{children}</FileSystem.Provider>;
};

const FileSystem = createContext<IFileSystem>({} as IFileSystem);

const useFileSystem = () => useContext(FileSystem);

export type { IExecution };
export { FileSystemProvider, useFileSystem, FileSystem };
