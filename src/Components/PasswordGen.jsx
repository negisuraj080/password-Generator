import React, { useState, useCallback, useEffect, useRef } from "react";

const PasswordGen = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [click, setClick] = useState("Copy");

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_+-={}[}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100); // Only select 100 chars
    window.navigator.clipboard.writeText(password);
    setClick("Copied");

    // Reset button text after 2 seconds
    setTimeout(() => {
      setClick("Copy");
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
    setClick("Copy"); // Reset button text when someone click on numbers and chars
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="max-w-[60%] mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-700 py-3">
      <h1 className="text-4xl text-center mb-4">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none py-1 px-3 w-[85%]"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipBoard} className="outline-none bg-blue-700 text-white px-3 py-1">
          {click}
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1 ">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1 ">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1 ">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGen;
