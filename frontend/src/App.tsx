import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EntryContextType } from "./@types/context";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import SettingsEntry from "./routes/SettingsEntry";
import { EntryContext, EntryProvider } from "./utilities/globalContext";

export default function App() {
  const { darkMode } = useContext(EntryContext) as EntryContextType;

  return (
    <section className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<AllEntries />}></Route>
          <Route path="create" element={<NewEntry />}></Route>
          <Route path="edit/:id" element={<EditEntry />}></Route>
          <Route path="settings" element={<SettingsEntry />}></Route>
        </Routes>
      </Router>
    </section>
  );
}
