import React, { createRef } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import Dropdown from 'react-native-modal-dropdown';
import SeamlessImmutable from 'seamless-immutable';
import { Queue } from '../../common/modules/queues/reducer';
import { computeSafeArea } from '../../utils/computeSafeArea';

type Props = {
  queues: SeamlessImmutable.ImmutableArray<Queue>;
  onQueuePick: (index: number) => void;
  currentQueueIndex: number;
};

type ModalDropdownRef = {
  show: () => void;
};

class QueuePicker extends React.Component<Props> {
  private dropdownRef = createRef<Dropdown & ModalDropdownRef>();

  render() {
    const { queues, onQueuePick, currentQueueIndex } = this.props;

    return (
      <View
        style={{
          flex: 1,
          height: 50,
          right: 5,
          top: computeSafeArea(15),
          width: '50%',
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Dropdown
          // @ts-ignore
          options={queues.map(({ name }) => name)} // Dropdown will require re-typing cause it cannot handle immutable types :/
          defaultIndex={currentQueueIndex}
          defaultValue={queues[currentQueueIndex].name}
          ref={this.dropdownRef}
          onSelect={index => onQueuePick(index)}
          renderSeparator={() => null}
          textStyle={{
            fontSize: 20,
            color: 'white',
            borderWidth: 0,
            width: '100%',
            paddingRight: 5,
            margin: 0,
          }}
          style={{ margin: 0, padding: 0 }}
          dropdownTextStyle={{
            backgroundColor: 'transparent',
            fontSize: 20,
            color: 'white',
            borderWidth: 0,
            textAlign: 'right',
          }}
          dropdownTextHighlightStyle={{ color: 'white' }}
          dropdownStyle={{
            height: '50%',
            width: '50%',
            backgroundColor: 'transparent',
            borderWidth: 0,
          }}
        />
        <Icon
          name="chevron-down"
          color="white"
          type="entypo"
          onPress={() => this.dropdownRef.current && this.dropdownRef.current.show()}
        />
      </View>
    );
  }
}

export default QueuePicker;
