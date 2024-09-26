import React from "react";
import { Icon } from "@iconify-icon/react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Icon icon="eos-icons:bubble-loading" className="h-6 w-6" />
      <span className="text-lg">Loading...</span>
    </div>
  );
};

export default Loading;
