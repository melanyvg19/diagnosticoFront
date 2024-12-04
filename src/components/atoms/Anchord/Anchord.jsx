import { Link } from 'react-router-dom'

const Anchord = ({ text, href, className = '' }) => {
  return (
    <Link
      className={`text-white bg-secoundary hover:bg-secoundary-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-secoundary dark:hover:bg-secoundary-hover focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:hover:bg-secoundary-disabled disabled:dark:hover:bg-secoundary-disabled transition-colors text-center disabled:bg-secoundary-disabled ${className && className}`}
      to={href}
    >
      {text}
    </Link>
  )
}

export { Anchord }
