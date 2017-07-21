# points.js
Fast &amp; Lightweight SVG Shape Manipulation library based on Points (@colinmeinke/points)

[![NPM](https://nodei.co/npm/points.js.png?downloads=true&stars=true)](https://nodei.co/npm/points.js/)
<br/>
<img src="http://img.badgesize.io/http://cdn.jsdelivr.net/npm/points.js@latest"/>  <img src="http://img.badgesize.io/http://cdn.jsdelivr.net/npm/points.js@latest?compression=gzip"/>  [![Greenkeeper badge](https://badges.greenkeeper.io/dalisoft/points.js.svg)](https://greenkeeper.io/)  [![Scrutinizer](https://img.shields.io/scrutinizer/g/dalisoft/points.js.svg)]()  [![Scrutinizer Coverage](https://img.shields.io/scrutinizer/coverage/g/dalisoft/points.js.svg)]()  [![NPM Version][npm-image]][npm-url]  [![Build Status](https://scrutinizer-ci.com/g/dalisoft/points.js/badges/build.png?b=master)](https://scrutinizer-ci.com/g/dalisoft/points.js/build-status/master)<br/>
[![NPM Downloads][downloads-image]][downloads-url]  [![Github Releases](https://img.shields.io/github/downloads/dalisoft/points.js/latest/total.svg)]()    [![jsdelivr](https://img.shields.io/badge/cdn-jsdelivr-brightgreen.svg)](https://cdn.jsdelivr.net/npm/points.js)  [![unpkg](https://img.shields.io/badge/cdn-unpkg-brightgreen.svg)](https://unpkg.com/points.js)  [![npmcdn](https://img.shields.io/badge/cdn-npmcdn-brightgreen.svg)](https://npmcdn.com/points.js)<br/>
[![Flattr this][flattr-image]][flattr-url]  [![license](https://img.shields.io/github/license/dalisoft/points.js.svg)]()

# Note
* Please use these methods before tweening initializing, because it changes the points for better natural look
* This is extend/add-on for [Points](https://github.com/colinmeinke/points)

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

##### Those functions does almost everything what you need, but sometimes hand-made changes required

---
### autoThing
##### What it does?
It normalises/does everything for you. If you want automatic moveIndex, reverse, autoCurve, autoFix (subpath normalise). It is that what you looking.

##### Code
```javascript
let [newFromShape, newToShape] = autoThing(fromShape, toShape); // Returns normalised path that equalised subpaths and natually look with direction fix/correction (when used?)
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
### autoFix
##### What it does?
It normalises two `fromShape` and `toShape`, when matches subpath and it's count was mismatching, tweening/interpolation becomes ugly, for those use-case it provides simple and fast API that does everything for you

##### Code
```javascript
let [newFromShape, newToShape] = autoFix(fromShape, toShape); // Returns normalised path that equalised subpaths
```

[npm-image]: https://img.shields.io/npm/v/points.js.svg
[npm-url]: https://npmjs.org/package/points.js
[downloads-image]: https://img.shields.io/npm/dm/points.js.svg
[downloads-url]: https://npmjs.org/package/points.js
[flattr-image]: https://api.flattr.com/button/flattr-badge-large.png
[flattr-url]: https://flattr.com/submit/auto?fid=kxw7jx&url=https%3A%2F%2Fgithub.com%2Fdalisoft%2Fpoints.js
[cdnjs-image]: https://img.shields.io/cdnjs/v/points.js.svg
[cdnjs-url]: https://cdnjs.com/libraries/points.js