import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MediaContainer.css';

class MediaContainer extends Component {
	
	makeDisplay() {
		const {searchResultData} = this.props;
		return (Object.keys(searchResultData).map(key => {
			const imgData = searchResultData[key].images.fixed_height;
			const styleObj = { "backgroundImage": `url(${imgData.url})`};

			return (<div className="imgWrapper"
									 style={styleObj}
									 alt=""
									 key={imgData.url} />)
		}))
	}

	render() {
		return (
			<div className="mediaContainer">
				{this.makeDisplay()}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	searchResultData: state.collections[state.search.lastSearchTerm] || []
})

export default connect(mapStateToProps)(MediaContainer);