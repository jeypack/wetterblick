import {useState} from "react";
import SignInForm from "../components/SignInForm";
import PageTitle from "../components/PageTitle";
import AddressForm from "../components/AddressForm";
import AddressFormReducer from "../components/AddressFormReducer";
import FileSelector from "../components/FileSelector";
import MailForm from "../components/MailForm";
import MailFormValidation from "../components/MailFormValidation";
import ScrollTop from "../components/ScrollTop";
import withFeedback from "../hocs/withFeedback";

export default function Contact() {
  const [signedIn, setSignedIn] = useState(false);
  const handleSuccess = () => {
    console.log("Form submitted successfully!");
  };
  // HOC withFeedback
  const AddressFormWithFeedback = withFeedback(AddressFormReducer);
  const SignInFormWithFeedback = withFeedback(SignInForm);

  return (
    <>
      <PageTitle title="JP Syntax - Kontakt" />

      <section className="flex flex-col justify-center items-center gap-4 mb-8">
        <AddressFormWithFeedback
          message="Form submitted successfully!"
          onSuccess={handleSuccess}
        />
      </section>
      <section className="flex flex-col justify-center items-center gap-4 mb-8">
        <SignInFormWithFeedback
          message="Welcome!"
          btnLabel="Sign Out"
          onSuccess={(loggedIn) => setSignedIn(loggedIn)}
        />
      </section>
      <section className="flex flex-col justify-center items-center gap-4 mb-8">
        <MailFormValidation />
      </section>
      <section className="flex flex-col justify-center items-center gap-4 mb-8">
        <MailForm />
      </section>
      <section className="flex flex-col justify-center items-center gap-4 mb-8">
        <FileSelector />
      </section>
      <section className="flex flex-col justify-center items-center gap-4 mb-8">
        <AddressForm onSuccess={(loggedIn) => setSignedIn(loggedIn)} />
      </section>
      <div className="fixed bottom-4 right-4">
        <ScrollTop />
      </div>
    </>
  );
}
