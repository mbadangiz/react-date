import { DatePicker } from "./components/Datepicker";

function App() {
  return (
    <div className="flex h-full w-full flex-wrap content-center items-center justify-center">
      <DatePicker
        calendarType="Gregorian"
        onChange={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}

export default App;
