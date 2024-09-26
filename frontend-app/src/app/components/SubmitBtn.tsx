import React from "react";
import Loading from "./Loading";

type SubmitBtnProps = {
  isValidating: boolean;
  submitBtnText: string;
};
// submitBtnText: "Create Post" | "Edit Post"
export function SubmitBtn({
  isValidating = false,
  submitBtnText,
}: SubmitBtnProps) {
  return (
    <button
      type="submit"
      disabled={isValidating}
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {isValidating ? <Loading /> : submitBtnText}
    </button>
  );
}

export default SubmitBtn;
