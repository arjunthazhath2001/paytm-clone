import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signup from "./pages/Signup"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signup/>}/>
        <Route path="/dashboard" element={<Signup/>}/>
        <Route path="/send" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
