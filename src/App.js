import { useEffect, useRef, useState } from "react";
import "./assets/App.css";

let mouseClicked = false;
let mousePosition = null;
let mouseCoordinate = { x: 0, y: 0 };
let containerHeight = 0;
let containerWidth = 0;

function App() {
  const [container, setContainer] = useState({
    height: "90vh",
    width: "80vw",
  });

  const [containerCursor, setContainerCursor] = useState("default");
  const containerRef = useRef();

  useEffect(() => {
    containerHeight = containerRef.current.clientHeight;
    containerWidth = containerRef.current.clientWidth;
  }, []);

  return (
    <div
      className="container"
      ref={containerRef}
      style={{
        height: `${container.height}`,
        width: `${container.width}`,
      }}
    >
      <div
        className="resizable-boundary"
        onMouseDown={(e) => {
          let eleClass = e.target.classList[0];
          if (
            eleClass === "top" ||
            eleClass === "left" ||
            eleClass === "right" ||
            eleClass === "bottom"
          ) {
            mouseClicked = true;
            mousePosition = eleClass;
            mouseCoordinate = { x: e.pageX, y: e.pageY };

            setContainerCursor(
              mousePosition === "top" || mousePosition === "bottom"
                ? "row-resize"
                : "col-resize"
            );
          } else {
            mouseClicked = false;
            mousePosition = null;
            setContainerCursor("default");
            containerHeight = containerRef.current.clientHeight;
            containerWidth = containerRef.current.clientWidth;
          }
        }}
        onMouseUp={() => {
          mouseClicked = false;
          mousePosition = null;
          setContainerCursor("default");
          containerHeight = containerRef.current.clientHeight;
          containerWidth = containerRef.current.clientWidth;
        }}
        // onMouseLeave={() => (mouseClicked = false)}
        onMouseMove={(e) => {
          if (mouseClicked) {
            console.log(
              mouseClicked,
              mousePosition,
              e.pageX,
              e.pageY,
              containerHeight,
              mouseCoordinate.x,
              mouseCoordinate.y,
              e.pageY - mouseCoordinate.y
            );
          }

          if (mouseClicked && mousePosition === "top") {
            setContainer((pre) => ({
              ...pre,
              height: `${containerHeight - (e.pageY - mouseCoordinate.y)}px`,
            }));
          }

          if (mouseClicked && mousePosition === "bottom") {
            setContainer((pre) => ({
              ...pre,
              height: `${containerHeight - (mouseCoordinate.y - e.pageY)}px`,
            }));
          }

          if (mouseClicked && mousePosition === "left") {
            setContainer((pre) => ({
              ...pre,
              width: `${containerWidth - (e.pageX - mouseCoordinate.x)}px`,
            }));
          }
          if (mouseClicked && mousePosition === "right") {
            setContainer((pre) => ({
              ...pre,
              width: `${containerWidth - (mouseCoordinate.x - e.pageX )}px`,
            }));
          }
        }}
        style={{ cursor: containerCursor }}
      >
        <div className="top"></div>
        <div className="left"></div>
        <div className="right"></div>
        <div className="bottom"></div>

        <div className="resizable-container"></div>
      </div>
    </div>
  );
}

export default App;
