import { ChangeEvent, MouseEvent, useContext, useRef, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function SettingsEntry() {
  const { darkMode, updateDarkMode } = useContext(EntryContext) as EntryContextType;
  const [darkModeChecked, setDarkModeChecked] = useState<boolean>(darkMode);
  const inputRef = useRef(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDarkModeChecked(event.target.checked);
  };
  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    updateDarkMode(darkModeChecked);
  };

  return (
    <section
      className={`flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 p-8 rounded-md ${
        darkMode ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      <div className="flex-row">
        <text
          className={`gap-1 align-middle mr-1 ${darkMode ? "text-gray-50" : "text-black"}`}
          //  onClick={e => console.log(inputRef.current)}
        >
          Dark mode
        </text>
        <input
          ref={inputRef}
          type="checkbox"
          className="gap-1 align-middle ml-1"
          checked={darkModeChecked}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <button
        onClick={(e) => {
          handleSave(e);
        }}
        className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md"
      >
        Save
      </button>
    </section>
  );
}
