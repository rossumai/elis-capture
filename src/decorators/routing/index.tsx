import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { reduxStateT } from '../../common/configureStore';
import { routeT } from '../../common/modules/route/actions';

type Props = {
  history: { push: (path: string) => void };
  route: routeT;
};

class Routing extends React.Component<Props> {
  componentWillReceiveProps({ route, history }: Props) {
    const { route: previousRoute } = this.props;
    if (previousRoute !== route) {
      history.push(route);
    }
  }

  render() {
    return <View />;
  }
}

const mapStateToProps = (state: reduxStateT) => ({ route: state.route });

export default withRouter(connect(mapStateToProps)(Routing));
