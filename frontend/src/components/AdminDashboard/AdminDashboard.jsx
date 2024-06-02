import { useEffect, useState } from "react";
import { firebase } from "../../config/firebaseConfig";
import * as trackService from "../../services/TrackService.js";
import AdminTracksList from "../AdminTracksList/AdminTracksList";
import Loader from "../Loader/Loader.jsx";

const AdminDashboard = () => {
  const [url, setUrl] = useState("");

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const adminTracks = await trackService.getAllTracks();
      console.log(adminTracks.data);
      setTracks(adminTracks.data);
    } catch (e) {
      console.error("Error getting data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <p>Admin dashboard</p>
          <input type="file" onChange={handleFileUpload} />

          <AdminTracksList trackItems={tracks} />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
