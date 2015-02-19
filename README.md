<pre>
                  .---.
                  |   |
                  |   |
                  |   |
              __.-'   |
             (____.--_|              
             \ \   / (_) _____      _____| |_ _ __ __ _ _ __  
              \ \ / /| |/ _ \ \ /\ / / __| __| '__/ _` | '_ \ 
               \ V / | |  __/\ V  V /\__ \ |_| | | (_| | |_) |
                \_/  |_|\___| \_/\_/ |___/\__|_|  \__,_| .__/ 
                                                       |_|    
</pre>

A component library for Viewpost.

**Note**: React version 0.12 RC is used, with a lot of changes. [Announcement](http://facebook.github.io/react/blog/2014/10/16/react-v0.12-rc1.html). `transferPropsTo` is being deprecated, more info [here](https://gist.github.com/sebmarkbage/a6e220b7097eb3c79ab7).

**Goals**
- Low-level, composable components to be used as building blocks.
- Accessibility aware (ARIA roles, tabindex, alternative text).
- Decoupled from Strawman, allowing contributions and versioning outside of story development.

### References / State of the art
- [React-Bootstrap](http://react-bootstrap.github.io/components.html)
- [React-Widgets](http://theporchrat.github.io/react-widgets/docs/)


##Component Guidelines##

- Take advantage of the syntatic sugar ES6 features provided by the built-in JSX transpiler. This works in JS and JSX files.
  - [Fat arrow functions](https://github.com/lukehoban/es6features#arrows)
  - [Object short notation](https://github.com/lukehoban/es6features#enhanced-object-literals)
  - [Template strings](https://github.com/lukehoban/es6features#template-strings)
  - [Destructuring](https://github.com/lukehoban/es6features#destructuring)
  - [Default, Rest, Spread](https://github.com/lukehoban/es6features#default--rest--spread)
- Include the `displayName` property in your components explicitly. This generates cleaner exception messages during debugging.
- Include `propTypes` for all props.
- Take advantage of already written mixins (found in `./src/Utils`)
- Try to cascade HTML attributes. `<Button id='AUI-ID-HERE' />` should attempt to render `<button id='AUI-ID-HERE' />`
- Unit tests and documentation should be present
- Incorporate [style guidelines (WIP)](https://docs.google.com/document/d/1DUFjE_XGZvhmBtIoNKQ6v8pxzEm59KoPuWR3EM8Cv8g/edit?invite=CMKTxeEJ&pli=1)
- We have no dependency on jQuery and components should be written with no implicit jQuery requirement. Take care of cross-browser issues (IE8 primarily) in things like events if using them outside of React's synthetic eventing (`event.preventDefault`, `event.stopPropagation`).

### Installation

1. `npm install` from the root directory.

### Quickstart - Running the Styleguide
- `gulp styleguide`
- Navigate to `localhost:5678`
- That's it!

### Usage
- `gulp sass` to compile sass (and autoprefix)
- `gulp build-docs` to generate the KSS documentation from component LESS files.
- `gulp build` to generate the NPM package.
- `gulp test` to start Karma in continuous mode.
- `gulp watch` to start developmental the server and enter watch mode, located at `localhost:5555`.

### Updating the Styleguide
- Make **all** styleguide changes in `/styleguide/sections/{section}.html`.
- Make any style changes in the `/scss/` directory, as normal. See [Sass Maintenance](sass-maintenance.md) for more info.
- You might need to `gulp styleguide` again, especially if you added a new section.


### Current Technology Stack
- HTML and CSS for documentation
- React for components
- SCSS for styling
- Karma as test runner
- Jasmine as test framework
