import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { Input, Button } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import firebase from "../config/Firebase";
import { db } from "../config/Firebase";

function EditProfile(props) {
	const user = props.user;
	const [name, setName] = useState(props.user.name);
	const [fileName, setFileName] = useState("");
	const [value, setValue] = useState(0);
	const [fileURL, setFileURL] = useState(props.user.fileURL);
	const [bio, setBio] = useState(props.user.bio);

	let handleUpload = async (e) => {
		let file = e.target.files[0];
		//storage Ref
		let storageRef = firebase.storage().ref();
		//create file ref
		let fileRef = storageRef.child(file.name);
		//upload file
		let task = fileRef.put(file);
		//update progress bar
		task.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setValue(progress);
			},
			(error) => console.log({ error: error.message }),
			async () => {
				setFileURL(await fileRef.getDownloadURL());
				setFileName(file.name);
			}
		);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		if (user) {
			db.collection("users").doc(user.id).update({
				name: name,
				bio: bio,
				fileURL: fileURL,
			});
			props.toggleEdit();
		}
	};

	return (
		<div className="edit">
			<div className="edit__card">
				<h2>Edit Info</h2>
				<form className="edit__form" onSubmit={handleUpdate}>
					<Input
						type="text"
						placeholder="Username 20 characters"
						autoFocus={true}
						value={name}
						inputProps={{ maxLength: 20 }}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						type="text"
						placeholder="Edit bio: 150 characters max"
						multiline={true}
						rows={2}
						inputProps={{ maxLength: 150 }}
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
					<label>
						<input
							type="file"
							accept="image/x-png,image/jpeg"
							onChange={handleUpload}
						/>
						<AddPhotoAlternateIcon />
						{fileName === "" || fileName === null ? "Profile Image" : fileName}
					</label>
					<progress value={value} min="0" max="100" className="uploader">
						{`${value}%`}
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
