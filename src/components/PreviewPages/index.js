/* @flow */
import React from 'react';
import { ImageBackground, View } from 'react-native';
import Swiper from 'react-native-swiper';
import RemoveIcon from './components/RemoveIcon';
import RedoIcon from './components/RedoIcon';
import createPagiantion from './components/Pagination';

type Props = {
  pages: Array<Object>,
  remove: Function,
  redo: Function,
  addPages: Function,
}

const PreviewPages = ({
  pages,
  remove,
  redo,
  addPages,
}: Props) => (
  <Swiper
    loop={false}
    index={pages.length - 1}
    onIndexChanged={index => index === pages.length && addPages()}
    renderPagination={createPagiantion(addPages)}
    key={pages.length}
  >
    {[...pages, { uri: null }].map(({ uri }, index) => uri ? (
      <ImageBackground
        key={uri}
        imageStyle={{ resizeMode: 'cover' }}
        style={{ flex: 1 }}
        source={{ uri }}
      >
        {(pages.length > 1) && (
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
          >
            <RemoveIcon remove={() => remove(index)} />
            <RedoIcon redo={() => redo(index)} />
          </View>
        )}
      </ImageBackground>
    ) : (
      <View
        key="no-page"
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
        }}
      />
    ))}
  </Swiper>
);

export default PreviewPages;
