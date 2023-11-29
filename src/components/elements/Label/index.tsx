interface LabelProps {
  htmlFor: string;
  text: string;
}

export default function Label(props: LabelProps) {
  const { text, htmlFor } = props;
  return (
    <label
      htmlFor={htmlFor.toLowerCase()}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {text}
    </label>
  );
}
