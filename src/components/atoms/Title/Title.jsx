const Title = ({ text, className = '' }) => {
  return (
    <h2
      className={`my-2 text-2xl text-center font-bold ${className && className}`}
    >
      {text}
    </h2>
  )
}

export { Title }
