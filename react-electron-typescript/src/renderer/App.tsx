/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-09 21:26:56
 * @LastEditTime : 2022-06-09 00:12:58
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \react-electron-typescript\src\renderer\App.tsx
 * @Description  :
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementByAmountAsync,
  selectCount,
} from "./store/slices/couter.slice";
import store, { AppDispatch } from "./store";
import {IPC} from "../preload";

declare global {
  interface Window {
    ipc: IPC;
  }
}

function AppSon() {
  const count = useSelector(selectCount);
  return <div>{count}</div>;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const [isVisible, setIsVisible] = React.useState(false);
  const [replyMsg, setReplyMsg] = React.useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.ipc.sendMsg("hello, world").then();

    setIsVisible(!isVisible);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      window.ipc.receiveMsg().then(msg => {
        console.log(msg);
        setReplyMsg(msg);
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-app" style={{ textAlign: "center" }}>
      <h2>hello, world!</h2>
      <div className={"versions"}>
        <span>{ replyMsg }</span>
      </div>
      <div>
        <button onClick={handleClick}>
          {isVisible ? "hidden" : "show"} banner
        </button>
      </div>
      <div id="banner" style={{ visibility: isVisible ? "visible" : "hidden" }}>
        <p>这个条幅可以在修改时保持状态...你可以尝试修改</p>
      </div>
      <p>测试 react-redux 的功能</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
      <button onClick={() => store.dispatch(incrementByAmountAsync(20))}>
        +20 Async (1000ms later)
      </button>
      <div>
        <AppSon />
      </div>
    </div>
  );
}

export default App;
