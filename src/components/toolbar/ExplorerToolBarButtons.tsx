import Image from "next/image";
import {useState} from "react";
import {Sheet} from "react-modal-sheet";

interface ExplorerToolBarButtonsProps {}

export default function ExplorerToolBarButtons(props: ExplorerToolBarButtonsProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsBottomSheetOpen(true)} className="mainButton clickableItem">
        <span>
          <Image src="/icons/add.svg" alt="folder" width={20} height={20} />
        </span>
      </button>

      <Sheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
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
            <input type="text" className="mainInputField" placeholder="Prefix with / to create a new folder" />
            <div className="w-full center gap-4 flex">
              <button className="mainButton clickableItem" onClick={() => setIsBottomSheetOpen(false)}>
                <span>Cancel</span>
              </button>
              <button
                className="mainButton clickableItem"
                style={{
                  background: "var(--darkWhite)",
                  color: "var(--black)",
                }}
              >
                <span>Create</span>
              </button>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop unstyled onTap={() => setIsBottomSheetOpen(false)} className="bottomSheetBackdrop" />
      </Sheet>
    </div>
  );
}
