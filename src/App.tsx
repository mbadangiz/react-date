import { useState } from "react";
import "./App.css";
import DatePicker from "./components/Datepicker";

function App() {
  const [count, setCount] = useState(new Date());

  return (
    <>
      <DatePicker
        value={count}
        onChange={(e) => {
          console.log(e);
        }}
      />
    </>
  );
}

export default App;
