// App.jsx
import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./components/Header";
import { PreferencesProvider } from "./contexts/UserPreferencesContext";

export default function App() {
  const meta = useLoaderData(); // global meta.json

  return (
    <PreferencesProvider>
      <div className="app">
        <Header meta={meta} /> {/* app-wide header using meta */}
        <main>
          <Outlet context={{ meta }} /> {/* pass meta to all child routes */}
        </main>
      </div>
    </PreferencesProvider>
  );
}
