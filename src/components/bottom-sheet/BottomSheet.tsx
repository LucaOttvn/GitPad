import {createFile} from "@/src/server-actions/create-file";
import {usePathname} from "next/navigation";
import {useActionState} from "react";
import {Sheet} from "react-modal-sheet";

interface BottomSheetProps {
  isOpen: boolean;
  handleBottomSheet: (value: boolean) => void;
}

export default function BottomSheet(props: BottomSheetProps) {
  const pathName = usePathname();
  const sections = pathName
    .split("/")
    .filter((x) => x)
    .slice(1);

  const [state, handleCreateFile, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    const filePathName = sections.join("/");
    const name = formData.get("name") as string;

    // Validate input
    if (!name || name.trim() === "") {
      return {success: false, message: "Name cannot be empty"};
    }

    const trimmedName = name.trim();

    // Check if it's a folder (starts with /)
    if (trimmedName.endsWith("/")) {
      const folderName = trimmedName.slice(1); // Remove leading /
      if (!folderName) {
        return {success: false, message: "Folder name cannot be empty"};
      }
      await createFile(`${filePathName}/${trimmedName}`, ""); // GitHub creates folder with trailing /
    }
    // Check if it's a file with allowed extension
    else if (trimmedName.endsWith(".txt") || trimmedName.endsWith(".md")) {
      await createFile(`${filePathName}/${trimmedName}`, "");
    }
    // Block other extensions
    else {
      return {
        success: false,
        message: "Only .txt, .md files or folders (prefix with /) are allowed",
      };
    }

    props.handleBottomSheet(false);
    return {success: true, message: `Created ${trimmedName.startsWith("/") ? "folder" : "file"} successfully!`};
  }, null);

  return (
    <Sheet
      isOpen={props.isOpen}
      onClose={() => props.handleBottomSheet(false)}
      detent="content"
      className="bottomSheet"
      tweenConfig={{
        ease: "easeInOut",
        duration: 0.25,
      }}
    >
      <Sheet.Container className="bottomSheetContainer">
        <Sheet.Header className="bottomSheetHeader">
          <Sheet.DragIndicator />
          <h2>Create new item or folder</h2>
        </Sheet.Header>
        <Sheet.Content className="bottomSheetContent">
          <form action={handleCreateFile}>
            <input name="name" type="text" className="mainInputField" placeholder="Prefix with / to create folder, use .txt or .md for files" disabled={isPending} required />
            {state?.message && <p className={`text-sm mt-2 ${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>}
            <div className="w-full center gap-4 flex">
              <button type="button" className="mainButton clickableItem" onClick={() => props.handleBottomSheet(false)} disabled={isPending}>
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="mainButton clickableItem"
                style={{
                  background: "var(--darkWhite)",
                  color: "var(--black)",
                }}
                disabled={isPending}
              >
                <span>{isPending ? "Creating..." : "Create"}</span>
              </button>
            </div>
          </form>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop unstyled onTap={() => props.handleBottomSheet(false)} className="bottomSheetBackdrop" />
    </Sheet>
  );
}
