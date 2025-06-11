# World Clock App

A React application that displays the current time and date across different time zones around the world.

![World Clock App Screenshot](screenshot.png)

## Description

The World Clock App allows users to view the current time and date in multiple time zones simultaneously. Users can add custom time zones by providing a city name and the corresponding IANA time zone identifier. The application updates the time every second to ensure accuracy.

## Features

- Display current time and date for multiple time zones
- Add custom time zones with city name and IANA time zone identifier
- Remove time zones that are no longer needed
- Real-time updates every second
- Responsive design that works on desktop and mobile devices
- User-friendly interface with helpful error messages

## Technologies Used

- React 19.1.0
- CSS3 with Flexbox for responsive layout
- JavaScript ES6+
- IANA Time Zone Database

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/junie-demo.git
   cd junie-demo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Viewing Time Zones

The application comes pre-loaded with several time zones:
- New York (America/New_York)
- London (Europe/London)
- Tokyo (Asia/Tokyo)
- Sydney (Australia/Sydney)
- Los Angeles (America/Los_Angeles)
- Bangalore (Asia/Kolkata)

### Adding a Custom Time Zone

1. Enter a city name in the "City Name" field (e.g., "Paris")
2. Enter the IANA time zone identifier in the "Time Zone" field (e.g., "Europe/Paris")
3. Click the "Add Time Zone" button

### Removing a Time Zone

Click the "×" button in the top-right corner of any time zone card to remove it from the display.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.