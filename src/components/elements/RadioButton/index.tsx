interface RadioButtonProps {
  gender: "Male" | "Female";
  checked: string;
  onChange: React.ChangeEventHandler;
}

export default function RadioButton(props: RadioButtonProps) {
  const { gender, checked, onChange } = props;
  return (
    <label
      className={`${
        checked === gender ? "ring-2 ring-indigo-600" : ""
      } group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm`}
    >
      <input
        type="radio"
        name="gender"
        value={gender}
        className="sr-only"
        aria-labelledby={`${gender}-1-label`}
        checked={checked === gender}
        onChange={onChange}
      />
      <span id={`${gender}-1-label`}>{gender}</span>
    </label>
  );
}
