

# Viewstrap SCSS Maintenance

**Table of Contents**
- Component types
- Creating a new component
- Modifying a component
- Fixing bugs

## Component Types

In Viewstrap, **everything is a component**. With this ideology, all parts of the Viewstrap style are flexible, infinitely (but don't go too crazy) composable, adaptable and maintainable. In grouping everything as a component, there are three mutually inclusive* classifications:

- **Trait Components**
- **Element Components**
- **Composed Components**

## Creating a New Component

1. Run `gulp new-component` and provide the name for your new component.

```
C:\dev\Viewstrap>gulp new-component

[?] Component name? button

Success! Component "button" created.

Don't forget to add this to "viewstrap.scss" when it's ready to be imported:

@import "components/button/_module";
```

2. Add the component to the Viewstrap stylesheet by appending the provided SCSS `@import` statement to `viewstrap.scss`.

3. Start adding styles for your `%component` (placeholders only!) inside the `_components.scss` file. Make a note of any **magic numbers** or values that are **susceptible to change** that you use:

```scss
%button {
    display: inline-block;
    margin: 0 0.5rem 0 0; // MAGIC NUMBER
    cursor: pointer;
    border-width: 1px; // MAGIC NUMBER
    border-style: solid;
    background-image: none;
}
```

4. Ask yourself, **how do these "magic numbers" fit into the rest of the Viewstrap style?** If they don't (i.e. if the numbers truly are magical and have no meaning), modify them so that they do.

In example, the `0.5rem` right margin on the button corresponds to our previously defined `$margin-x-half` value, which is used universally in Viewstrap. `1px` corresponds to the border width for general input components in our form (in which border width must be consistent), or `$form-border-width`.

5. Define these demystified "magic numbers" as **settings** in your `_module.scss` file with the naming convention of sausage-lower-case `${component}-{property}`. This will make it really easy to know which variable belongs to which component/property.

```scss
$button-margin: 0 $margin-x-half 0 0 !default; // Don't forget to !default all your settings!
$button-border-width: $form-border-width !default;
```

6. Add a theme! Though not necessary, you'll want to make a theme mixin if you think you'll be making multiple versions of the same theme (such as for different colors).

Themes are extended into your components by use of the `theme($component, $theme, $variation)` mixin, which finds the `%theme-{component}-{theme}` placeholder. This placeholder is all that's necessary to make a theme.

```scss
@mixin theme-button-viewpost(
    $bgcolor: $button-bgcolor,
    $color: if(is-dark($bgcolor), $button-type-color-light, $button-type-color-dark),
    $border-color: darken($bgcolor, $color-darken-percent),
    $bgcolor-hover: lighten($bgcolor, $color-lighten-percent),
    $color-hover: $color,
    $border-color-hover: darken($bgcolor-hover, $color-darken-percent)
) {
    @if $border-color { border-color: $border-color; }
    @if $bgcolor { background-color: $bgcolor; }
    @if $color {
        &, & > * { color: $color; }
    }

    &:disabled {
        opacity: $button-disabled-opacity;
    }

    &:hover, &:active {
        @if $border-color-hover { border-color: $border-color-hover; }
        @if $bgcolor-hover { background-color: $bgcolor-hover; }
        @if $color-hover {
            &, & > * { color: $color-hover; }
        }
    }
}

%theme-button-viewpost {
    @include theme-button-viewpost;

    &-primary { @include theme-button-viewpost($color-secondary); }

    &-secondary { @include theme-button-viewpost($color-white); }

    &-light { @include theme-button-viewpost(#efefef); }

    &-dark { @include theme-button-viewpost($color-black); }

    &-success { @include theme-button-viewpost($color-success); }
    
    &-failure { @include theme-button-viewpost($color-failure); }
}
```

You'll notice many different **variations** in the viewpost button theme, such as `&-primary`, `&-secondary`, etc. You can define themes in this way, so that the placeholder is `%theme-{component}-{theme}-{variation}`. Remember: *theme variations are optional!*

7. Now you're ready to export! You only need to do two things to successfully export a component:
- `@extend %{component};`
- `@include theme({component}, {theme});`

Exports are defined in the `_exports.scss` file. You can also define *component variants* inside here (examples shown below).

Why do we need a separate `_exports.scss` file? Why didn't we just define the styles inside of our exported class? A few reasons:
- **Single Responsibility Principle**: The exports should only be responsible for how styles are to be exported, including concerns around nomenclature (prefixed classes, BEM, etc.), nesting rules, namespacing, etc.
- **Reusability**: The defined component style should not be concerned about where it's exported, or if it's even exported at all. This gives us the ability to *reuse components styles* throughout Viewstrap, without exporting a plethora of "accessory" classes that we don't need. This will also reduce code output immensely.
- **Nomenclature**: It's much easier to enforce a naming system in files which have almost no style rules and limited nesting, as well as a clear hierarchy. This goes hand-in-hand with the single responsibility principle.

Here's the `_exports.scss` for our button example:

```scss
.vp-button {
    @extend %button;
    @include theme(button, $button-theme);

    &.primary { @include theme(button, $button-theme, primary); }
    &.secondary { @include theme(button, $button-theme, secondary); }
    &.light { @include theme(button, $button-theme, light); }
    &.dark { @include theme(button, $button-theme, dark); }
    &.success { @include theme(button, $button-theme, success); }
    &.failure { @include theme(button, $button-theme, failure); }

    &.left { @extend %button-left; }
    &.right { @extend %button-right; }
}
```
