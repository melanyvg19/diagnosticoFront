const TextArea = ({
  autoComplete,
  className = '',
  id,
  maxLength = 255,
  name,
  onChange,
  placeholder,
  required = true,
  value
}) => {
  return (
    <div className={`input-position ${className && className}`}>
      <textarea
        autoComplete={autoComplete}
        className={`input min-h-28 w-full ${className && className}`}
        id={id}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        placeholder=""
        value={value}
      />

      <label className="select-none input__label text-area-label" htmlFor={id}>
        {placeholder} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  )
}

export { TextArea }
