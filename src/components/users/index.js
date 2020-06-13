import React, { Component } from 'react';
import { baseUrl } from '../../constants/baseUrl';
import buildUrlWithParameters from '../../helpers/buildUrlWithParameters';
import UserItem from './UserItem';
import Pagination from './Pagination';
import { createRef } from 'react';
import { itemHeight } from '../../constants/itemHeight';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            total: 20,
            range: {
                since: 1,
                per_page: 1,
            },
        };
        this.fetchUsers = this.fetchUsers.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.setPage = this.setPage.bind(this);
        this.usersRef = createRef(null);
    }

    componentDidMount() {
        this.updateSize();
        window.addEventListener('resize', this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.range !== this.state.range) {
            this.fetchUsers();
        }
        
    }

    updateSize() {
        const refCurrent = this.usersRef && this.usersRef.current
        if(refCurrent) {
            const newPerPage = Math.floor( refCurrent.clientHeight / itemHeight );
            if(newPerPage !== 0 && newPerPage !== this.state.range.per_page) {
                this.setState(state => ({
                    range: {
                        since: Math.floor(state.range.since * state.range.per_page / newPerPage) || 1,
                        per_page: newPerPage,
                    }
                }))
                
            }
        }
    }

    async fetchUsers() {
        try {
            const {
                since,
                per_page,
            } =  this.state.range;
            const preparedRange = {
                since: since > 1
                    ? (since - 1) * per_page + 1
                    : since,
                per_page,
            }

            const url = buildUrlWithParameters(baseUrl, preparedRange)
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const users = await res.json();
            if (users) {
                this.setState({
                    users,
                })
            }
        } catch (e) {
            console.warn('fetch users with error', e);
        }
    }

    setPage(since) {
        this.setState(state => ({
            range: {
                ...state.range,
                since,
            }
        }))
    }

    render() {
        const {
            users,
            total,
            range: {
                per_page,
                since
            }
        } = this.state;

        const pagesTotal = Math.ceil( total / per_page );

        return (
            <div className="users" >
                <div className="users-elements" ref={this.usersRef} style={{ minHeight: itemHeight }}>
                    { users.map(item => <UserItem key={item.id} {...item} onClick={this.props.setUserLogin} />)}
                </div>
                <Pagination total={pagesTotal} setPage={this.setPage} activeIndex={since}/>
            </div>
        )
    }
}

export default Users;
