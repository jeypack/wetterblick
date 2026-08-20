
import LoginForm from "./LoginForm";

export default function LoginOverlay() {
  

  

  return (
    <div className="fixed inset-0 bg-slate-950 flex justify-center items-center w-full h-screen z-50">
      <LoginForm />
    </div>
  );
}
