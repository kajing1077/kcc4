import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useId,
} from 'react';

type Props = {
  label: string;
  type?: string;
  placehoder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // ref?: RefObject<HTMLInputElement> | null;
  classNames?: string;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
};

function LabelInput(
  {
    label,
    inputAttrs,
    type = 'text',
    placehoder = `${label}...`,
    onChange = () => {},
    // ref = null,
    classNames = '',
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();
  // console.log('🚀  id:', id);

  return (
    <div className='my-3 flex'>
      <label htmlFor={id} className='w-32'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placehoder}
        className={`inp ${classNames}`}
        onChange={onChange}
        ref={ref}
        {...inputAttrs}
      />
    </div>
  );
}

const LabelInputRef = forwardRef(LabelInput);

export default LabelInputRef;
