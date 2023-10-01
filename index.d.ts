export interface LSTreeOptions {
  ignore?: string[];
  description?: Map<string, string>;
  depth?: number;
  showFilesDescriptor?: boolean;
  showTitle?: boolean;
  title?: string;
  margin?: {
    top?: number;
    left?: number;
    bottom?: number;
  };
}
  
export default function tree(options?: LSTreeOptions): (dir: string, pRootPath?: number) => Promise<void>;
