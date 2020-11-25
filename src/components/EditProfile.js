import React from "react";
import "./EditProfile.css";
import { Input, Button } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import firebase from "firebase";
import { useStateValue } from "../config/StateProvider";

function EditProfile(props) {
	let user = useStateValue();
	let handleUpload = (e) => {
		let file = e.target.files[0];
		//storage Ref
		let storageRef = firebase.storage().ref(`${user.uid}/` + file.name);
		//upload file
		let task = storageRef.put(file);
		//update progress bar
		task.on(
			"state_changed",
			function progress(snapshot) {
				let percentage =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				document.querySelector(".uploader").value = percentage;
			},

			function error(err) {
				alert("ERROR: ", err);
			},

			function complete() {
				console.log("complete");
			}
		);
	};
	return (
		<div className="edit">
			<div className="edit__card">
				<h2>Edit Info</h2>
				<form className="edit__form">
					<Input type="text" placeholder="Username" autoFocus={true} />
					<Input
						type="text"
						placeholder="Edit bio: 150 characters max"
						multiline={true}
						rows={2}
						inputProps={{ maxLength: 150 }}
					/>
					<label>
						<input
							type="file"
							accept="image/x-png,image/jpeg"
							onChange={handleUpload}
						/>
						<AddPhotoAlternateIcon />
						Profile Image
					</label>
					<progress value="100" min="0" max="100" className="uploader">
						100%
					</progress>
					<div className="edit__cta">
						<Button variant="contained" onClick={props.toggleEdit}>
							Cancel
						</Button>
						<Button type="submit" variant="contained" color="primary">
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditProfile;
