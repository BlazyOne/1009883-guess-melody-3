import React from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute} from '../../const.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropValidator.AUTHORIZATION_STATUS,
  exact: PropValidator.EXACT,
  path: PropValidator.PATH,
  render: PropValidator.RENDER
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
