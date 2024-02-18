import { Plus } from "lucide-react";
import { Button } from "../../components";
import useLoader from "../../hooks/useLoader";
import { showToast } from "../../components/Toast";
import { uploadImage } from "../../lib/storage";

const FileUploader = () => {
  const { loader, setLoader } = useLoader(false);
  const handleUpload = async () => {
    setLoader(true);
    try {
      const [fileHandle] = await window.showOpenFilePicker();
      const file: File = await fileHandle.getFile();

      const data = await file.arrayBuffer();
      const metadata = {
        name: file.name,
        contentType: file.type,
        size: file.size,
        timeCreated: new Date().getMilliseconds(),
      };

      const [error, snapshot] = await uploadImage(data, metadata);

      if (error) {
        throw error;
      }

      console.log(snapshot);
      showToast("File uploaded successfully", "success", 3000);
    } catch (e) {
      console.error(e);
      showToast("Failed to upload file", "error", 3000);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex justify-between">
      <h4 className="text-lg">Files</h4>
      <Button
        onClick={handleUpload}
        startIcon={<Plus size={16} />}
        disabled={loader}
      >
        New File
      </Button>
    </div>
  );
};

export default FileUploader;
