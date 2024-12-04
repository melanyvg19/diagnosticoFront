import { useEffect, useState } from 'react'
import './Input.css'

const Input = ({
  autoComplete,
  checked = '',
  className = '',
  errorMessage,
  hasError = false,
  id,
  maxLength = 255,
  name,
  onChange,
  pattern,
  placeholder,
  required = true,
  showPasswordIcon = false,
  type,
  value
}) => {
  useEffect(() => {
    if (id) {
      const handleKeyDown = (event) => {
        if (type === 'number' && event.key === 'e') event.preventDefault()
      }

      const input = document.querySelector(`#${id}`)

      input.addEventListener('keydown', handleKeyDown)

      return () => {
        input.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [type, id])

  const [passwordVisibility, setPasswordVisibility] = useState(type)

  const changePasswordVisibility = () => {
    setPasswordVisibility((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  return (
    <div
      className={`input-position ${checked ? 'checked' : ''} ${className && className}`}
    >
      <input
        autoComplete={autoComplete}
        checked={checked}
        className={`input ${className && className}`}
        id={id}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        pattern={pattern}
        placeholder=""
        type={passwordVisibility}
        value={value}
      />

      {showPasswordIcon && (
        <button
          className="absolute -translate-y-1/2 right-2 top-1/2"
          onClick={changePasswordVisibility}
          type="button"
        >
          <img
            alt="Eye icon to hide and show password"
            className="dark:invert"
            height={24}
            src={
              passwordVisibility === 'password'
                ? '/icons/eye-open.svg'
                : '/icons/eye-closed.svg'
            }
            width={24}
          />
        </button>
      )}

      <label className="select-none input__label" htmlFor={id}>
        {placeholder} {required && <span className="text-red-500">*</span>}
      </label>

      {hasError && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export { Input }
