import { useEffect } from "react";
import FileUploader from "../../components/home/FileUploader";
import { listAllImages } from "../../lib/storage";

const Home = () => {
  useEffect(() => {
    const fetchFiles = async () => {
      const [error, files] = await listAllImages();

      if (error) {
        return;
      }
      console.log(files);
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-4 h-full ">
      <div className="rounded-md bg-zinc-800 h-full p-4">
        <FileUploader />
      </div>
    </div>
  );
};

export default Home;
