/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-09 21:26:56
 * @LastEditTime : 2022-06-07 23:15:18
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \react-ts\src\App.tsx
 * @Description  :
 */
import React from "react";
import './App.less';

function App() {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <div className="my-app" style={{ textAlign: "center" }}>
      <h2>hello, world!</h2>
      <div>
        <button onClick={handleClick}>show banner</button>
      </div>
      <div id="banner" style={{ visibility: isVisible ? "visible" : "hidden" }}>
        <p>这个条幅可以在修改时保持状态，你可以尝试修改</p>
      </div>
    </div>
  );
}

export default App;
