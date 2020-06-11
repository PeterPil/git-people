import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.renderPageNumbers = this.renderPageNumbers.bind(this);
    }

    onClick(page) {
        this.props.setPage(page);
    }

    renderPageNumbers() {
        return Array(this.props.total)
            .fill(0)
            .map((num, index) => {
                const current = index + 1;
                const activeClassName = current === this.props.activeIndex
                    ? 'pagination__number-active'
                    : ''

                return (
                    <div
                        className={`pagination__number ${activeClassName}`}
                        onClick={this.onClick.bind(this, current)}
                    >
                        { current}
                    </div>
                )
            })
    }


    render() {
        return (
            <div className="pagination">
                { this.renderPageNumbers()}
            </div>
        )
    }
}

export default Pagination;
