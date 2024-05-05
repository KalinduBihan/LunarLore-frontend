import React from "react";

const MarsCard = ({ cameraName, cameraFullName, earthDate, id, img_src }) => {
  return (
    <div className="w-80 mx-3 mb-4 ml-5 rounded-lg border-2 border-indigo-500 ">
      <div className="block rounded-lg bg-neutral-700">
        <img className="rounded-t-lg h-80" src={img_src} alt="mars-rover-img" />
        <div className="p-4 rounded-b-lg marsDetail">
          <p className="mb-2 text-3xl font-medium leading-tight text-slate-50">
            {cameraName}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-200">
            {cameraFullName}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-200">
            {earthDate}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-200">{id}</p>
        </div>
      </div>
    </div>
  );
};

export default MarsCard;
