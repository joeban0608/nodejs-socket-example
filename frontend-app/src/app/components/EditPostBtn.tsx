"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import SubmitBtn from "./SubmitBtn";
import { PostInfo } from "./Post";
import useSWR from "swr";

interface FormData {
  title: string;
  description: string;
  link: string;
}
type PutEditPostProps = {
  formData: FormData;
  onSuccess: () => void;
  onFailed: (err: string) => void;
  id: string;
};
const putEditPost = async ({
  formData,
  onSuccess,
  onFailed,
  id,
}: PutEditPostProps) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(
      `http://localhost:8000/edit-post/${id}`,
      requestOptions
    );
    if (!res.ok) {
      const errorRes = await res.json();
      if (errorRes.error) throw new Error(errorRes.error);
      throw new Error("edit post response err");
    }
    const editPostRes = await res.json();
    if (editPostRes.error) {
      throw new Error(editPostRes.error);
    }
    onSuccess();
    return editPostRes;
  } catch (err) {
    console.log("edit post err:", err.message);
    onFailed(err.message);
    return { error: err.message };
  }
};
const EditPostBtn = (postInfo: PostInfo) => {
  const initialFormData = {
    title: postInfo.title,
    description: postInfo.description,
    link: postInfo.link,
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmit, setIsSubmt] = useState(false);
  const [error, setError] = useState("");
  const closeModalRef = useRef<HTMLLabelElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    await setFormData(initialFormData);
    await setError("");
    await setIsSubmt(false);
    alert("Success to Update post!");
  };
  const {
    // data,
    //  error,
    isValidating,
  } = useSWR(
    isSubmit && postInfo.id ? ["/edit-post", postInfo.id] : null,
    () =>
      putEditPost({
        formData: formData,
        onSuccess,
        onFailed,
        id: postInfo.id,
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  useEffect(() => {
    setFormData({
      title: postInfo.title,
      description: postInfo.description,
      link: postInfo.link,
    });
  }, [postInfo]);
  const editPostFormModalID = `edit_post_form_modal_${postInfo.id}`;
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor={editPostFormModalID} className=" btn btn-sm">
        Edit
      </label>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={editPostFormModalID}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {/* modal link */}

          <h1 className="text-3xl font-bold mb-6 text-center">
            Edit Your Post
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                value={formData.title}
                onChange={handleChange}
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                value={formData.description}
                onChange={handleChange}
                id="description"
                name="description"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="link"
                className="block text-lg font-medium text-gray-700"
              >
                Link:
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={handleChange}
                id="link"
                name="link"
                // required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {error && <p className="py-2 text-red-500">{error}</p>}
            <SubmitBtn isValidating={isValidating} submitBtnText="Edit Post" />
          </form>
        </div>
        <label
          ref={closeModalRef}
          className="modal-backdrop"
          htmlFor={editPostFormModalID}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default EditPostBtn;
