import React from 'react';
import './GIFDefinition.css';
const GIFDefinition = () => (
	<div className="definition">
	<iframe width="560"
					height="315"
					title="YT"
					src="https://www.youtube.com/embed/CBtKxsuGvko?rel=0&amp;start=55"
					framebBrder="0"
					allow="autoplay; encrypted-media"
					allowFullScreen></iframe>
		<h1>GIF</h1>
		<p>/jif/
		noun</p>
		<div className="copy">{`The creators of the format pronounced the word as "jif" 
		with a soft "G" as in "gin". Steve Wilhite says that the intended pronunciation 
		deliberately echoes the American peanut butter brand Jif, and CompuServe employees 
		would often say "Choosy developers choose GIF", spoofing this brand's television 
		commercials.`}</div>
	</div>
);

export default GIFDefinition;