import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({ onUpload }: { onUpload?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[70vh] text-white bg-[#189DAC] dark:bg-[#0f4b5c] rounded-2xl shadow-lg p-10">
      <UploadCloud className="w-20 h-20 text-white/80 mb-6" />
      <h2 className="text-2xl lg:text-3xl font-bold mb-2">No Images Found</h2>
      <p className="text-md lg:text-lg text-white/70 mb-6 text-center">
        Start by uploading a new image to see it here.
      </p>
      <Button
        onClick={onUpload}
        className="px-6 py-3 text-lg font-bold rounded-xl"
        variant="secondary"
      >
        Upload New Image
      </Button>
    </div>
  );
}
