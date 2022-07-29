import { contextBridge, ipcRenderer } from "electron";
import { EVENTS } from "constant";

export type IPC = {
  sendMsg(msg: string): Promise<string>;
  receiveMsg(): Promise<string>;
}

const IPC_API: IPC = {
  sendMsg: async (msg: string) => {
    return await ipcRenderer.invoke(EVENTS.SEND_MSG.toString(), msg);
  },
  receiveMsg: () => {
    return new Promise((res, rej) => {
      ipcRenderer.on(EVENTS.REPLY_MSG.toString(), (evt, msg: string) => {
        res(msg);
      })
    })
  }
}

contextBridge.exposeInMainWorld("ipc", IPC_API);
