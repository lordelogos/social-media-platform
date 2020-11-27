import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Input } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Button from "@material-ui/core/Button";
import "./AddPost.css";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase, { db } from "../config/Firebase";
import Firebase from "firebase";
import { useStateValue } from "../config/StateProvider";

function AddPost(props) {
	const [{ user }] = useStateValue();
	const [value, setValue] = useState(0);
	const [fileURL, setFileURL] = useState(null);
	const [post, setPost] = useState("");
	const [error, setError] = useState("");
	const [img, setImg] = useState(null);

	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user.uid)
				.onSnapshot((snapshot) => setImg(snapshot.data().fileURL));
		}
	}, [user]);

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
			}
		);
	};

	let history = useHistory();

	let handlePost = () => {
		if (user) {
			if ((post.trim() !== "" && post !== null) || fileURL !== null) {
				console.log(post.trim(), fileURL);
				db.collection("posts").add({
					text: post.trim(),
					photo: fileURL,
					name: user.displayName,
					created_by: user.uid,
					likes: 0,
					timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
				});
				setPost("");
				setFileURL(null);
				props.togglePost();
			} else {
				setError("Post Cannot be empty");
				setTimeout(() => {
					setError("");
					setPost("");
				}, 1500);
			}
		}
	};

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
					<Avatar src={img} />
					<p>{user?.displayName}</p>
				</div>
				<Input
					disableUnderline={true}
					placeholder={error !== "" ? error : "What's on your mind?"}
					multiline={true}
					rows={13}
					value={post}
					onChange={(e) => setPost(e.target.value)}
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
							onChange={handleUpload}
							accept="image/x-png,image/jpeg"
						/>
					</label>
					<progress value={value} min="0" max="100" className="upload">
						{value}%
					</progress>

					<Button onClick={handlePost} variant="contained" color="primary">
						Add Post
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AddPost;
