import { useState, useEffect } from "react";

export default function Cursor () {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  // Listen to changes in the theme
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (
                mutation.type === "attributes" &&
                mutation.attributeName === "data-theme"
            ) {
                // The "theme" attribute on the HTML tag has changed, so dispatch a custom event
                const themeChangeEvent = new CustomEvent("themechange", {
                    detail: mutation.target.getAttribute("data-theme"),
                });
                window.dispatchEvent(themeChangeEvent);
            }
        }
    });

    // Start observing changes in the "theme" attribute of the HTML tag
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
    });

    // Clean up the observer when the component unmounts
    return () => {
        observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleThemeChange = (event) => {
        console.log("Theme changed to:", event.detail);
        setCurrentTheme(event.detail);
    };

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const maxX = window.innerWidth;
      const maxY = window.innerHeight;
      console.log(clientX, clientY)
      // Check if cursor is within window bounds
      if (clientX >= 0 && clientX <= maxX && clientY >= 0 && clientY <= maxY) {
        setPosition({ x: clientX, y: clientY });
      } else {
        setPosition({ x: -1, y: -1 });
      }
    }

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("themechange", handleThemeChange);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("themechange", handleThemeChange);
    };
  }, []);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  // If cursor is outside window bounds, don't render it
  if (position.x < 0 || position.y < 0) {
    return null;
  }

  return (
    <div className="absolute z-50 pointer-events-none" style={{ left: position.x - (isPressed ? 10 : 15), top: position.y - (isPressed ? 10 : 15) }}>
      <svg
        width={isPressed ? 20 : 30}
        height={isPressed ? 20 : 30}
        viewBox={`0 0 ${isPressed ? 20 : 30} ${isPressed ? 20 : 30}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <circle
          cx={isPressed ? 10 : 15}
          cy={isPressed ? 10 : 15}
          r={isPressed ? 10 : 15}
          fill={currentTheme === "light" ? "#dc8a78" : "#f2d5cf"}
        />
      </svg>
    </div>
  );
};
