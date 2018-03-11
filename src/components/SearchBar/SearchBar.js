import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { search, getTrending } from './../../actions/search';
import { connect } from 'react-redux'
import './searchBar.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: '',
			curSearch: ''
		}
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getTrending();
	}

  onFocus() {
    this.searchInput.value = this.state.curSearch
    this.setState({isActive: 'active'});
  }
  onBlur() {
    this.setState({isActive: '', curSearch: this.searchInput.value});
    this.searchInput.value = '';
  }
  onSubmit(ev) {
  	ev.preventDefault();
  	// console.log("onSubmit Doing something with:", this.searchInput.value);
  	this.props.search(this.searchInput.value);
  	this.searchInput.value = '';
  	this.searchInput.blur();
  	this.setState({isActive: '', curSearch: ''});
  }
  render() {
  	const { isActive } = this.state;
    return (
      <div className={`searchBar ${isActive}`}>
        <div className="search__wrapper">
          <div className="search__container">
          	<label htmlFor="Search">Search Giphy</label>
          	<form onSubmit={this.onSubmit}>
	            <input  type="text" 
	            				onFocus={this.onFocus} 
	            				onBlur={this.onBlur} 
	            				ref={(el) => this.searchInput = el} />
	            <div className="search__submit" onMouseDown={this.onSubmit}>GO</div>
            </form>
          </div>
        </div>
      	<div className="curSearchTerm">" <span>{this.props.lastSearchTerm || 'Trending'}</span> "</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastSearchTerm: state.search.lastSearchTerm

})

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
  getTrending
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);