# 💻 Project Documentation - ReactPasswordValidator

## 📝 Project Description
This is a web application built with React that allows for management and verification of passwords according to predefined criteria. It checks password compliance with date format, minimum length requirements, and character content based on user's personal data. Importantly, the password must include at least half of the different letters from the name "Filip Świątek" which is hardcoded in the application logic.

## 🚀 Features
- 📄 User-friendly interface with a responsive layout.
- 📄 Functionality to add new passwords with validation checks.
- 📄 Capability to verify saved passwords against security criteria.
- 🌐 Storing passwords with specified dates in DD.MM.YYYY format.
- 🛡️ Password validation includes checks for length, presence of digits and letters, and a specific requirement to include letters from "Filip Świątek".

## 🛠️ Technologies
- ⚛️ React
- 📜 CSS (Montserrat from Google Fonts, custom styles)
- 📦 HTML5
- 🌐 JavaScript

## 📂 Project Structure
- `App.jsx`: Main application component containing UI logic.
- `index.css`: CSS style sheet defining the application's appearance.
- `main.jsx`: JavaScript file that initializes the rendering of the App component in the DOM.

## 🚀 How to Use
### Functional Buttons
- **Add New Password**
  - Enter the password and date in the respective fields.
  - Click to add the password. The app will check if the password meets the requirements: proper length, contains digits, letters, and at least half of the different letters from "Filip Świątek".
  - If the password is valid, it will be added to the list.

- **Check Password Validity**
  - Click to verify whether the stored passwords meet all criteria, including the special character requirement.
  - The app evaluates each password and displays the results on the screen.

### Error Handling
- Error messages (e.g., "Incorrect date format", "Password must contain at least one digit and half of the different letters from the full name") are displayed below the buttons.

### Customizing Validation Criteria
To change the name used for password validation, modify the `fullName` variable in the `useEffect` hook and update the `nameCharacters` set as shown below:

```javascript
useEffect(() => {
    const fullName = "NewNameHere";  // Change "FilipŚwiątek" to any name you wish to use for validation
    setNameLength(fullName.length);
}, []);

const nameCharacters = new Set(
    "NewNameHere".replace(/\s+/g, "").toLowerCase().split("")
    // Replace "FilipŚwiątek" with the same name added above
);
```

## 👨‍💻 Created by
- [YoFilip](https://github.com/YoFilip)


