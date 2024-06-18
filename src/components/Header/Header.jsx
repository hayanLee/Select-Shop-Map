import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LuArrowRightToLine } from 'react-icons/lu';

function Header() {
  return (
    <div className="flex h-20 w-full items-center justify-between bg-main px-96">
      <div className="flex items-center">
        <Link to={'/'}>
          <img src="public/favicon.png" alt="logo" className="mr-3" style={{ height: '75px' }} />
        </Link>
        <p className="text-3xl font-bold text-blue-950">칠리칠리 소품랜드</p>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 transform text-blue-950" />
          <input
            placeholder="지역을 검색해 주세요..."
            className="h-10 w-80 rounded-3xl pl-10 pr-4 focus:outline-active"
          />
        </div>
        <Link to="/login" className="ml-4 flex items-center text-blue-950">
          <LuArrowRightToLine className="h-28 text-3xl" />
          <p className="ml-3 text-xl font-bold">Log In</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
