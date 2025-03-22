# React Date

React-Date is a React datepicker library

## Authors

- [@Mohammad Badangiz](https://github.com/mbadangiz)

## Installation

Use the package manager npm to install foobar.

```bash
npm i react-date
```

## Usage

```javascript
import { useState } from "react";
import DatePicker from "./components/Datepicker";

function App() {
  const [myDates, setMyDates] = useState(new Date());
  console.log(myDates); // will logs date user choose
  return (
      <>
        <DatePicker
          calendarType="Persian"
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

```

## Props

- value\* : Selected value
- onChange\*
- calendarType (optional) : "Persian" | "Gregorian" default is "Persian"
- boxPosition (optional) : "Top" | "Bottom" | "Left" | "Right" | "Middle" By default, it automatically positions itself relative to the screen size.
- inputClass (optional) : To change the style of the date selection button
- placeholder (optional)
- size : "small" | "medium" | "large" To resize the date picker box

## License

[MIT](https://choosealicense.com/licenses/mit/)
