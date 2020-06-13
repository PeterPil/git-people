import React, { Component } from 'react';
import { itemHeight } from '../../constants/itemHeight';

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.login);
    }

    render() {
        const {
            login,
            avatar_url,
            html_url,
        } = this.props;

        return (
            <div
                className="user-item"
                style={{ minHeight: itemHeight }}
            >
                <div className="user-item-info">
                    <img
                        src={avatar_url}
                        alt="avatar"
                        className="rounded-image"
                        onClick={this.onClick}
                        width={80}
                        height={80}
                    />
                    <p className="user-item-info__login" onClick={this.onClick}>
                        { login }
                    </p>
                </div>
                <a
                    className="user-item__button"
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Button
                </a>
            </div>
        );
    }
}

export default UserItem;
