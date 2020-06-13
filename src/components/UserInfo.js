import React, { Component } from 'react';
import { baseUrl } from '../constants/baseUrl';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
        }
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.fetchUserInfo();
    }

    async fetchUserInfo() {
        try {
            const url = baseUrl + '/' + this.props.userLogin;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const userInfo = await res.json();
            if (userInfo) {
                this.setState({
                    userInfo,
                })
            }
        } catch (e) {
            console.warn('fetch user info with error', e);
        }
    }

    goBack() {
        this.props.setUserLogin('');
    }

    render() {
        if (!this.state.userInfo) {
            return null;
        }
        const {
            avatar_url,
            name,
            location,
            created_at,
        } = this.state.userInfo;

        const date = new Date(created_at);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        return (
            <div
                className="user"
            >
                <img
                    src={avatar_url}
                    alt="avatar"
                    className="rounded-image"
                    width={80}
                    height={80}
                />
                <div className="user-info">
                    <div className="user-info__name">{ name }</div>
                    { location && <div className="user-info__location">{ location }</div> }
                    <div className="user-info__from">
                        { `From ${date.toLocaleString("en-US", options)}` }
                    </div>
                </div>
                <div className="go-back" onClick={this.goBack} />
            </div>
        )
    }
}

export default UserInfo;
