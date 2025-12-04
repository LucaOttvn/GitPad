import Image from "next/image";
import {useState} from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";

export default function ExplorerToolBarButtons() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomSheet = (value: boolean) => {
    setIsBottomSheetOpen(value);
  };

  return (
    <div>
      <button onClick={() => setIsBottomSheetOpen(true)} className="mainButton clickableItem">
        <span>
          <Image src="/icons/add.svg" alt="folder" width={20} height={20} />
        </span>
      </button>
      <BottomSheet isOpen={isBottomSheetOpen} handleBottomSheet={handleBottomSheet} />
    </div>
  );
}
