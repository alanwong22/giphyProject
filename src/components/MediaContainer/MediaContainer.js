import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log("MediaContainer componentDidUpdate");
	}
	onCopy(e) {
		e.target.select();
		setTimeout((e) => {
			this.setState({copied: -1});
		}, 2000);
		document.execCommand("Copy");
		this.setState({copied: e.target.parentNode.dataset.key});
	}
	
// 	isElementInViewport (el) {

//     //special bonus for those using jQuery
//     // if (typeof jQuery === "function" && el instanceof jQuery) {
//     //     el = el[0];
//     // }

//     var rect = el.getBoundingClientRect();

//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
// 				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
// 				rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
//     );
// }

// 	onVisibilityChange(el, callback) {
//     var old_visible;
//     return function () {
//         var visible = this.isElementInViewport(el);
//         if (visible !== old_visible) {
//             old_visible = visible;
//             if (typeof callback === 'function') {
//                 callback();
//             }
//         }
//     };
// }


	makeDisplay() {
		const {searchResultData, offset, count} = this.props;

		return (
			Object.keys(searchResultData)
				.splice(offset, offset+count)
				.map(key => {
					const imgSize = searchResultData[key].images.fixed_height;
					const styleObj = { "backgroundImage": `url(${imgSize.url})`};
					const beenCopied = this.state.copied === key ? 'copied' : '';
					return (<div className={`img__wrapper ${beenCopied}`}
												style={styleObj}
												alt=""
												data-key={key}
												key={imgSize.url}>
											<input className="img__info"
															readOnly
															onMouseDown={this.onCopy}
															value={searchResultData[key].bitly_gif_url}
											/>
									</div>
									);
				}));
	}

	render() {
		return (
			<div className="mediaContainer">
				{this.props.count === 0 && 
					<div className="oops">NO RESULTS</div>
				}
				{this.makeDisplay()}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	searchResultData: state.collections[state.search.lastSearchTerm] || {},
	count: state.search.pagination.count || 0,
	offset: state.search.pagination.offset || 0
});

MediaContainer.defaultProps = {
  searchResultData: {}
};

MediaContainer.propTypes = {
  searchResultData: PropTypes.object,
  offset: PropTypes.number,
  count: PropTypes.number
};

export default connect(mapStateToProps)(MediaContainer);