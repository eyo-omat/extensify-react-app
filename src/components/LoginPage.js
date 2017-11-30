import React from 'react';
import {startLogin} from '../actions/auth';
import { connect } from 'react-redux';

export const LoginPage = ({ startLogin }) => {

    return (
        <div>
            {/*<h1>Login</h1>*/}
            {/*<input type="text" placeholder="username"/>*/}
            {/*<input type="password" placeholder="password"/>*/}
            <button onClick={startLogin}>Login</button>
        </div>

    );
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage)


