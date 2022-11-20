import React from 'react';
import './App.css';
import './fonts/stylesheet.css'
import {Route, Routes} from "react-router-dom";
import JobBoard from "./pages/job-board";
import DetailedJob from "./pages/detailed-job";
function App() {
  return (
      <>
          <main>
              <Routes>
                  <Route path="/" element={<JobBoard/>} />
                  <Route path="/job/:id" element={<DetailedJob/>} />
              </Routes>
          </main>
      </>
  );
}

export default App;
