import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search, getTrending } from './../../actions/search';
import './Pagination.css';


class Pagination extends Component {
	
	handleClick(str, offset) {
    (str === "Trending") ? this.props.getTrending(str, offset)
                         : this.props.search(str, offset);
	}

	render() {
		if(this.props.curPagination) {
			const { count, total_count, offset } = this.props.curPagination;
			const totalPages = Math.floor(total_count/count);
			console.log("pagination", total_count, count);
			return (
				<div className={`pagination ${count === 0 ? 'hide' : ''}`}>
					<div className="page__prev"
							onClick={() => this.handleClick(this.props.lastSearchTerm, offset-count)}>
							{offset !== 0 && 'PREV'}
					</div>
					<div className="page__current">{(offset/count)+1} / {totalPages} PAGES</div>
					<div className="page__next" 
							onClick={() => this.handleClick(this.props.lastSearchTerm, offset+count)}>
							{offset + count < total_count && 'NEXT'}
					</div>
				</div>
			);
		}

		return null;
	}
}

const mapStateToProps = state => ({
	curPagination: state.search.pagination,
	lastSearchTerm: state.search.lastSearchTerm
});

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
  getTrending
}, dispatch);

Pagination.propTypes = {
  search: PropTypes.func,
  getTrending: PropTypes.func,
  curPagination: PropTypes.object,
  lastSearchTerm: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);