import { useState } from "react";
import { firebase } from "../../config/firebaseConfig";

const AdminDashboard = () => {
  const [url, setUrl] = useState("");

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setUrl(downloadURL);
        });
      });
    } else {
      console.log("No file selected!");
    }
  };

  return (
    <div>
      <p>Admin dashboard</p>

      <input type="file" onChange={handleFileUpload} />

      <input
        type="text"
        placeholder="Add URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  );
};

export default AdminDashboard;
