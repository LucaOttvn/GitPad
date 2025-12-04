"use client";
import {ChangeEvent, useState} from "react";
import Markdown from "react-markdown";
import {itemsToPush} from "../utils/signals";
import "./shared-styles.scss";
import {useSignal} from "@preact/signals-react";

interface FileEditorProps {
  filePath: string;
  fileContent: string;
  isPreviewMode: boolean;
}

export default function FileEditor(props: FileEditorProps) {
  useSignal();

  const [text, setText] = useState(props.fileContent);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedText = event.target.value;
    setText(updatedText);

    // Check if the item is already in the list of updated items the need to be pushed
    const foundIndex = itemsToPush.value.findIndex((item) => item.path === props.filePath);

    // If it's not in the list, add it
    if (foundIndex === -1) {
      itemsToPush.value = [
        ...itemsToPush.value,
        {
          path: props.filePath,
          content: updatedText,
        },
      ];
      return;
    }

    // If it's in the list but the user went back to the previous version, so there are no changes to push, remove it
    if (updatedText === props.fileContent) {
      const updatedArr = itemsToPush.value.filter((item) => item.path !== props.filePath);

      itemsToPush.value = updatedArr;
      return;
    }

    // If it's in the list already, update it
    itemsToPush.value = itemsToPush.value.map((item, index) => (index === foundIndex ? {...item, content: updatedText} : item));
  };

  return (
    <div className="w-full h-full">
      {props.isPreviewMode ? (
        <div
          className="w-full h-full flex flex-col justify-start items-start overflow-auto prose dark:prose-invert"
          style={{
            padding: "1rem",
            paddingBottom: "6rem",
          }}
        >
          {props.fileContent && <Markdown>{props.fileContent}</Markdown>}
        </div>
      ) : (
        <textarea name="Textarea" value={text} onChange={handleChange}></textarea>
      )}
    </div>
  );
}
