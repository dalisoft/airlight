# swipe-gesture

Swipe gesture library

**Note**: _This library focused to performance and simplicity. For complex usecase (like long-tap or pinch), please use other library_

## Features

- No limit: not only for DOM
- Handles types for your
- Clean code
- Simple & Easy
- Performant
- UMD compatible

## Demos

- [Simple demo](https://codepen.io/dalisoft/pen/vwKrpw)

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i @dalisoft/swipe-gesture
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const SwipeGesture = require('@dalisoft/swipe-gesture');

// Browser
// window.SwipeGesture OR SwipeGesture

// ES6
import SwipeGesture from '@dalisoft/swipe-gesture';
```

## Parameters

- _onPointerDown_ `function(e: Event)` - Call like `pointerdown`
- _onPointerMove_ `function(e: Event)` - Call like `pointermove`
- _onPointerUp_ `function()` - Call like `pointerup`, but without `Event` for performance reason
- _onPanX_ `function(e: Event.X.Delta)` - Call when panning horizontal
- _onPanY_ `function(e: Event.Y.Delta)` - Call when panning vertical
- _onSwipeLeft_ `function(e: Event.X.Delta)` - Call when swipe left
- _onSwipeRight_ `function(e: Event.X.Delta)` - Call when swipe right
- _onSwipeUp_ `function(e: Event.Y.Delta)` - Call when swipe up
- _onSwipeDown_ `function(e: Event.Y.Delta)` - Call when swipe down

## Usage

```js
const swipe = SwipeGesture({
  onPanX: (delta) => console.log('pan x delta', delta)
});

yourDom.addEventListener('pointerdown', swipe.onStart);
yourDom.addEventListener('pointermove', swipe.onMove);
yourDom.addEventListener('pointerup', swipe.onEnd);
```

## License

MIT
