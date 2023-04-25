type DirectoryMap = { [key: string]: Directory | null };

export interface Directory {
  name: string;
  ls: (dir?: string) => DirectoryMap | undefined;
}

export class Folder implements Directory {
  private directories: DirectoryMap;
  name: string;

  constructor(name: string, private parent?: Folder) {
    this.directories = {
      ".": this,
      ...(this.parent && { "..": this.parent }),
    };
    this.name = name;
  }

  mkdir(dir: string) {
    const newDir = new Folder(dir, this);
    this.directories[dir] = newDir;
    return newDir;
  }

  addFile(name: string, content: string) {
    this.directories[name] = new DirFile(name, content, this);
  }

  ls(dir?: string): DirectoryMap | undefined {
    if (!dir) return this.directories;

    if (!this.directories[dir])
      throw new Error(`ls: ${dir}: No such file or directory`);

    return this.directories[dir]?.ls();
  }

  cd(dir: string): Folder {
    const childDir = this.directories[dir];
    if (childDir instanceof Folder) return childDir;
    throw new Error("can't cd into a directory that's not a folder");
  }

  pwd(): string {
    if (!this.parent) return this.name;
    return `${this.parent.pwd()}/${this.name}`;
  }

  getFile(fileName: string): DirFile | undefined {
    const dir = this.directories[fileName];
    if (dir instanceof DirFile) return dir;
  }
}

export class DirFile implements Directory {
  name: string;
  content: string;

  constructor(name: string, content: string, private parent: Folder) {
    this.name = name;
    this.content = content;
  }

  cat() {
    return this.content;
  }

  ls() {
    return { [this.name]: this };
  }
}
