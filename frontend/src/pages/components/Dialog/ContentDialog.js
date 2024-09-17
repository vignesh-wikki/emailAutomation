import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const ContentDialog = ({
  onRequestClose,
  onContentChange,
  uniqueIdentifier,
}) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

  const handleCancel = () => {
    onRequestClose();
  };

  const handlesendContent = () => {
    const htmlContent = convertToHTMLWithBold();
    console.log(htmlContent);
    onContentChange(htmlContent);
    onRequestClose();
  };

  return (
    <div className="bg-white p-7 rounded">
      <h1 className="text-2xl font-bold mb-4">Content:</h1>
      <div className=" bg-white p-2 h-56 rounded w-full border border-gray-300 focus:outline-none focus:border-indigo-500">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
      <button
        onClick={(e) => handleBoldClick(e)}
        className="mt-4 hover:bg-[#D9D9D9] font-bold border w-20 h-10"
        type="button"
      >
        Bold
      </button>
      <div className="pl-5 md:ml-[18rem] mt-3  flex justify-between">
        <Link
          className=" flex text-[#004DE3] items-center"
          onClick={handleCancel}
        >
          Cancel
        </Link>
        <button
          className="bg-[#0C2136] text-white p-1 rounded-md w-32 text-base"
          onClick={handlesendContent}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ContentDialog;
