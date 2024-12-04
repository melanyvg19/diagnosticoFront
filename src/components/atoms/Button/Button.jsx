import './Button.css'

const Button = ({
  className = '',
  disabled,
  form,
  id,
  isLoading,
  onClick,
  text,
  type
}) => {
  return (
    <button
      className={`flex items-center justify-center text-gray-900 bg-secoundary hover:bg-secoundary-hover hover:text-slate-100 focus:ring-4 focus:ring-blue-300 font-medium select-none rounded-lg text-sm px-5 py-2.5 dark:bg-secoundary focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:hover:bg-secoundary-disabled disabled:dark:hover:bg-secoundary-disabled transition-colors text-center disabled:bg-secoundary-disabled ${className && className}`}
      disabled={disabled}
      form={form}
      id={id}
      onClick={onClick}
      type={type}
    >
      {text}

      {isLoading && <div className="ml-2 loader"></div>}
    </button>
  )
}

export { Button }
