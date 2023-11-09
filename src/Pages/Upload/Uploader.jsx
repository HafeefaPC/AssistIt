import { useEffect, useState } from "react";
import "./Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { storage } from "../../firebase"; // Import storage functions

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import storage functions
import { ref as dbRef, push } from "firebase/database";
import { db } from "../../firebase"; // Include the Realtime Database imports

function Uploader() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  useEffect(() => {
    const uploadFile = () => {
      if (image) {
        const name = new Date() + "-" + fileName;
        const storageRef = ref(storage, `images/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed", null, null, async () => {
          // The image has been uploaded, get the download URL
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // Now, store the image URL in the Realtime Database
          const dbImageRef = push(dbRef(db, "images"));
          dbImageRef.set(imageUrl);
        });
      }
    };

    // Call the uploadFile function when the image changes
    if (image) {
      uploadFile();
    }
  }, [image, fileName]);

  return (
    <main>
      
      <form
        action=""
        onClick={() => document.querySelector(".input-field").click()}
        className="hello"
      >
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(files[0]);
            }
          }}
        />
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt={fileName}
            width={200}
            height={200}
          />
        ) : (
          <>
            <MdCloudUpload color="#00df9a" size={60} />
            <p className="text-[#00df9a]">Browse Files to upload</p>
          </>
        )}
      </form>

      <section className="uploaded-row">
        <AiFillFileImage color="#00df9a" />
        <span className="upload-content">
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName("No selected file");
              setImage(null);
            }}
          />
        </span>
      </section>
    </main>
  );
}

export default Uploader;
