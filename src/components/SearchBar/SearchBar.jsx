import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { search } from './../../actions/search';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './searchBar.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: '',
			curSearch: '',
      newSearch: false,
      ratings: ['G','PG','PG-13','R'],
      curRating: 'G',
      openRatings: false
		};
		this.onFocus = this.onFocus.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    this.handleRating = this.handleRating.bind(this);
	}
  componentDidUpdate(prevProps, prevState) {
    // RESETS FLAG FOR REDIRECT AFTER SEARCH
    if(this.state.newSearch) this.setState({newSearch: false});
  }
  onFocus() {
    // EXPAND OVERLAY
    this.searchInput.value = this.state.curSearch;
    this.setState({isActive: 'active'});
  }
  onClose() {
    // COLLAPSE OVERLAY ON SUBMIT OR BLUR
    this.setState({isActive: '', curSearch: this.searchInput.value});
    this.searchInput.value = '';
  }
  onSubmit(ev) {
		ev.preventDefault();
    if(this.searchInput.value) {
      this.props.search(this.searchInput.value, 0, this.state.curRating);
      this.searchInput.value = '';
      this.searchInput.blur();
      this.setState({isActive: '', curSearch: '', newSearch: true});
    }
  }

  handleRating(el) {
    const _rating = el.currentTarget.innerText;
    if(_rating === this.state.curRating) {
      this.setState({openRatings: true});
    }else{
      this.setState({openRatings: false, curRating: _rating});
    }
  }
  render() {
		const { isActive, ratings, curRating, openRatings, newSearch } = this.state;
    let curSubject = 'Trending';
    if(this.props.lastSearchTerm) curSubject = `"${this.props.lastSearchTerm}"`;
    return (
      <div className={`searchBar ${isActive}`}>
				<div className="search__history">
          <div className="search__label">History:</div>
					{this.props.history.map((term, i) => (
            <div className="search__rerun"
                 key={"rerun"+i}
                 onMouseDown={() => {
                  this.onClose();
                  this.props.search(term, 0, curRating);
                  this.setState({newSearch: true});
                  }
                }
            >{term}</div>
					))}
				</div>
        <div className="search__wrapper">
          <div className="search__container">
            <label htmlFor="Search">Search Giphy</label>
            <form onSubmit={this.onSubmit}>
            <input type="text" 
                      onFocus={this.onFocus} 
                      onBlur={this.onClose} 
                      ref={(el) => this.searchInput = el} />
              <div className="search__button cancel" 
                   onMouseDown={this.onClose}>CANCEL</div>
              <div className="search__button" 
                   onMouseDown={this.onSubmit}>GO</div>
            </form>
          </div>

          <div className={`search__rating ${openRatings ? 'open' : ''}`}>
            <div className={`search__rating__selection`}>
              {ratings.map(rating => (
                <div className={`search__rating__option ${curRating === rating ? 'selected': ''}`}
                      key={`rating-${rating}`}
                      onClick={this.handleRating}>{rating}</div>
              ))}
            </div>
          </div>

          <Link to="/gif" className="search__info">?</Link>
          
        </div>
				<div className="search__current">
					<span>{curSubject}</span>
				</div>
        {newSearch && (
          <Redirect to='/'/>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastSearchTerm: state.search.lastSearchTerm,
  history: state.search.history
});

const mapDispatchToProps = dispatch => bindActionCreators({
  search
}, dispatch);

SearchBar.defaultProps = {

};

SearchBar.propTypes = {
  lastSearchTerm: PropTypes.string,
  history: PropTypes.array,
  search: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));