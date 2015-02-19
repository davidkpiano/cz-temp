This is used internally to implement things that need overlay support (EVERYTHING)

<example name="Normal Usage">
<file name="demo.jsx">
React.render(<div>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="hover" showArrow={true}><span>Mouse Over</span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="click" showArrow={true}><span>Click</span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="click" placement="left" showArrow={true}><span>Left </span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="click" placement="top" showArrow={true}><span>Top</span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="click" placement="bottom" showArrow={true}><span>Bottom</span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="click" placement="bottom-right" showArrow={true}><span>Bottom-Right</span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="click" placement="bottom-left" showArrow={true}><span>Bottom-Left</span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="click" placement="top-right" showArrow={true}><span>Top-Right</span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="click" placement="top-left" showArrow={true}><span>Top-Left</span></OverlayTrigger></p>
<p><OverlayTrigger overlay={<span>Hi</span>} trigger="focus" showArrow={true}><input placeholder="Focus"/></OverlayTrigger></p>
</div>, document.getElementById("demo"));
</file>
</example>
