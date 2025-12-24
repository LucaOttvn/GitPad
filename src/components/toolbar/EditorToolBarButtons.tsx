"use client";
import {deleteItem} from "@/src/server-actions/delete-item";
import {pushFile} from "@/src/server-actions/push-file";
import {useSignal} from "@preact/signals-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {itemToPush} from "@/src/utils/signals";

interface EditorToolBarButtonsProps {
  sections: string[];
}

/**
 * Buttons that are visible in the ToolBar when the user is in the file editor page.
 */
export default function EditorToolBarButtons(props: EditorToolBarButtonsProps) {
  useSignal();
  const router = useRouter();

  const pathName = usePathname();

  const editorHref = `/${props.sections.slice(0, -1).join("/")}`;

  const filePath = props.sections.slice(1).join("/");

  const handlePush = async () => {
    if (!itemToPush.value || itemToPush.value.path !== filePath) return toast.error("No updates to push");
    try {
      const promise = pushFile(filePath, itemToPush.value.content);

      toast.promise(promise, {
        loading: "Pushing file...",
        success: "File Pushed!",
        error: "Error while pushing",
      });
    } catch (error) {
      console.error(error);
    }

    router.refresh();
  };

  const handleDelete = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span>Do you really want to delete this file? The action is irreversible.</span>
          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);

                try {
                  const promise = deleteItem(filePath);

                  await toast.promise(promise, {
                    loading: "Deleting file...",
                    success: "File deleted!",
                    error: "Error while deleting file",
                  });
                  router.back();
                  itemToPush.value = undefined;
                } catch (error) {
                  console.error(error);
                  toast.error("Item deletion failed");
                }
              }}
              className="mainButton clickableItem"
              style={{
                color: "var(--white)",
              }}
            >
              <span>Confirm</span>
            </button>
            <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  const isPreviewMode = props.sections[props.sections.length - 1] === "preview";

  return (
    <>
      {isPreviewMode ? (
        <Link href={`${editorHref}`} className="mainButton clickableItem">
          <span>Editor</span>
        </Link>
      ) : (
        <Link href={`${pathName}/preview`} className="mainButton clickableItem">
          <span>Preview</span>
        </Link>
      )}

      <button className="mainButton clickableItem" onClick={handlePush}>
        <span>Push</span>
      </button>
      {/* Trash button */}
      <button
        onClick={() => {
          handleDelete();
        }}
        className="mainButton clickableItem"
      >
        <span>
          <Image src="/icons/trash.svg" alt="folder" width={20} height={20} />
        </span>
      </button>
    </>
  );
}
