import React, { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebase"; // Correct the path based on your project structure
import ImageCard from "../../components/ImageCard"; // Correct the path based on your project structure

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

            // Extract date and time from the image file name
            const fileNameParts = item.name.split('_');
            const date = fileNameParts[1];
            const time = fileNameParts[2];

            return {
              imageUrl: url,
              fileName: item.name,
              date,
              time,
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
          date={image.date}
          time={image.time}
          onImageDelete={() => handleImageDelete(image.fileName)}
        />
      ))}
      {/* Rest of your Group.js component */}
    </div>
  );
}

export default Group;
