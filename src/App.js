import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskPage from "./components/TaskPage";
import TaskDetails from "./components/TaskDetails";
import TaskFrom from './components/TaskForm';
import { Provider } from './components/ui/provider'

function App() {
  return (
    <Provider >
      
      <Router>
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/assignments/:taskId" element={<TaskDetails />} />
        <Route path="/assignments/taskform" element={<TaskFrom />} />
        <Route path="/assignments/edit/:taskId" element={<TaskFrom />} />
      </Routes>
    </Router>

    </Provider>
  );
}

export default App;