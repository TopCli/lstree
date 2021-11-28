declare namespace lstree {
  interface options {
    ignore?: string[];
    description?: Map<string, string>;
    depth?: number;
    showFilesDescriptor?: boolean;
  }

  export function tree(options?: options): (dir: string, pRootPath?: number) => void;
}

export as namespace lstree;
export = lstree;
