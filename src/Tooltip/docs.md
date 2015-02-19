Used for tips! Supports all props of OverlayTrigger, with default being on hover.

<example name="Normal Case">
    <file name="demo.jsx">
        React.render(
            <div>
             <Tooltip content='Hey you hovered over a tooltip!'>
                 Tooltip Demo
             </Tooltip>
             <Tooltip content='Hey a click trigger tooltip!' trigger='click' placement='right'>
                 Tooltip
             </Tooltip>
             </div>
         , document.getElementById('demo'));
    </file>
</example>
