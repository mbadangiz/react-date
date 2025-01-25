import { useState } from "react";
import DatePicker from "./components/Datepicker";

function App() {
  const [myDates, setMyDates] = useState(new Date());
  return (
    <div className="mx-auto w-max py-5">
      <DatePicker
        calendarType="Gregorian"
        size="small"
        value={myDates}
        onChange={(e) => {
          setMyDates(e);
        }}
      />
    </div>
  );
}

export default App;
