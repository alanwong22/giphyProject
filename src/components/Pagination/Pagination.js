import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search } from './../../actions/search';
import { showAll } from './../../actions/pagination';
import './Pagination.css';


class Pagination extends Component {
  
	render() {
		if(this.props.curPagination) {
			const { count, total_count, offset } = this.props.curPagination;
			const totalPages = Math.floor(total_count/count);

			return (
				<div className={`pagination ${count === 0 ? 'hide' : ''} ${this.props.hasPagination ? '' : 'page__all'}`}>
          
          <div className="page__prev"
            onClick={() => this.props.search(this.props.lastSearchTerm, offset-count)}>
            {offset !== 0 && 'PREV'}
          </div>

          <div className="page__current">
            {this.props.hasPagination && (offset/count)+1 +'/'+ totalPages + ' PAGES'}
            <div className="page__show__all" 
                  onClick={() => this.props.showAll(!this.props.hasPagination)}>
              {this.props.hasPagination ? 'SHOW ALL' : 'SHOW LESS'}
            </div>
          </div>

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
	lastSearchTerm: state.search.lastSearchTerm,
  hasPagination: state.hasPagination
});

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
  showAll
}, dispatch);

Pagination.propTypes = {
  search: PropTypes.func,
  showAll: PropTypes.func,
  curPagination: PropTypes.object,
  lastSearchTerm: PropTypes.string,
  hasPagination: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);