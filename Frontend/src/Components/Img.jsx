import { Image } from "antd";

// global image component
export default function Img({ src, className, alt, preview = false }) {
  return (
    <>
      {preview ? (
        <Image
          src={src}
          className={`w-full ${className ? className : ""}`}
          alt={alt}
        />
      ) : (
        <img src={src} className={className} alt={alt} />
      )}
    </>
  );
}
