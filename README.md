# Client Documentation

## Development 
#### Use remote server
```js
npm i
npm start
```

#### Use local server
```js
npm i
npm start-local
```

## Production 
```js
npm i
npm run build 
```

## Runtime
* node@8+

## File Structure
```
xfolio-webapp/
    |---app/
        |   index.jsx    // Entry file
        |   theme.less  // Global less variables
        |
        |---assets/     // Static files
        |
        |---base/       // Base layout for the whole app
        |
        |---pages/      // Components that represent pages
        |
        |---components/ // Components
        |
        |---utils/      // Functions
```

## API
* [REST API](https://xfolio.cn/doc/index.html)
