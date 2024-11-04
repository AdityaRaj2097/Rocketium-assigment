
import TextEditor from "../src/component/document";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { v4 as uuidV4 } from "uuid"
function App() {
  console.log(" insdine the app2")
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
      <Route path="/documents/:id" element={<TextEditor />} />
    </Routes>
  </Router>

    
  );
}

export default App;
