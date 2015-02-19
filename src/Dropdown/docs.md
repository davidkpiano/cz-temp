A dropdown, made up of `MenuItem`

 <example name="Typical Usage">
    <file name="demo.jsx">
        React.render(<Dropdown title="Toggle Dropdown" caret={true}>
                        <MenuItem header={true}>A Header Item</MenuItem>
                        <MenuItem divider={true} />
                        <MenuItem href="http://www.google.com">A link</MenuItem>
                      </Dropdown>, document.getElementById('demo'));
    </file>
 </example>
