import { deleteItem } from "@/src/server-actions/delete-item";
import { BottomSheetsEnum, PagesEnum } from "@/src/utils/enums";
import { selectedFiles } from "@/src/utils/signals";
import { useSignals } from "@preact/signals-react/runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AnimatedDiv from "../animated/AnimatedDiv";
import BottomSheet from "../bottomSheet/BottomSheet";
import Button from "../buttons/Button";
import Icon from "../Icon";

/**
 * This component contains the buttons in the toolbar that are visible while navigating in the file-explorer section.
 */
export default function ExplorerToolBarButtons() {
  const router = useRouter();
  useSignals();
  const [currentBottomSheet, setCurrentBottomSheet] = useState<BottomSheetsEnum | null>(null);

  const handleBottomSheet = (value: BottomSheetsEnum | null) => {
    setCurrentBottomSheet(value);
  };

  const handleMultipleDelete = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span>Do you really want to delete these files?</span>
          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={async () => {
                if (!selectedFiles.value) return;
                toast.dismiss(t.id);

                const deletions = selectedFiles.value.map((file) => deleteItem(file));

                const promises = Promise.all(deletions);

                const result = await toast.promise(promises, {
                  loading: `Deleting item${selectedFiles.value.length > 0 ? "s" : ""}...`,
                  success: "Items deleted successfully!",
                  error: "Error while deleting",
                });

                console.log(result);

                // Refresh the client-side router cache to show the user the updated UI.
                router.refresh();

                selectedFiles.value = null;
              }}
              className="mainButton"
              style={{
                background: "var(--foreground)",
                color: "var(--accent)",
              }}
            >
              <span>Confirm</span>
            </button>
            <button onClick={() => toast.dismiss(t.id)} className="mainButton">
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      },
    );
  };

  if (!selectedFiles.value) {
    return (
      <>
        {/* Plus button */}
        <button onClick={() => setCurrentBottomSheet(BottomSheetsEnum.createItem)} className="mainButton">
          <span>
            <Icon src="/icons/add.svg" />
          </span>
        </button>
        {/* Edit button */}
        <button
          onClick={() => {
            selectedFiles.value = [];
          }}
          className="mainButton"
        >
          <span>
            <Icon src="/icons/edit.svg" />
          </span>
        </button>
        {/* Settings button */}
        <Link className="mainButton" href={`/${PagesEnum.settings}`}>
          <span>
            <Icon src="/icons/settings.svg" />
          </span>
        </Link>
        <BottomSheet currentBottomSheet={currentBottomSheet} handleBottomSheet={handleBottomSheet} />
      </>
    );
  }

  return (
    <>
      <AnimatedDiv className="w-full">
        <Button
          onClick={() => {
            selectedFiles.value = null;
          }}
          label="Cancel"
        />
      </AnimatedDiv>
      <AnimatedDiv className="w-full">
        <Button
          onClick={() => {
            handleMultipleDelete();
          }}
          label="Delete"
          style={{
            background: "var(--foreground)",
            color: "var(--mainBackground)",
          }}
          disabled={selectedFiles.value.length === 0}
        />
      </AnimatedDiv>
    </>
  );
}
