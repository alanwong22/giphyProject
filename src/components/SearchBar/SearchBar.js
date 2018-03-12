import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { search, getTrending } from './../../actions/search';
import { connect } from 'react-redux';
import './searchBar.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: '',
			curSearch: ''
		};
		this.onFocus = this.onFocus.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getTrending();
	}

  onFocus() {
    this.searchInput.value = this.state.curSearch;
    this.setState({isActive: 'active'});
  }
  onClose() {
    this.setState({isActive: '', curSearch: this.searchInput.value});
    this.searchInput.value = '';
  }
  onSubmit(ev) {
		ev.preventDefault();
		this.props.search(this.searchInput.value);
		this.searchInput.value = '';
		this.searchInput.blur();
		this.setState({isActive: '', curSearch: ''});
  }
  render() {
		const { isActive } = this.state;
    return (
      <div className={`searchBar ${isActive}`}>
				<div className="search__history">
          <div className="search__label">History:</div>
					{this.props.history.map((term, i) => (
            <div className="search__rerun"
                 key={"rerun"+i}
                 onMouseDown={() => {
                  this.onClose();
                  this.props.search(term);
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
        </div>
				<div className="search__current">
					&quot;<span>{this.props.lastSearchTerm || 'Trending'}</span>&quot;
				</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastSearchTerm: state.search.lastSearchTerm,
  history: state.search.history
});

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
  getTrending
}, dispatch);

SearchBar.defaultProps = {
  lastSearchTerm: ''
};

SearchBar.propTypes = {
  lastSearchTerm: PropTypes.string,
  history: PropTypes.array,
  search: PropTypes.func,
  getTrending: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);