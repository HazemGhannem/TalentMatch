import React from 'react'

const JobDescriptionInput = () => {
  return (
      <div className="flex flex-col gap-4">
        <div className="flex space-x-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white font-medium">
            1
          </div>
          <label>Paste the job description</label>
        </div>
        <textarea></textarea>
      </div>
  );
}

export default JobDescriptionInput