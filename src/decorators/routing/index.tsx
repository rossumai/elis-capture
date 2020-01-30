import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { Route } from '../../common/modules/route/actions';

const mapStateToProps = (state: Route) => ({ route: state.route });

type Props = {
  history: { push: () => void };
  route: Route;
};

class Routing extends React.Component<Props> {
  componentWillReceiveProps({ route, history }) {
    const { route: previousRoute } = this.props;
    if (previousRoute !== route) {
      history.push(route);
    }
  }

  render() {
    return <View />;
  }
}

export default withRouter(connect(mapStateToProps)(Routing));
