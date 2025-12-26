import {BottomSheetsEnum} from "@/src/utils/enums";
import {useActionState, useState} from "react";
import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";
import AnimatedDiv from "../animated/AnimatedDiv";

interface UpdateItemFormProps {
  handleBottomSheet: (value: BottomSheetsEnum | null) => void;
}

enum Modes {
  renaming = "renaming",
  deleting = "deleting",
}

export default function UpdateItemForm(props: UpdateItemFormProps) {
  const [currentMode, setCurrentMode] = useState<Modes | null>(null);
  const [state, handleCreateFile, isPending] = useActionState(async (prevState: any, formData: FormData) => {}, null);

  return (
    <>
      {currentMode === Modes.renaming && (
        <AnimatedDiv>
          <form action={handleCreateFile} className="flex flex-col gap-6">
            <TextInput name="newItemName" placeholder="Insert name" state={state || null} />

            <div className="w-full center flex">
              <Button onClick={() => props.handleBottomSheet(null)} disabled={isPending} label="Cancel" />

              <button
                type="submit"
                className="mainButton clickableItem"
                style={{
                  background: "var(--darkWhite)",
                  color: "var(--black)",
                }}
                disabled={isPending}
              >
                <span>{isPending ? "Creating..." : "Confirm"}</span>
              </button>
            </div>
          </form>
        </AnimatedDiv>
      )}

      {currentMode === Modes.deleting && (
        <AnimatedDiv className="center flex-col gap-6">
          <span
            style={{
              background: "var(--blue)",
              color: "var(--white)",
            }}
            className="w-full center text-center"
          >
            Do you really want to delete this folder?
          </span>
          <div className="w-full center gap-3">
            <Button onClick={() => props.handleBottomSheet(null)} disabled={isPending} label="Cancel" />
            <Button onClick={() => {}} disabled={isPending} label="Confirm" className="accentButton" />
          </div>
        </AnimatedDiv>
      )}

      {!currentMode && (
        <AnimatedDiv className="center flex-col gap-2">
          <Button onClick={() => setCurrentMode(Modes.renaming)} disabled={isPending} label="Rename" className="accentButton" />
          <Button onClick={() => setCurrentMode(Modes.deleting)} disabled={isPending} label="Delete" className="accentButton" />
          <Button onClick={() => props.handleBottomSheet(null)} disabled={isPending} label="Back" />
        </AnimatedDiv>
      )}
    </>
  );
}
