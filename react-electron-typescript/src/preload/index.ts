import { contextBridge, ipcRenderer } from "electron";
import { IPC_CODE } from "constant";

export type IPC = {
  sayHello(): string;
  getVersions(): Promise<string>;
}

const IPC_API: IPC = {
  sayHello: () :string => {
    return "hello, world!";
  },
  async getVersions(): Promise<string> {
    return await ipcRenderer.invoke(IPC_CODE.getVersions);
  }
}

contextBridge.exposeInMainWorld("ipc", IPC_API);
