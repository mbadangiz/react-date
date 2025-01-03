import { DatePicker } from "./components/Datepicker";

function App() {
  return (
    <div className="mx-auto w-max">
      <DatePicker
        calendarType="Persian"
        onChange={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}

export default App;
