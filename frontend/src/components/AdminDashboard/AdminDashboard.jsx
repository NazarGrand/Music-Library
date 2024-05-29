import { useState } from "react";
import { firebase } from "../../config/firebaseConfig";

const AdminDashboard = () => {
  const [url, setUrl] = useState("");

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      try {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(selectedFile.name);

        fileRef.put(selectedFile).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            setUrl(downloadURL);
          });
        });
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.log("No file selected!");
    }
  };

  return (
    <div>
      <p>Admin dashboard</p>

      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default AdminDashboard;
