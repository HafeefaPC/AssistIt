import React from "react";
import { MdDelete, MdThumbUp, MdThumbDown } from "react-icons/md";

function ImageCard({ imageUrl, fileName, onImageDelete, email, uploadDateTime, liked, onLikeClick }) {
  // Split the file name to extract the date and time
  const [date, time] = fileName.split("-");

  return (
    <div className="image-card">
      <img src={imageUrl} alt="Uploaded" width="200" height="200" />
      <p>Email: {email}</p>
      <p>Upload Date: {date}</p>
      <p>Upload Time: {time}</p>
      <button onClick={() => onLikeClick(liked)}>
        {liked ? <MdThumbDown /> : <MdThumbUp />}
      </button>
      <MdDelete onClick={() => onImageDelete()} />
    </div>
  );
}

export default ImageCard;
