import { useState } from "react";
import DatePicker from "./components/Datepicker";

function App() {
  const [myDates, setMyDates] = useState(new Date());
  console.log(myDates);
  return (
    <div className="flex h-svh w-full content-normal items-center justify-center">
      <div className="mx-auto w-max">
        <DatePicker
          calendarType="Persian"
          size="small"
          value={myDates}
          onChange={(e) => {
            setMyDates(e);
          }}
        />
      </div>
    </div>
  );
}

export default App;
