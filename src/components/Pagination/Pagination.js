import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search } from './../../actions/search';
import './Pagination.css';


class Pagination extends Component {

	render() {
		if(this.props.curPagination) {
			const { count, total_count, offset } = this.props.curPagination;
			return (
				<div className="pagination">
					<div className="page__prev"
							onClick={() => this.props.search(this.props.lastSearchTerm, offset-count)}>
							{offset !== 0 && 'PREV'}
					</div>
					<div className="page__current">{(offset/count)+1} / {Math.floor(total_count/count)}</div>
					<div className="page__next" 
							onClick={() => this.props.search(this.props.lastSearchTerm, offset+count)}>
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
  search
}, dispatch);

Pagination.propTypes = {
  search: PropTypes.func,
  curPagination: PropTypes.object,
  lastSearchTerm: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);