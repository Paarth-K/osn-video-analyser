import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import CloudinaryUploadWidget from "@/components/ImageUploader/CloudinaryUploadWidget";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
export default function HomePage() {
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    document.addEventListener("click", (e) => {
      // console.log(e);
      if (e.target.className == styles.tag) {
        // console.log(e.target.innerText);
        navigator.clipboard.writeText(e.target.innerText);
      }
    });
  }, []);
  const [data, setData] = useState(null);
  const [dataStore, setDataStore] = useState("");
  const [buttonText, setButtonText] = useState("Tag");
  const [fileObj, setFileObj] = useState(undefined);
  const [srtText, setSrtText] = useState("");
  const tagImage = async (event) => {
    // console.log(fileObj);
    const res = await fetch("/api/tag", {
      method: "PUT",
      body: JSON.stringify({
        video: "",
      }),
    });
    console.log("res", res);
    setSrtText(await res.text());
  };
  return (
    <div>
      <input
        onChange={(e) => {
          console.log(e.target.files[0]);
          setFileObj(e.target.files[0]);
        }}
        type="file"
        name="file"
        id="file"
      />
      <button
        onClick={() => {
          tagImage();
        }}
      >
        analyze
      </button>
      <div>{`${srtText}`}</div>
    </div>
  );
}
