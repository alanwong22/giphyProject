import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { search } from './../../actions/search';
import { connect } from 'react-redux';
import Pagination from './../Pagination/Pagination';
import './MediaContainer.css';

class MediaContainer extends Component {
	
	constructor(props){
		super(props);
		this.onCopy = this.onCopy.bind(this);
		this.state = {
			resultData: props.searchResultData,
			copied: -1,
			topLimit: -1,
      bottomLimit: 50
		};

		this.isScrolling = false;
		this.onScroll = this.onScroll.bind(this);
	}
	
	componentDidUpdate(prevProps, prevState) {
		// IF GOING FROM PAGINATION TO INFINITE SCROLL, LOAD MORE
		if(prevProps.hasPagination && prevProps.hasPagination !== this.props.hasPagination) {
			this.onScroll();
		}
		this.isScrolling = false;
	}

	componentDidMount() {
    // LOAD TRENDING IF THERE IS NO PREVIOUS SEARCH
		if(!this.props.lastSearchTerm) this.props.search();
		document.addEventListener("scroll", this.onScroll);
	}
	componentWillUnmount() {
		document.removeEventListener("scroll", this.onScroll);
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
          const imgSrc = i > this.state.topLimit && i < this.state.bottomLimit ? imgSize.url : '';
					const styleObj = { "backgroundImage": `url(${imgSrc})`};
					const beenCopied = this.state.copied === key ? 'copied' : '';
					return (<div className={`img__wrapper ${beenCopied}`}
												style={styleObj}
												alt=""
												data-key={key}
												key={i+imgSize.url}>
                      <div className="img__count">{i}</div>
											<input className="img__info"
															readOnly
															onMouseDown={this.onCopy}
															value={searchResultData[key].bitly_gif_url}
											/>
									</div>
									);
				}));
	}
	
	onScroll() {
		// DEBOUNCE FOR SCROLLING OPTIMIZATION
		if(this.scrollInterval) clearInterval(this.scrollInterval);
		this.scrollInterval = setTimeout(() => {
			const rowsScrolled = Math.floor(window.scrollY/200);
			const perRow = window.innerWidth < 455  ? 1 :
                     window.innerWidth < 655  ? 2 :
                     window.innerWidth < 855  ? 3 :
                     window.innerWidth < 1100 ? 4
                                              : 5;
			// IMAGES WITH A HIGHER INDEX THAN TOPLIMIT ARE VISIBLE
			const topLimit = (rowsScrolled - 5) * perRow;
			// IMAGES WITH A LOWER INDEX THAN BOTTOMLIMIT ARE VISIBLE
			const bottomLimit = (rowsScrolled + 10) * perRow;
			this.setState({topLimit, bottomLimit});
		}, 200);

		// LOAD MORE IMAGES WHEN 100px FROM THE BOTTOM
		const { search, count, offset, rating, lastSearchTerm, hasPagination } = this.props;
		const scrollLimit = this.mediaContainer.clientHeight - window.innerHeight - 100;
		if(window.scrollY > scrollLimit && !this.isScrolling && !hasPagination) {
			this.isScrolling = true;
			search(lastSearchTerm, offset+count, rating);
		}
	}

	render() {
		return (
      <React.Fragment>
			<div className="mediaContainer" ref={(el) => this.mediaContainer = el}>
				{!this.props.count && 
					<div className="oops">NO RESULTS</div>
				}
				{this.makeDisplay()}
			</div>
      <Pagination />
      </React.Fragment>
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