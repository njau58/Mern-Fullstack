import React from 'react'

const About = () => {
    const link = "https://developer.softlab.co.ke";
	const target = "_blank";
    return (
		<div  style={{marginTop:'50px'}}  className="container">
		
			<p>CRUD is a fullstack application that follows common patterns in modern web applications in the MERN stack.The app facilitates registration and login.
            Upon success of these operations, authenticated users can have access to the main dashboard.Here, users can;
            among other operations, create profiles for their companies, delete, edit and view them.It is important to note that,
            a user can only perform the afore-mentioned operations to only profiles they created, otherwise hit by 'unauthorized error.'
            Upon registration, users have options of uploading their profile images-limited size of 60KB.

            <p>
					<a href={link} target={target}>
					Find the source code Here.
					</a>
				</p>

			</p>
		</div>
	);
}

export default About