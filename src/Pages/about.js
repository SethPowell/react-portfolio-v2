import React from "react";
import profilePicture from ".././assets/images/auth/login.jpg";

export default function () {
	return (
		<div className="content-page-wrapper">
			<div
				className="left-column"
				style={{
					background: "url(" + profilePicture + ") no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center"
				}}
			/>
			<div className="right-column">
				My name is Seth Powell and I am a 21 year old Full Stack developer currently living 
                in Utah County. I specialize in Python, JavaScript, and React. I am also proficient 
                in multiple database frameworks including MySQL, MongoDB, and Redis. I have recently 
                graduated from Bottega University with my Full Stack Certification. I'm currently 
                looking for entry level positions to start my career in software development and 
                beginning learning AWS as it seems that the majority of the world runs on AWS.
			</div>
		</div>
	);
}
