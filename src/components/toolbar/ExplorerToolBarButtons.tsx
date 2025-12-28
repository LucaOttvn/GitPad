import Image from "next/image";
import {useState} from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import Link from "next/link";
import {BottomSheetsEnum, PagesEnum} from "@/src/utils/enums";

export default function ExplorerToolBarButtons() {
  const [currentBottomSheet, setCurrentBottomSheet] = useState<BottomSheetsEnum | null>(null);

  const handleBottomSheet = (value: BottomSheetsEnum | null) => {
    setCurrentBottomSheet(value);
  };

  return (
    <>
      {/* Plus button */}
      <button onClick={() => setCurrentBottomSheet(BottomSheetsEnum.createItem)} className="mainButton clickableItem">
        <span>
          <Image src="/icons/add.svg" alt="folder" width={25} height={25} />
        </span>
      </button>
      {/* Settings button */}
      <Link className="mainButton clickableItem" href={`/${PagesEnum.settings}`}>
        <span>
          <Image src="/icons/settings.svg" alt="folder" width={25} height={25} />
        </span>
      </Link>
      <BottomSheet currentBottomSheet={currentBottomSheet} handleBottomSheet={handleBottomSheet} />
    </>
  );
}
