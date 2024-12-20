import { user } from '@types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {


  const [loggedInUser, setLoggedInUser] = useState<user | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };


  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        Wage Page
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/users" className="nav-link px-4 fs-5 text-white">
          Co-workers
        </Link>
        <Link href="/wageoverview" className="nav-link px-4 fs-5 text-white">
          Wage Overview
        </Link>
        <Link href="/animals" className="nav-link px-4 fs-5 text-white">
          Animals
        </Link>
        {!loggedInUser && (
          <Link
            href="/login"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            Login
          </Link>
        )}
        {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            logout
          </a>
        )}
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            Welcome, {loggedInUser.username}!
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
