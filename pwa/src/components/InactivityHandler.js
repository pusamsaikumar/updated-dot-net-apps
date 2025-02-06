import React, { useEffect, useRef } from "react";

const InactivityHandler = () => {
  const inactivityTimeoutRef = useRef(null);

  const removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
    console.log(`${key} removed from localStorage`);
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(() => {
      localStorage.clear();
      console.log(`removed localStorage`);
      window.location.reload();
    }, 60000); // 60000 milliseconds = 1 minute
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];

    events.forEach((event) => {
      document.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetInactivityTimer);
      });
      clearTimeout(inactivityTimeoutRef.current);
    };
  }, []);

  return null;
};

export default InactivityHandler;
