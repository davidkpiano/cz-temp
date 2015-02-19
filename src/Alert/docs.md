Hey, stop what you are doing and take a look at me, I'm an alert.  I come in stylish blue, pink, yellow, and green.  I the rockstar of the DIV world, but I'm incapable of closing myself, though, so you'll have to take care of hiding me on dismissal.
- alertType: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']) | yep
- dismissCallback: React.PropTypes.func | if provided this function will be called when the X is clicked...boom
<example name="Normal Case">
      <file name="demo.jsx">
          var callbackFn = function() {
              console.log('i am a callback function, it is my responsibility to close the alert')    
          }
         React.render(<div>
              <Alert alertType="success">You did it.  We're so proud of you (success)</Alert>
              <Alert alertType="info">Tuesday is Taco Tuesday (info)</Alert>
              <Alert alertType="warning">Soylent Green is people (warning)</Alert>
              <Alert alertType="danger">Don't eat the brown acid (danger)</Alert>
              <Alert alertType="success" dismissCallback={callbackFn}>You're action was completed (success)</Alert>
              <Alert alertType="info" dismissCallback={callbackFn}>Viewpost provides a positive payments experience (info)</Alert>
             <Alert alertType="warning" dismissCallback={callbackFn}>Hey man, quit clicking the buttons over and over quickly like that (warning)</Alert>
             <Alert alertType="danger" dismissCallback={callbackFn}>Stop now and call customer support (danger)</Alert>
        </div>, document.getElementById("demo"));
    </file>
</example>
