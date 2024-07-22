// // UploadComponent.js
// import React, { useState } from 'react';
// import { storage } from './firebase';

// const UploadComponent = () => {
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState("");
//   const [progress, setProgress] = useState(0);

//   const handleChange = e => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     const uploadTask = storage.ref(images/${image.name}).put(image);
//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         // Progress function
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(progress);
//       },
//       error => {
//         console.log(error);
//       },
//       () => {
//         // Complete function
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             setUrl(url);
//           });
//       }
//     );
//   };

//   return (
//     <div>
//       <progress value={progress} max="100" />
//       <br />
//       <input type="file" onChange={handleChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <br />
//       {url && <img src={url} alt="Uploaded Image" />}
//     </div>
//   );
// };

// export default UploadComponent;