const InputGroup = ({ children, className = '' }) => {
  return (
    <div className={`grid sm:grid-cols-2 gap-x-2 ${className && className}`}>
      {children}
    </div>
  )
}

export { InputGroup }
