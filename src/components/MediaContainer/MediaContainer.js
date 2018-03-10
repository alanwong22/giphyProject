import React, { Component } from 'react';
import './MediaContainer.css';

import { connect } from 'react-redux';

class MediaContainer extends Component {
	
	render() {
		console.log("MediaContainer", this.props.searchResultData);

		return (
			<div className="mediaContainer">
				{}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	searchResultData: state.search.lastSearchResult
})

export default connect(mapStateToProps)(MediaContainer);