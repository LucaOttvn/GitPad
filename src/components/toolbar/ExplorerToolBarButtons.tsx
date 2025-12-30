import Image from "next/image";
import {useState} from "react";
import BottomSheet from "../bottomSheet/BottomSheet";
import Link from "next/link";
import {BottomSheetsEnum, PagesEnum} from "@/src/utils/enums";
import {useSignals} from "@preact/signals-react/runtime";
import Button from "../buttons/Button";
import AnimatedDiv from "../animated/AnimatedDiv";
import {selectedFiles} from "@/src/utils/signals";
import {deleteItem} from "@/src/server-actions/delete-item";
import toast from "react-hot-toast";

export default function ExplorerToolBarButtons() {
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
                for (const item of selectedFiles.value) {
                  try {
                    const promise = deleteItem(item);
                    console.log(promise)
                    await toast.promise(promise, {
                      loading: `Deleting item${selectedFiles.value.length > 0 ? 's' : ''}...`,
                      success: "Item deleted successfully!",
                      error: "Error while deleting",
                    });
                    location.reload();
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              className="mainButton"
              style={{
                background: "var(--white)",
                color: "var(--blue)",
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
      }
    );
  };

  if (!selectedFiles.value) {
    return (
      <>
        {/* Plus button */}
        <button onClick={() => setCurrentBottomSheet(BottomSheetsEnum.createItem)} className="mainButton">
          <span>
            <Image src="/icons/add.svg" alt="folder" width={25} height={25} />
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
            <Image src="/icons/edit.svg" alt="folder" width={25} height={25} />
          </span>
        </button>
        {/* Settings button */}
        <Link className="mainButton" href={`/${PagesEnum.settings}`}>
          <span>
            <Image src="/icons/settings.svg" alt="folder" width={25} height={25} />
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
            background: "var(--white)",
            color: "var(--black)",
          }}
          disabled={selectedFiles.value.length === 0}
        />
      </AnimatedDiv>
    </>
  );
}
