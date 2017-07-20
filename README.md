# points.js
Fast &amp; Lightweight SVG Shape Manipulation library based on Points (@colinmeinke/points)

<img src="http://img.badgesize.io/http://cdn.jsdelivr.net/npm/points.js@latest"/>  <img src="http://img.badgesize.io/http://cdn.jsdelivr.net/npm/points.js@latest?compression=gzip"/>

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


### autoThing
##### What it does?
It normalises/does everything for you. If you want automatic moveIndex, reverse, autoCurve, autoFix (subpath normalise). It is that what you looking.

##### Code
```javascript
let [newFromShape, newToShape] = autoThing(fromShape, toShape); // Returns normalised path that equalised subpaths and natually look with direction fix/correction (when used?)
```


### autoReverse
##### What it does?
It determines the when `firstShape` should be reversed and reverses when necessary

##### Code
```javascript
fromShape = autoReverse(fromShape, toShape);
```


### autoIndex
##### What it does?
It finds closer and best index from `fromShape` closer to `toShape` and moves/changes/shifts `fromShape` points

##### Code
```javascript
fromShape = autoIndex(fromShape, toShape);
```


### autoCurve
##### What it does?
It compares two `fromShape` and `toShape`, when some point was mismatching, tries to normalise for correct work `(line->curve)`

##### Code
```javascript
let [newFromShape, newToShape] = autoCurve(fromShape, toShape);
```


### autoOptimize
##### What it does?
It converts Points object list to Array arrays list for future changing or controlling (for best performance) or for readable format when necessary

##### Code
```javascript
let [newFromShape, newToShape] = autoOptimize(fromShape, toShape); // [['M', 10, 20], ['L', 50, 60]] - easier to tween, read and cleaner
```


### autoFix
##### What it does?
It normalises two `fromShape` and `toShape`, when matches subpath and it's count was mismatching, tweening/interpolation becomes ugly, for those use-case it provides simple and fast API that does everything for you

##### Code
```javascript
let [newFromShape, newToShape] = autoFix(fromShape, toShape); // Returns normalised path that equalised subpaths
```