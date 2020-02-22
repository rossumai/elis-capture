import memoizeOne from 'memoize-one';
import { Dimensions } from 'react-native';

export const hasHinge = () => {
  const { height } = Dimensions.get('window');
  return height >= 812;
};

export const computeSafeArea = memoizeOne((value: number) => {
  if (hasHinge()) {
    return value + 15;
  }
  return value;
});
