const Swipe = (props) => {
  let isPressed = false;
  let startX = 0;
  let startY = 0;
  let type = null;
  let delta = 0;

  const onLeaveHandle = () => {
    if (props.onPointerUp) {
      props.onPointerUp();
    }
    if (props[type]) {
      props[type](delta);
    }
    type = null;
  };

  const onTouchStartHandler = (e) => {
    e =
      e.pageX !== undefined
        ? e
        : e.touches
        ? e.touches[0]
        : e.changedTouches
        ? e.changedTouches[0]
        : null;

    if (!e) {
      return false;
    }

    isPressed = true;
    startX = e.pageX;
    startY = e.pageY;
    if (props.onPointerDown) {
      props.onPointerDown(e);
    }
  };
  const onTouchMoveHandler = (e) => {
    if (isPressed && startX > 0 && startY > 0) {
      if (e.touches) {
        if (e.touches.length > 1 || (e.scale && e.scale !== 1)) {
          return;
        }
        e = e.touches[0];
      }
      if (!e) {
        return;
      }

      if (props.onPointerMove) {
        props.onPointerMove(e);
      }

      let dx = e.pageX - startX;
      let dy = e.pageY - startY;

      let ax = Math.abs(dx);
      let ay = Math.abs(dy);

      if (ax > ay) {
        if (props.onPanX) {
          props.onPanX(dx);
        }
        delta = dx;
        if (dx < 0) {
          if (props.onSwipeLeft) {
            type = 'onSwipeLeft';
          }
        } else if (dx > 0) {
          if (props.onSwipeRight) {
            type = 'onSwipeRight';
          }
        }
      } else if (ay > ax) {
        if (props.onPanY) {
          props.onPanY(dy);
        }
        delta = dy;
        if (dy < 0) {
          if (props.onSwipeUp) {
            type = 'onSwipeUp';
          }
        } else if (dy > 0) {
          if (props.onSwipeDown) {
            type = 'onSwipeDown';
          }
        }
      }
    }
  };
  const onTouchEndHandler = (e) => {
    requestAnimationFrame(onLeaveHandle);
    isPressed = false;
  };

  return {
    onStart: onTouchStartHandler,
    onMove: onTouchMoveHandler,
    onEnd: onTouchEndHandler
  };
};

export default Swipe;
