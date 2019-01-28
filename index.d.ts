declare namespace lstree {
    interface options {
        ignore?: string[];
        description?: Map<string, string>;
        depth?: number;
        view?: boolean;
    }

    function lstree(dir: string, pRootPath?: number): void;
    export function tree(options?: options): lstree;
}

export as namespace lstree;
export = lstree;
