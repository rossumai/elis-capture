/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { withRouter } from 'react-router-native';
import type { Route } from '../../redux/modules/route/actions';

const mapStateToProps = state => ({ route: state.route });

type Props = {
  history: { push: Function },
  route: Route,
}

class Routing extends React.Component<Props> {
  componentWillReceiveProps({ route, history }) {
    const { route: previousRoute } = this.props;
    if (previousRoute !== route) {
      history.push(route);
    }
  }

  render() {
    return (<View />);
  }
}


export default withRouter(connect(mapStateToProps)(Routing));
