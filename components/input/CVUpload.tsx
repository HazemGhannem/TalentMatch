import React from 'react'

const CVUpload = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex space-x-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white font-medium">
          2
        </div>
        <label>Upload your CV</label>
      </div>
      <input id="pdf-upload" type="file"  accept=".pdf" />
    </div>
  );
}

export default CVUpload