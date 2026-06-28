import CVUpload from "@/components/input/CVUpload";
import JobDescriptionInput from "@/components/input/JobDescriptionInput";

export default function Home() {
  return (
    <div className="flex justify-between px-18 pt-12">
      <div className="flex flex-col gap-4">
        <JobDescriptionInput />
        <CVUpload />
        <CVUpload />
      </div>
      <div className="">
        <div>TEST 1</div>
      </div>
    </div>
  );
}
