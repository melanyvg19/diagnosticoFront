const Arrow = ({ width = 40, height = 16 }) => {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 82 16"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M81.202 8.707a1 1 0 0 0 0-1.414L74.838.929a1 1 0 0 0-1.414 1.414L79.08 8l-5.656 5.657a1 1 0 0 0 1.414 1.414zM0 9h80.495V7H0z"
        className="fill-current"
      />
    </svg>
  )
}

export { Arrow }
