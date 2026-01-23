import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("Renders a textbox with the given name", () => {
    render(<TextInput ariaLabel="New item name" name="newItemName" state={null} />);
    const input = screen.getByRole("textbox", {name: 'New item name'});
    expect(input).toHaveAttribute("name", "newItemName");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toBeRequired();
  });

  it("Uses placeholder when provided", () => {
    render(<TextInput ariaLabel="New item name" name="newItemName" placeholder="Your name" state={null} />);
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
  });

  it("Is disabled when disabled=true", () => {
    render(<TextInput ariaLabel="New item name" name="newItemName" disabled state={null} />);
    expect(screen.getByRole("textbox")).toBeDisabled(); // jest-dom matcher [web:14]
  });

  it("Does not render the message when state is null", () => {
    render(<TextInput ariaLabel="New item name" name="newItemName" state={null} />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument(); // queryBy* for non-existence [web:35]
  });

  it("Renders the message when state.message is set", () => {
    render(
      <TextInput ariaLabel="New item name"
        name="newItemName"
        state={{ success: true, message: "Looks good" }}
      />
    );
    expect(screen.getByText("Looks good")).toBeInTheDocument();
  });
});
