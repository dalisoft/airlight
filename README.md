# react-es6-tween

An declarative React.js wrapper for es6-tween tweening library

## Frameworks

- [react-es6-tween](https://github.com/dalisoft/react-es6-tween)

## Installation

```bash
npm i react-es6-tween
# or
yarn i react-es6-tween
```

## Usage

Note: _For detailed info about how-to use and how it works, please refer to [es6-tween](https://github.com/tweenjs/es6-tween) repository_

```js
import React from 'react';
import ES6Tween from 'react-es6-tween';

const MyAnimation = () => (
  <ES6Tween from={{ x: 0 }} to={{ x: 200 }}>
    <div id="my-node" />
  </ES6Tween>
);
```

See `example.html` at GitHub repository of `react-es6-tween` for better understanding

Warning: _When component is unmounted, tween will be stopped and can be resume after only remount_

## Props

### Updateable props

- `isPlaying` [optional] - If false, tween pauses until you pass true
- `isStopeed` [optional] - If true, tween will stop and removed from tick store
- `isReversed` [optional] - If true, tween will reverse (like `from <-> to`)

### Static Props

- `from` [required] - Tween initial value
- `to` [required] - Tween target value
- `duration` [required] - Tween duration
- `autoPlay` [optional] - When set this to `true`, tween auto-plays when wrapped component is mounted
- `easing` [preferred] - Gives animation reality, recommended to use
- `interpolation` [optional] - For complex tweens, useful for Games or Complex animations
- `repeat` [optional] - How much times tween should repeat
- `yoyo` [optional] - Used with combination of `repeat`
- `delay` [optional] - Delay before tween will start
- `onStart`, `onUpdate`, `onComplete` [optional] - Callbacks

## License

MIT
