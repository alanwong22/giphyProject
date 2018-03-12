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