Typeahead reference implementation. The assumption is there will be a call to a data source that returns `results`. These results can be parsed, their display customized and the output sent to TypeaheadResults. Each result that we want to be selectable should be wrapped in a TypeaheadItem.Type '1' to see an example.

 This component is composed of Typeahead, TypeaheadItem and TypeaheadResults.

### Typeahead
Responsible for rendering the input box, the icon states and the result dropdown.

**PropTypes Accepted**

- onChange: React.PropTypes.func.isRequired -- Callback on each change of the input.
- currentSearchTerm: React.PropTypes.string.isRequired -- Current value of the search term. This is what gets displayed in the input.
- onClick: React.PropTypes.func -- Triggered on clicking the input.
- displayResultsInitially: React.PropTypes.bool -- Tied to initialResults below, this is the TypeaheadResults displayed if initialResult is true.- initialResults: React.PropTypes.node -- On initial focus, should it display results.
- placeholder: React.PropTypes.string -- Passed to the input element.
- children: Custom validation -- Typeahead only accepts a single child of type TypeaheadResult.

### TypeaheadResults
A container for TypeaheadItem. Handles keyboard navigation logic inside of result dropdown.

**PropTypes Accepted**

- results: React.PropTypes.arrayOf(React.PropTypes.object).isRequired -- An array of TypeaheadItem data. Used to calculate selected item via key:id comparison.
- currentSelectionIndex: React.PropTypes.number.isRequired -- Index of the current selected item in the result array.
- onSelectionChange: React.PropTypes.func.isRequired -- Callback to change currentSelectionIndex handled by consumer.

### TypeaheadItem
Used to define an actual result item that is selectable or clickable vs. components like images, header titles, etc. that might also exist on a TypeaheadResult.
 
**PropTypes Accepted**

- I can't make this into a list sorry. It parses incorrectly.
- data: React.PropTypes.object.isRequired -- The data object backing the item. This object is passed to onClick callbacks that might exist on the component.
- url: React.PropTypes.string -- If this exists, we render the TypeaheadItem wrapped in an anchor tag with the URL.

<example name="Normal Case">
    <file name="demo.jsx">
        React.render(<SearchTypeahead />, document.getElementById("demo"));
    </file>
</example>

