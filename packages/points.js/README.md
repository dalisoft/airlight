# points.js

Fast &amp; Lightweight SVG Shape Manipulation library based on Points (@colinmeinke/points)

[![NPM](https://nodei.co/npm/points.js.png?downloads=true&stars=true)](https://nodei.co/npm/points.js/)
<br/>
<img src="http://img.badgesize.io/http://cdn.jsdelivr.net/npm/points.js"/> <img src="http://img.badgesize.io/http://cdn.jsdelivr.net/npm/points.js?compression=gzip"/> [![Greenkeeper badge](https://badges.greenkeeper.io/dalisoft/points.js.svg)](https://greenkeeper.io/) [![Scrutinizer](https://img.shields.io/scrutinizer/g/dalisoft/points.js.svg)]() [![Scrutinizer Coverage](https://img.shields.io/scrutinizer/coverage/g/dalisoft/points.js.svg)]() [![NPM Version][npm-image]][npm-url] [![Build Status](https://scrutinizer-ci.com/g/dalisoft/points.js/badges/build.png?b=master)](https://scrutinizer-ci.com/g/dalisoft/points.js/build-status/master)<br/>
[![NPM Downloads][downloads-image]][downloads-url] [![Github Releases](https://img.shields.io/github/downloads/dalisoft/points.js/latest/total.svg)]() [![jsdelivr](https://img.shields.io/badge/cdn-jsdelivr-brightgreen.svg)](https://cdn.jsdelivr.net/npm/points.js) [![unpkg](https://img.shields.io/badge/cdn-unpkg-brightgreen.svg)](https://unpkg.com/points.js) [![npmcdn](https://img.shields.io/badge/cdn-npmcdn-brightgreen.svg)](https://npmcdn.com/points.js)<br/>
[![Flattr this][flattr-image]][flattr-url] [![license](https://img.shields.io/github/license/dalisoft/points.js.svg)]()

# Note

- Please use these methods before tweening initializing, because it changes the points for better natural look
- This is extended version of [Points](https://github.com/colinmeinke/points)

# CDN

```bash
# unpkg
https://unpkg.com/points.js

# npmcdn
https://npmcdn.com/points.js

# jsDelivr
https://cdn.jsdelivr.net/npm/points.js
```

# Installing

```bash
$ npm install points.js
# or
$ yarn install points.js
```

# Docs

##### More information about other methods, see [Points](https://github.com/colinmeinke/points)

##### Those functions does almost everything what you need, but sometimes hand-made changes required

---

### autoNormalise

##### What it does?

It normalises your path data segments (curves, points, length, types) based on your `from` and `to` shapes.

##### Code

```javascript
let [newFromShape, newToShape] = autoNormalise(fromShape, toShape); // Returns normalised path that equalised subpaths or path
```

---

### autoReverse

##### What it does?

It determines the when `firstShape` should be reversed and reverses when necessary

##### Code

```javascript
fromShape = autoReverse(fromShape, toShape);
```

---

### autoIndex

##### What it does?

It finds closer and best index from `fromShape` closer to `toShape` and moves/changes/shifts `fromShape` points

##### Code

```javascript
fromShape = autoIndex(fromShape, toShape);
```

---

### autoCurve

##### What it does?

It compares two `fromShape` and `toShape`, when some point was mismatching, tries to normalise for correct work `(line->curve)`

##### Code

```javascript
let [newFromShape, newToShape] = autoCurve(fromShape, toShape);
```

---

### autoOptimize

##### What it does?

It converts Points object list to Array arrays list for future changing or controlling (for best performance) or for readable format when necessary

##### Code

```javascript
let [newFromShape, newToShape] = autoOptimize(fromShape, toShape); // [['M', 10, 20], ['L', 50, 60]] - easier to tween, read and cleaner
```

---

### splitAt

##### What it does?

Split the single-path to multi-path (sub-paths). (BETA, improvements would be nice)

##### Code

```javascript
let subPaths = splitAt(fromShape, 0.3); // Split into 3-subpaths based on (1 / t:0.3)
```

---

### autoFix

##### What it does?

`Points.js#autoNormalise` + when tweening/interpolation becomes ugly, it provides simple and fast solution for you

##### Code

```javascript
let [newFromShape, newToShape] = autoFix(fromShape, toShape); // Returns normalised path that equalised subpaths with index matching
```

[npm-image]: https://img.shields.io/npm/v/points.js.svg
[npm-url]: https://npmjs.org/package/points.js
[downloads-image]: https://img.shields.io/npm/dm/points.js.svg
[downloads-url]: https://npmjs.org/package/points.js
[flattr-image]: https://api.flattr.com/button/flattr-badge-large.png
[flattr-url]: https://flattr.com/submit/auto?fid=kxw7jx&url=https%3A%2F%2Fgithub.com%2Fdalisoft%2Fpoints.js
[cdnjs-image]: https://img.shields.io/cdnjs/v/points.js.svg
[cdnjs-url]: https://cdnjs.com/libraries/points.js
