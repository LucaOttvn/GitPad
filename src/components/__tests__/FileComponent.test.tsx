import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import FileComponent from "../FileComponent";
import {TypesEnum} from "@/src/utils/enums";

describe("File component", () => {
  it("Renders a link", () => {
    render(
      <FileComponent
        file={{
          name: "dummy file",
          type: TypesEnum.blob,
          path: "/root/dummyFile.md",
          children: [],
        }}
      />
    );

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
  });
});
