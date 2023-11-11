import React, { useState, useEffect } from "react";
import { ref, child, get, set } from "firebase/database";
import { db, auth } from "../firebase";
import { MdDelete, MdThumbUp, MdThumbDown } from "react-icons/md";

function ImageCard({ imageUrl, fileName, onImageDelete, email, uploadDateTime, onLikeClick })  {
  const [date, time] = fileName.split("-");
  const [liked, setLiked] = useState(false);
  const [usersWhoLiked, setUsersWhoLiked] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false); // Add state to control user details display

  const fetchLikeStatus = async () => {
    try {
      const imageRef = ref(db, `Images/${fileName}`);
      const imageSnapshot = await get(imageRef);

      if (imageSnapshot.exists()) {
        const likedBy = imageSnapshot.val().likedBy || {};
        const likedUsers = Object.keys(likedBy);
        setUsersWhoLiked(likedUsers);
        setLiked(likedUsers.includes(email));
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        console.log(user,"user");
        if (user) {
          const userId = user.uid;
          const userRef = ref(db, `Details/${userId}`);
          const userSnapshot = await get(child(userRef, ""));
        
          if (userSnapshot.exists()) {
            setUserData(userSnapshot.val());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchLikeStatus();
    fetchUserData();
  }, [email, fileName]);

  const updateLikedStatus = async () => {
    try {
      const likedByRef = ref(db, `Images/${fileName}/likedBy`);
      const likedStatus = liked ? null : true; // If liked, remove like; if not liked, add like
      await set(likedByRef, { ...usersWhoLiked, [email]: likedStatus });

      // After updating the like status, fetch the updated like status
      fetchLikeStatus();
    } catch (error) {
      console.error("Error updating liked status:", error);
    }
  };

  const showDetails = async () => {
    // You can modify this part to fetch additional details from the database
    setShowUserDetails(true);
  };

  const hideDetails = () => {
    setShowUserDetails(false);
  };

  return (
    <div>
      <div className="border border-[#00df9a] ml-4 p-4 mt-5 ">
        <img src={imageUrl} alt="Uploaded" width="200" height="200" />
        <p className="text-[#00df9a]">Email: {email}</p>
        <p className="text-[#00df9a]">Upload Date: {date}</p>
        <p className="text-[#00df9a]">Upload Time: {time}</p>
        {liked && userData && (
          <div>
            <p className="text-[#00df9a]">Name: {userData.name}</p>
            <p className="text-[#00df9a]">Phone Number: {userData.phonenumber}</p>
          </div>
        )}
        <div className="flex justify-around mt-3">
          <button className="text-white" onClick={updateLikedStatus}>
            {liked ? <MdThumbDown /> : <MdThumbUp />}
          </button>
          <MdDelete className="text-white" onClick={onImageDelete} />
          {/* Button to show user details */}
          <button className="text-white" onClick={showDetails}>
            Show Details
          </button>
        </div>
        {/* Display list of users who liked the image */}
        {usersWhoLiked.length > 0 && (
          <div className="mt-3">
            <p className="text-[#00df9a]">Liked by: {usersWhoLiked.join(", ")}</p>
          </div>
        )}
      </div>
      {/* Modal or section to display user details */}
      {showUserDetails && (
        <div className="modal">
          <div className="modal-content">
            {/* Check if userData is not null before accessing its properties */}
            <p>Name: {userData?.name || 'N/A'}</p>
            <p>Phone Number: {userData?.phonenumber || 'N/A'}</p>
            <button onClick={hideDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageC