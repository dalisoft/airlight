import { applyFuncToShapes } from './helpers';
import autoReverse from './autoReverse';
import autoIndex from './autoIndex';
import autoNormalise from './autoNormalise';

const autoFixPoints = (fromShape, toShape, param = {}) => {
  fromShape = autoReverse(fromShape, toShape);

  if (!param || typeof param !== 'object') {
    return new Error('Invalid parametr of config');
  }
  param.map = (fromSubPath, toSubPath, index) => {
    fromSubPath = autoReverse(fromSubPath, toSubPath);
    fromSubPath = autoIndex(fromSubPath, toSubPath);
    return fromSubPath;
  };
  if (param.bboxCenter === undefined) {
    param.bboxCenter = true;
  }

  return autoNormalise(fromShape, toShape, param);
};

const autoFix = (fromShape, toShape, param) =>
  applyFuncToShapes(autoFixPoints, fromShape, toShape, param);

export default autoFix;
