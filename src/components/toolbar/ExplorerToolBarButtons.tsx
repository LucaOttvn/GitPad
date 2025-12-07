import Image from "next/image";
import {useState} from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {PagesEnum} from "@/src/utils/enums";

export default function ExplorerToolBarButtons() {
  const pathName = usePathname();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomSheet = (value: boolean) => {
    setIsBottomSheetOpen(value);
  };

  const home = `/${PagesEnum.fileExplorer}`

  return (
    <div className="w-full flex items-center justify-between gap-2">
      {/* Plus button */}
      <button onClick={() => setIsBottomSheetOpen(true)} className="mainButton clickableItem">
        <span>
          <Image src="/icons/add.svg" alt="folder" width={20} height={20} />
        </span>
      </button>
      {/* Home button */}
      <Link href={`/${PagesEnum.fileExplorer}`} className={`mainButton clickableItem ${pathName === home ? "disabledLink" : ""}`}>
        <span>
          <Image src="/icons/home.svg" alt="folder" width={20} height={20} />
        </span>
      </Link>
      <div className="flex gap-2">
        {/* Search button */}
        <button className="mainButton clickableItem" disabled>
          <span>
            <Image src="/icons/search.svg" alt="folder" width={20} height={20} />
          </span>
        </button>
        {/* Settings button */}
        <button className="mainButton clickableItem" disabled>
          <span>
            <Image src="/icons/settings.svg" alt="folder" width={20} height={20} />
          </span>
        </button>
      </div>
      <BottomSheet isOpen={isBottomSheetOpen} handleBottomSheet={handleBottomSheet} />
    </div>
  );
}
