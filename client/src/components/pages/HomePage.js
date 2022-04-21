import React from 'react'
const HomePage = () => {
    const link = "https://developer.softlab.co.ke";
	const target = "_blank";

	return (
		<div  style={{marginTop:'-50px'}}  className="container">
			<h1>MERN Stack CRUD</h1>
			<p>
				<b>Front-end</b>: React.js v17+ with Bootstrap3&styled-components.
			</p>
			<p>
				<b>Back-end</b>: Node.js, Express.js
			</p>
			<p>
				<b>Database</b>: MongoDB Atlas with Mongoose ODM
			</p>
			<p>
				<b>Developed By</b>: Simon Njuguna
				<p>
					<a href={link} target={target}>
						website
					</a>
				</p>
			</p>
		</div>
	);
}

export default HomePage