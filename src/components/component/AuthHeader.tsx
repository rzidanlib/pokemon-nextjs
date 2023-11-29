import Logo from "./Logo";

interface AuthHeaderProps {
  text: string;
  errorInfo: string;
}

export default function AuthHeader(props: AuthHeaderProps) {
  const { text, errorInfo } = props;
  return (
    <div className="mx-auto w-full max-w-md">
      <Logo className="mx-auto w-auto" />
      <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {text}
      </h2>
      {errorInfo !== "" && (
        <p className="mt-2 text-center text-md font-bold leading-9 tracking-tight text-red-600">
          {errorInfo}
        </p>
      )}
    </div>
  );
}
