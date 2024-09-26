import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { PostInfo } from "./Post";
import useSWR from "swr";
import Loading from "./Loading";

type PutEditPostProps = {
  onSuccess: () => void;
  onFailed: (err: string) => void;
  id: string;
};
const deletePostAsync = async ({
  onSuccess,
  onFailed,
  id,
}: PutEditPostProps) => {
  try {
    const requestOptions = {
      method: "DELETE",
    };
    const res = await fetch(
      `http://localhost:8000/delete-post/${id}`,
      requestOptions
    );
    if (!res.ok) {
      const errorRes = await res.json();
      if (errorRes.error) throw new Error(errorRes.error);
      throw new Error("delete post response err");
    }
    const deltePostRes = await res.json();
    if (deltePostRes.error) {
      throw new Error(deltePostRes.error);
    }
    onSuccess();
    return deltePostRes;
  } catch (err) {
    console.log("delete post err:", err.message);
    onFailed(err.message);
    return { error: err.message };
  }
};
const DeletePostBtn = (postInfo: PostInfo) => {
  const pid = postInfo.id;
  const deletePostFormModalID = `edit_post_form_modal_${pid}`;
  const closeModalRef = useRef<HTMLLabelElement>(null);
  const [textInput, setTextInput] = useState("");
  const [isSubmit, setIsSubmt] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextInput(e.target.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmt(true);
  };
  const onFailed = async (err: string) => {
    await setError(err);
    await setIsSubmt(false);
  };

  const onSuccess = async () => {
    const closeModelDom = closeModalRef.current;
    if (closeModelDom) {
      await closeModelDom.click();
    }
    await setError("");
    await setIsSubmt(false);
    alert("Success to delete post!");
  };
  const {
    // data,
    //  error,
    isValidating,
  } = useSWR(
    isSubmit && postInfo.id ? ["/delete-post", postInfo.id] : null,
    () =>
      deletePostAsync({
        onSuccess,
        onFailed,
        id: postInfo.id,
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor={deletePostFormModalID}
        className="btn btn-sm btn-error text-white"
      >
        Delete
      </label>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={deletePostFormModalID}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            {/* modal link */}
            <h1 className="text-2xl font-bold mb-6 text-center">
              Delete Article {pid}
            </h1>
            <hr className="mb-4" />

            <p className="text-lg mb-4">
              To confirm, type Article <strong>{pid}</strong> in the box below:
            </p>

            {/* Input field with styling */}
            <input
              value={textInput}
              onChange={handleChange}
              type="text"
              className="input input-bordered w-full mb-4 p-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring focus:ring-red-200"
            />

            {/* Button with styling */}
            <button
              type="submit"
              disabled={textInput !== pid}
              className="btn btn-error w-full text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
            >
              {isValidating ? <Loading /> : "Delete this article"}
            </button>
          </form>
        </div>

        <label
          ref={closeModalRef}
          className="modal-backdrop"
          htmlFor={deletePostFormModalID}
          onClick={() => {
            setTextInput("");
          }}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default DeletePostBtn;
