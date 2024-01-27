import ForgotPassWord from "./ForgotPassWord";
import { render } from "@testing-library/react";

describe("ForgotPassWord Component", () => {
  test("should render the component", () => {
    render(<ForgotPassWord />);
    const email = screen.getByText(
      "Enter the email with which you have registered"
    );
    expect(email).toBeInTheDocument();
  });
});
