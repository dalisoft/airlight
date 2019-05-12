# swipe-gesture

[![Greenkeeper badge](https://badges.greenkeeper.io/dalisoft/swipe-gesture.svg)](https://greenkeeper.io/)

Swipe gesture library

## Features

- No limit: not only for DOM
- Handles types for your
- Clean code
- Performant
- Easy
- UMD compatible

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i @dalisoft/swipe-gesture
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const SwipeGesture = require("@dalisoft/swipe-gesture");

// Browser
// window.SwipeGesture OR SwipeGesture

// ES6
import SwipeGesture from "@dalisoft/swipe-gesture";
```

## Parameters

- _onPointerDown_ `function(e: Event)` - Call like `pointerdown`
- _onPointerMove_ `function(e: Event)` - Call like `pointermove`
- _onPointerUp_ `function(e: Event)` - Call like `pointerup`
- _onPanX_ `function(e: Event.X.Delta)` - Call when panning horizontal
- _onPanY_ `function(e: Event.Y.Delta)` - Call when panning vertical
- _onSwipeLeft_ `function(e: Event.X.Delta)` - Call when swipe left
- _onSwipeRight_ `function(e: Event.X.Delta)` - Call when swipe right
- _onSwipeUp_ `function(e: Event.Y.Delta)` - Call when swipe up
- _onSwipeDown_ `function(e: Event.Y.Delta)` - Call when swipe down

## Usage

```js
const swipe = SwipeGesture({
  onPanX: delta => console.log("pan x delta", delta)
});

yourDom.addEventListener("pointerdown", swipe.onStart);
yourDom.addEventListener("pointermove", swipe.onMove);
yourDom.addEventListener("pointerup", swipe.onEnd);
```

## License

MIT
