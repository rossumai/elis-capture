import { FlashMode } from './../components/CameraHandler/index';

enum FlashmodeEnum {
  AUTO = 'auto',
  ON = 'on',
  OFF = 'off',
}

type isFlashmodeTypeT = (flashmode: string | null) => FlashMode;

export const isFlashmodeType: isFlashmodeTypeT = flashmode => {
  if (flashmode && flashmode in FlashmodeEnum) {
    return flashmode as FlashmodeEnum;
  }
  return 'auto';
};
