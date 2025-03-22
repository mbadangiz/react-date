# React Date

A modern, customizable date picker component for React applications with support for both Gregorian and Persian (Jalaali) calendars.

## Features

- Support for both Gregorian and Persian (Jalaali) calendars
- RTL support
- Customizable styling with Tailwind CSS
- TypeScript support
- Responsive design
- Keyboard navigation
- Accessible

## Authors

- [@Mohammad Badangiz](https://github.com/mbadangiz)

## Installation

```bash
npm i react-date-lib
# or
yarn add react-date-lib
```

## Usage

```jsx
import DatePicker from "react-date";

function App() {
  const handleDateChange = (date) => {
    console.log("Selected date:", date);
  };

  return (
    <DatePicker
      onChange={handleDateChange}
      calendarType="Persian" // or "Gregorian"
      size="large" // "small" | "medium" | "large"
      placeholder="Select a date"
      value={new Date()}
    />
  );
}
```

## Props

| Prop           | Type                                                 | Default     | Description                             |
| -------------- | ---------------------------------------------------- | ----------- | --------------------------------------- |
| `onChange`     | `(date: Date) => void`                               | -           | Callback function when date is selected |
| `calendarType` | `"Persian" \| "Gregorian"`                           | `"Persian"` | Type of calendar to display             |
| `size`         | `"small" \| "medium" \| "large"`                     | `"large"`   | Size of the date picker                 |
| `inputClass`   | `string`                                             | -           | Additional CSS classes for the input    |
| `placeholder`  | `string`                                             | -           | Placeholder text for the input          |
| `value`        | `Date`                                               | -           | Selected date value                     |
| `boxPosition`  | `"Top" \| "Bottom" \| "Left" \| "Right" \| "Middle"` | `"Bottom"`  | Position of the date picker box         |

## License

[MIT](https://choosealicense.com/licenses/mit/)
