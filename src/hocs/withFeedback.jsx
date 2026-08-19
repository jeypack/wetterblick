import {useState} from "react";
import Feedback from "../components/Feedback";

const withFeedback = (Component) => {
  return ({message, btnLabel, onSuccess, ...props}) => {
    const [feedback, setFeedback] = useState(false);

    const handleSuccess = () => {
      setFeedback(true);

      if (typeof onSuccess === "function") {
        onSuccess();
      }
    };

    if (feedback) {
      return (
        <Feedback
          message={message}
          btnLabel={btnLabel || "Close"}
          onClose={() => setFeedback(false)}
        />
      );
    }

    return <Component {...props} onSuccess={handleSuccess} />;
  };
};

export default withFeedback;
