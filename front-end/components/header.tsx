import Link from 'next/link';
import Language from './language';

const Header: React.FC = () => {
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
        <Link href="/login" className="nav-link px-4 fs-5 text-white">
          Log In
        </Link>
        <Link href="/logout" className="nav-link px-4 fs-5 text-white">
          Log out
        </Link>
        {/* {loggedInUser && (
          <div className= "text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {t("headel.welcome")}, {loggedInUser.fullname}!
          </div>
        )} */}
        <Language/>
      </nav>
    </header>
  );
};

export default Header;
