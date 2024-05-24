import { BrowserRouter,Routes, Route } from "react-router-dom";
import ShowClientes from './components/ShowClientes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowClientes></ShowClientes>}></Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
