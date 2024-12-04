const CheckboxRadio = ({
  checked = '',
  className = '',
  id,
  name,
  onChange,
  style,
  text,
  type,
  value
}) => {
  return (
    <label
      className="flex items-center px-12 my-2 transition-colors border border-gray-200 rounded cursor-pointer select-none ps-4 dark:border-gray-700 focus:outline-primary focus:outline-1 hover:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600 active:bg-gray-100"
      htmlFor={id}
      style={style}
    >
      <input
        checked={checked}
        className={`w-4 h-4 ${className && className}`}
        id={id}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />

      <p className="w-full py-3 text-sm text-gray-900 ms-2 dark:text-gray-300">
        {text}
      </p>
    </label>
  )
}

export { CheckboxRadio }
