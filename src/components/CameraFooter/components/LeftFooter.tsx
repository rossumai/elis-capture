import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CapturedPicture } from '../../Camera';
import IndexNumber from '../../IndexNumber';

type Props = {
  lastFile: null | CapturedPicture;
  pagesCount: number;
  shooting: boolean;
  openPreview: () => void;
  addFileFromLibrary: () => Promise<void>;
};

const LeftFooter = ({ lastFile, pagesCount, openPreview, shooting, addFileFromLibrary }: Props) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    {lastFile ? (
      <TouchableOpacity disabled={shooting} onPress={openPreview} style={{ width: 50, height: 50 }}>
        <ImageBackground
          style={{ width: 50, height: 50 }}
          imageStyle={{ borderRadius: 6 }}
          source={{ uri: lastFile.uri }}>
          <IndexNumber
            value={pagesCount}
            style={{
              zIndex: 1,
              left: 15,
              top: 15,
              width: 20,
              height: 20,
            }}
            textStyle={{ fontSize: 15 }}
          />
        </ImageBackground>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        disabled={shooting}
        onPress={addFileFromLibrary}
        style={{ width: 50, height: 50, paddingTop: 7 }}>
        <Icon name="image-plus" type="material-community" color="white" size={30} />
      </TouchableOpacity>
    )}
  </View>
);

export default LeftFooter;
