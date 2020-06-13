import React, { Component } from 'react';
import './styles.scss';
import Users from './users';
import UserInfo from './UserInfo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogin: '',
        }
        this.setUserLogin = this.setUserLogin.bind(this);
    }

    setUserLogin(userLogin) {
        this.setState({
            userLogin,
        });
    }

    render() {
        return (
            <div className="app-container">
                { this.state.userLogin
                    ? <UserInfo userLogin={this.state.userLogin} setUserLogin={this.setUserLogin} />
                    : <Users setUserLogin={this.setUserLogin} />
                }
            </div>
        )
    }
}

export default App;
