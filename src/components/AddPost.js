import React from "react";
import { Avatar } from "@material-ui/core";
import { Input } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Button from "@material-ui/core/Button";
import "./AddPost.css";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function AddPost(props) {
	// let handleUpload = (e) => {
	// 	let file = e.target.files[0];
	// 	let storageRef = firebase.storage().ref("FOLDER_NAME/FILE_NAME");
	// 	let task = storageRef.put(file);
	// 	task.on("state_changed"),
	// 		function progress(snapshot){
	// 			let percentage =
	// 				(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 			document.querySelector(".upload").value = percentage;
	//         };

	//         function error(err){
	//             alert('Error: ', err)
	//         };

	//         function complete(){
	//             console.log('completed')
	//         }
	// };
	let history = useHistory();

	return (
		<div className="addpost">
			<div className="addpost__card">
				<div className="addpost__title">
					<p>Create Post</p>
					<IconButton onClick={props.togglePost}>
						<CloseIcon
							style={{
								fill: "black",
								background: "#E0e0e0",
								borderRadius: "50%",
								padding: "5px",
							}}
						/>
					</IconButton>
				</div>
				<div className="addpost__user">
					<Avatar />
					<p>User name</p>
				</div>
				<Input
					disableUnderline={true}
					placeholder="What's on your mind?"
					multiline={true}
					rows={13}
					autoFocus={true}
					style={{
						fontSize: "16px",
					}}
				/>
				<div className="addpost__cta">
					<label>
						<AddPhotoAlternateIcon />
						<input
							type="file"
							// onChange={handleUpload}
							accept="image/x-png,image/jpeg"
						/>
					</label>
					<progress value="100" max="100" className="upload">
						100%
					</progress>

					<Button variant="contained" color="primary">
						Add Post
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AddPost;
