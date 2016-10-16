/// <reference types="node" />
/** Create a SASS Build Task. */
export declare function sassBuildTask(destDir: string, srcRootDir: string, sassOptions?: any): () => NodeJS.ReadWriteStream;
/** Create a task that serves the index.html */
export declare function serverTask(liveReload?: boolean, streamCallback?: (stream: NodeJS.ReadWriteStream) => void): () => any;
