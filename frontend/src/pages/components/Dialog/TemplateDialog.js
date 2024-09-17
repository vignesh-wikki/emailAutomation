import { Modal } from "flowbite-react";
import React, { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import axios from "axios";
import "draft-js/dist/Draft.css";

export default function TempleteModel({
  handleUploadClose,
  uploadtemplete,
  model,
  handlemodels,
  modelData,
}) {
  const [templetedata, setTempletedata] = useState({
    name: "",
    description: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleTempleteData = (event) => {
    const { name, value } = event.target;
    setTempletedata((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const convertToHTMLWithBold = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    let html = "";

    rawContentState.blocks.forEach((block) => {
      let blockHtml = "";
      let boldRanges = [];

      block.inlineStyleRanges.forEach((style) => {
        if (style.style === "BOLD") {
          boldRanges.push({
            start: style.offset,
            end: style.offset + style.length,
          });
        }
      });

      let currentIndex = 0;

      boldRanges.forEach((range) => {
        blockHtml += block.text.slice(currentIndex, range.start);
        blockHtml += `<strong style="font-weight:bold;">${block.text.slice(
          range.start,
          range.end
        )}</strong>`;
        currentIndex = range.end;
      });

      blockHtml += block.text.slice(currentIndex);

      html += `<p>${blockHtml}</p>`;
    });

    return html;
  };

  const handleBoldClick = (e) => {
    e.preventDefault();
    const newEditorState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(newEditorState);
  };

  const handleTempleteUpload = async (event) => {
    setTempletedata((prevFormValues) => ({
      ...prevFormValues,
      content: convertToHTMLWithBold(),
    }));
    console.log(FormData);

    handleUploadClose(false);
    const url = process.env.REACT_APP_CREATE_URL;
    if (templetedata.name && templetedata.content && templetedata.description) {
      await axios
        .post(url, templetedata, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((error) => console.log(error));
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
    setTempletedata({
      name: modelData.name,
      description: modelData.description,
      content: modelData.content,
    });
  };
  const handleUpdatedTempleteUpload = async (event) => {
    event.preventDefault();
    handleUploadClose(false);
    const url = process.env.REACT_APP_EDITED_URL + modelData._id;
    console.log(url);
    await axios
      .put(url, templetedata, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        handlemodels(false);
        setIsEditing(false);
      })
      .then((error) => console.log(error));
  };

  return (
    <>
      {uploadtemplete && model === false ? (
        <Modal show={uploadtemplete} onClose={() => handleUploadClose(false)}>
          <Modal.Header>Create Templete</Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handleTempleteUpload}
              className="space-y-6 m-9 flex flex-col"
            >
              <label className=" capitalize text-lg font-medium leading-relaxed text-black dark:text-gray-400">
                templete Name
              </label>
              <input
                onChange={handleTempleteData}
                className="border-1 bg-[#f9fafb] border-gray-300 rounded-lg"
                name="name"
                type="text"
                placeholder="templete name"
                required
              />

              <label className=" capitalize text-lg font-medium leading-relaxed text-black dark:text-gray-400">
                Content
              </label>

              <div className="border p-3 h-auto bg-[#f9fafb] border-gray-300 rounded-lg">
                <Editor editorState={editorState} onChange={setEditorState} />
              </div>
              <button
                className=" w-24 border p-2 hover:bg-[#f9fafb]"
                onClick={(e) => handleBoldClick(e)}
              >
                Bold
              </button>
              <label className=" capitalize text-lg font-medium leading-relaxed text-black dark:text-gray-400">
                Description
              </label>
              <input
                onChange={handleTempleteData}
                className="border-1 bg-[#f9fafb] border-gray-300 rounded-lg"
                name="description"
                type="text"
                placeholder="about your templete"
                required
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className=" ps-4">
              <button
                onClick={handleTempleteUpload}
                className="p-2 px-4  text-white hover:bg-orange-300 bg-orange-400 font-medium rounded-lg border black hover:bg-gray"
              >
                save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      ) : (
        model && (
          <Modal
            show={model}
            onClose={() => {
              handlemodels(false);
              setIsEditing(false);
            }}
          >
            <Modal.Header>{modelData.name}</Modal.Header>
            <Modal.Body>
              {isEditing ? (
                <form
                  onSubmit={handleTempleteUpload}
                  className="space-y-6 m-9 flex flex-col"
                >
                  <label className="capitalize text-lg font-medium leading-relaxed text-black dark:text-gray-400">
                    Template Name
                  </label>
                  <input
                    onChange={handleTempleteData}
                    value={templetedata.name}
                    className="border-1 bg-[#f9fafb] border-gray-300 rounded-lg"
                    name="name"
                    type="text"
                    placeholder="Template name"
                    required
                  />
                  <label className=" capitalize text-lg font-medium leading-relaxed text-black dark:text-gray-400">
                    Content
                  </label>

                  <textarea
                    onChange={handleTempleteData}
                    className="border-1 h-auto row-auto bg-[#f9fafb] border-gray-300 rounded-lg"
                    name="content"
                    type="text"
                    value={templetedata.content}
                    placeholder="content"
                    required
                  />

                  <label className=" capitalize text-lg font-medium leading-relaxed text-black dark:text-gray-400">
                    description
                  </label>
                  <input
                    onChange={handleTempleteData}
                    className="border-1 bg-[#f9fafb] border-gray-300 rounded-lg"
                    name="description"
                    type="text"
                    value={templetedata.description}
                    placeholder="description"
                    required
                  />
                </form>
              ) : (
                <div className="space-y-6 m-9">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Dear username,
                  </p>
                  <div
                    className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: modelData.content }}
                  />
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Sincerely,
                    <br />
                    username
                  </p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <div className="ps-4">
                <button
                  onClick={(e) => {
                    if (isEditing) {
                      handleUpdatedTempleteUpload(e);
                    } else {
                      handlemodels(false);
                    }
                  }}
                  className="p-2 px-4 text-white hover:bg-orange-300 bg-orange-400 font-medium rounded-lg border black hover:bg-gray"
                >
                  {isEditing ? "Save" : "Close"}
                </button>
              </div>
              {!isEditing && (
                <div className="ps-4">
                  <button
                    onClick={handleEdit}
                    className="p-2 px-4 hover:text-orange-400 hover:bg-gray-50 text-black  font-medium rounded-lg border black hover:bg-gray"
                  >
                    Edit
                  </button>
                </div>
              )}
            </Modal.Footer>
          </Modal>
        )
      )}
    </>
  );
}
