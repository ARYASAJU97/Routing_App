import { BrowserRouter, Route, Routes} from "react-router-dom";
import Calculator from './Calculator1'
import MainPage from "./home";
import Weather1 from './Weather1';

function App() {
  return (
    <div className='div'>
    <BrowserRouter>
  
<Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/Weather1" element={<Weather1/>}/>
      <Route path="/calculator" element={<Calculator/>}/>
        </Routes>
        </BrowserRouter></div>
  );
}
 
export default App;
 