import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import ImageCard from "../../components/ImageCard";

function Group() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, "images/"); // Change to your storage path

      try {
        const result = await listAll(storageRef);
        const imageArray = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
              imageUrl: url,
              fileName: item.name,
            };
          })
        );
        setImages(imageArray);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    // Call the fetchImages function when the component mounts
    fetchImages();
  }, []);

  const handleImageDelete = async (fileName) => {
    // Delete an image from Firebase Storage and update the state
    const imageRef = ref(storage, `images/${fileName}`);
    await deleteObject(imageRef);

    // Update the images state by removing the deleted image
    setImages((prevImages) => prevImages.filter((image) => image.fileName !== fileName));
  };

  return (
    <div>
      {images.map((image, index) => (
        <ImageCard
          key={index}
          imageUrl={image.imageUrl}
          fileName={image.fileName}
          onImageDelete={handleImageDelete}
        />
      ))}
      {/* Rest of your Group.js component */}
    </div>
  );
}

export default Group;
