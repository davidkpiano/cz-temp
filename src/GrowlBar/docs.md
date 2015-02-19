 GrowlBar to be used with a controlling component. Positioned 100% within its parent container

 <example name="Typical Usage">
    <file name="demo.jsx">
        React.render(
        <div>
            <GrowlBar type="success" content={'Success!'}/>
            <GrowlBar type="warn" content={'A warning'}/>
            <GrowlBar type="error" content={'An error'}/>
            <GrowlBar content={'Just some information'}/>
        </div>, document.getElementById('demo'));
    </file>
 </example>
