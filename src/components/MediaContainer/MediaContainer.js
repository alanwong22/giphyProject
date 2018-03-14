import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { search } from './../../actions/search';
import { connect } from 'react-redux';

import './MediaContainer.css';

class MediaContainer extends Component {
	
	constructor(props){
		super(props);
		this.onCopy = this.onCopy.bind(this);
		this.state = {
			resultData: props.searchResultData,
			copied: -1
		};
		// this.interval;
		this.isScrolling = false;
		this.loadMore = this.loadMore.bind(this);
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log("componentDidUpdate", this.mediaContainer.scrollTop);
		this.mediaContainer.scrollTop += 50;
		console.log(this.mediaContainer.scrollTop);
		this.isScrolling = false;
	}

	componentDidMount() {
		this.props.search();
		document.addEventListener("scroll", this.loadMore);
	}
	componentWillUnmount() {
		document.removeEventListener("scroll", this.loadMore);
	}

	// COPY URL LINK TO CLIP BOARD
	onCopy(e) {
		e.target.select();
		setTimeout((e) => {
			this.setState({copied: -1});
		}, 2000);
		document.execCommand("Copy");
		this.setState({copied: e.target.parentNode.dataset.key});
	}

	makeDisplay() {
		const {searchResultData, offset, count} = this.props;
		let displayKeys = Object.keys(searchResultData);
		if(this.props.hasPagination) displayKeys = displayKeys.splice(offset, offset+count);
		return (
			displayKeys.map((key, i) => {
					const imgSize = searchResultData[key].images.fixed_height;
					const styleObj = { "backgroundImage": `url(${imgSize.url})`};
					const beenCopied = this.state.copied === key ? 'copied' : '';
					return (<div className={`img__wrapper ${beenCopied}`}
												style={styleObj}
												alt=""
												data-key={key}
												key={i+imgSize.url}>
											<input className="img__info"
															readOnly
															onMouseDown={this.onCopy}
															value={searchResultData[key].bitly_gif_url}
											/>
									</div>
									);
				}));
	}
	
	loadMore() {
		// Limit is 100px before the bottom
		const { search, count, offset, rating, lastSearchTerm, hasPagination } = this.props;
		const scrollLimit = this.mediaContainer.clientHeight - window.innerHeight - 100;
		// console.log("loadMore", window.scrollY, scrollLimit, "||" ,window.innerHeight, this.mediaContainer.clientHeight);
		if(window.scrollY > scrollLimit && !this.isScrolling && !hasPagination) {
			this.isScrolling = true;
			console.log("HIT THE LIMIT");
			search(lastSearchTerm, offset+count, rating);
		}
	}

	render() {
		return (
			<div className="mediaContainer" ref={(el) => this.mediaContainer = el}>
				{this.props.count === 0 && 
					<div className="oops">NO RESULTS</div>
				}
				{this.makeDisplay()}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	searchResultData: state.search.onTrending ? state.trending
																						: state.collections[state.search.lastSearchTerm],
	lastSearchTerm: state.search.lastSearchTerm,
	count: state.search.pagination.count || 0,
	offset: state.search.pagination.offset || 0,
	rating: state.search.pagination.rating || 'G',
	hasPagination: state.hasPagination
});

const mapDispatchToProps = dispatch => bindActionCreators({
  search
}, dispatch);

MediaContainer.defaultProps = {
  searchResultData: {}
};

MediaContainer.propTypes = {
  searchResultData: PropTypes.object,
  lastSearchTerm: PropTypes.string,
  rating: PropTypes.string,
  offset: PropTypes.number,
  count: PropTypes.number,
  search: PropTypes.func,
  hasPagination: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaContainer);