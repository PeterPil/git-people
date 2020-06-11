import React, { Component } from 'react';
// import './styles.scss';
import { baseUrl } from '../../constants/baseUrl';
import buildUrlWithParameters from '../../helpers/buildUrlWithParameters';
import UserItem from './UserItem';
import Pagination from './Pagination';
import { createRef } from 'react';
import { itemHeight } from '../../constants/itemHeight';

class GitUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            total: 100,
            range: {
                since: 1,
                per_page: 15,
            },
        };
        this.fetchUsers = this.fetchUsers.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.setPage = this.setPage.bind(this);
        this.usersRef = createRef(null);
    }

    componentDidMount() {
        // this.fetchUsers();
        this.updateSize();
        window.addEventListener('resize', this.updateSize);
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
            if(newPerPage !== this.state.range.per_page) {
                console.log(newPerPage);
                this.setState(state => ({
                    range: {
                        ...state.range,
                        per_page: newPerPage,
                    }
                }))
                
            }
        }
    }

    async fetchUsers() {
        try {
            const url = buildUrlWithParameters(baseUrl, this.state.range)
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(res);
            
            const users = await res.json();
            console.log(users);
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
            <div className="git-users" ref={this.usersRef}>
                <div>
                    { users.map(({
                        id,
                        login,
                        avatar_url,
                    }) => <UserItem key={id} login={login}/>)}
                </div>
                <Pagination total={pagesTotal} setPage={this.setPage} activeIndex={since}/>
            </div>
        )
    }
}

export default GitUsers;
