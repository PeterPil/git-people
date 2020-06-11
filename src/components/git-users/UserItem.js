import React, { Component } from 'react';
import { itemHeight } from '../../constants/itemHeight';

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.item.login);
    }


    render() {
        const {
            login,
            avatar_url,
        } = this.props;
        return (
            <div className="user-item" onClick={this.onClick} style={{ height: itemHeight }}>
                {login}
            </div>
        )
    }
}

export default UserItem;
