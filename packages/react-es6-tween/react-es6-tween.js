(function (libName, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react', 'es6-tween'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('react'), require('es6-tween'));
  } else if (typeof exports !== 'undefined') {
    exports.__default = factory(
      exports.React || require('react'),
      exports.TWEEN || require('es6-tween')
    );
    exports.__esModule = true;
  } else if (typeof self !== 'undefined') {
    self[libName] = factory(self.React, self.TWEEN);
    self[libName].__esModule = true;
  } else if (typeof window !== 'undefined' && window.document) {
    window[libName] = factory(window.React, window.TWEEN);
    window[libName].__esModule = true;
  } else {
    this[libName] = factory(this.React, this.TWEEN);
    this[libName].__esModule = true;
  }
})('ES6Tween', function (React, TWEEN) {
  if (React === undefined) {
    throw new Error('Requires React.js for creating Component class');
  }
  if (TWEEN === undefined) {
    throw new Error('Requires es6-tween for properly work');
  }
  TWEEN.autoPlay(true);

  const changeableProps = ['isPlaying', 'isStopped', 'isReversed'];
  return class ES6Tween extends React.Component {
    constructor(props) {
      super(props);

      this.node = React.createRef();
    }
    shouldComponentUpdate(nextProps) {
      return changeableProps.some((key) => this.props[key] !== nextProps[key]);
    }
    componentDidMount() {
      const {
        from,
        to,
        duration,
        repeat,
        easing,
        interpolation,
        yoyo = false,
        delay = 0,
        autoPlay,
        onStart,
        onUpdate,
        onComplete
      } = this.props;

      this.tween = new TWEEN.Tween(this.node.current, from)
        .to(to, duration)
        .repeat(repeat)
        .yoyo(yoyo)
        .easing(easing)
        .interpolation(interpolation)
        .delay(delay);

      if (!to && from) {
        this.tween.render().update(this.tween._startTime);
        this.tween._rendered = false;
        this.tween._onStartCallbackFired = false;
      }
      if (autoPlay) {
        this.tween.start();
      }
      if (onStart) {
        this.tween.on('start', onStart);
      }
      if (onUpdate) {
        this.tween.on('update', onUpdate);
      }
      if (onComplete) {
        this.tween.on('complete', onEnd);
      }
    }
    componentDidUpdate() {
      const { props, tween } = this;
      const { isPlaying, isStopped, isReversed } = props;

      if (isPlaying === true) {
        tween.play();
      } else if (isPlaying === false) {
        tween.pause();
      }

      if (isStopped === true) {
        tween.stop();
      }

      if (isReversed === true || isReversed === false) {
        tween.reverse(isReversed);
      }
    }
    componentWillUnmount() {
      this.tween.stop();
      this.tween = null;
    }
    render() {
      const { children } = this.props;

      return React.cloneElement(children, { ref: this.node });
    }
  };
});
