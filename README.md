# Air Quality Monitoring

[Open the App](https://brajendraswain.github.io/aqi-report/)

## About the App

This app shows city-wise Air Quality Index in an interactive table.

## Features:

-   City-wise current AQI(Air Quality Index) is shown in a table.
-   AQI changes in realtime
-   AQI color follows a special color range
-   Whenever there is a change in color range, row background highlighted with either green(if the new range is of less pollution ie. bad -> good) or red(if the new range is of more pollution ie. good -> bad)
-   To see the timeline chart for AQI for a specific city, click the respective row in the table
-   `CTRL + CLICK` on rows To add multiple cities into the chart to compare

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Deployment

### `yarn deploy`

it will deploy the changes to github pages.
