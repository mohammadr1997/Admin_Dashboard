import { UploadCloud } from "lucide-react";

interface propType{
  component:string
}
export default function EmptyState({component}:propType) {
  return (
    <div className="flex -mt-40 md:-mt-12  flex-col items-center justify-center w-full h-[70vh] text-white bg-[#189DAC] dark:bg-[#0f4b5c] rounded-2xl shadow-lg p-10">
      <UploadCloud className="w-20 h-20 text-white/80 mb-6" />
      <h2 className="text-2xl lg:text-3xl font-bold mb-2">No Images Found</h2>
      <p className="text-md lg:text-lg text-white/70 mb-6 text-center">
        Start by uploading a new {`${component=='banner'?'banner':'image'}`} to see it here.
      </p>
     
    </div>
  );
}
