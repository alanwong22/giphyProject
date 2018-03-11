import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search } from './../../actions/search';
import './Pagination.css';


class Pagination extends Component {

	render() {
		console.log("Pagination", this.props.searchResultData);
		if(this.props.curPagination) {
			const { count, total_count, offset } = this.props.curPagination;
			return (
				<div className="pagination">
					<div className="pagePrev"
							 onClick={() => this.props.search(this.props.lastSearchTerm, offset-count)}>
							 {offset !== 0 && 'PREV'}
					</div>
					<div className="pageCur">{(offset/count)+1} / {Math.floor(total_count/count)}</div>
					<div className="pageNext" 
							 onClick={() => this.props.search(this.props.lastSearchTerm, offset+count)}>
							 {offset + count < total_count && 'NEXT'}
					</div>
				</div>
			)
		}else{
			return false
		}
	}
}

const mapStateToProps = state => ({
	curPagination: state.search.pagination,
	lastSearchTerm: state.search.lastSearchTerm
})

const mapDispatchToProps = dispatch => bindActionCreators({
  search
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);