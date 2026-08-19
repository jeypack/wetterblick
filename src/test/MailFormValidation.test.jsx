import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MailFormValidation from "../components/MailFormValidation";

describe("MailFormValidation component", () => {
  test("renders all form elements", () => {
    render(<MailFormValidation />);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const subjectInput = screen.getByPlaceholderText(/Betreff/i);
    const messageInput = screen.getByPlaceholderText(/Nachricht/i);
    const submitButton = screen.getByRole("button", {name: /Senden/i});

    expect(emailInput).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("MailformValidation form errors are displayed when submitting", async () => {
    const user = userEvent.setup();
    render(<MailFormValidation />);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const subjectInput = screen.getByPlaceholderText(/Betreff/i);
    const messageInput = screen.getByPlaceholderText(/Nachricht/i);
    const submitButton = screen.getByRole("button", {name: /Senden/i});
    await user.click(submitButton);

    expect(
      await screen.findByText(/Bitte eine gültige Email eingeben./i),
    ).toBeInTheDocument();
    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);
    expect(
      await screen.findByText(/Bitte einen Betreff eingeben./i),
    ).toBeInTheDocument();
    await user.type(subjectInput, "Test Subject");
    await user.click(submitButton);
    expect(
      await screen.findByText(/Bitte eine Nachricht eingeben./i),
    ).toBeInTheDocument();
  });

  test("MailformValidation form submits successfully with valid data", async () => {
    const user = userEvent.setup();
    render(<MailFormValidation />);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const subjectInput = screen.getByPlaceholderText(/Betreff/i);
    const messageInput = screen.getByPlaceholderText(/Nachricht/i);
    const submitButton = screen.getByRole("button", {name: /Senden/i});

    await user.type(emailInput, "test@example.com");
    await user.type(subjectInput, "Test Subject");
    await user.type(messageInput, "Test Message");
    await user.click(submitButton);

    expect(
      await screen.findByText(/Formular erfolgreich gesendet!/i),
    ).toBeInTheDocument();
  });
});
