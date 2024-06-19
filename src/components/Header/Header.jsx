import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LuArrowRightToLine } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../api/auth';

function Header() {
  const navigate = useNavigate();

  const storedUserInfo = localStorage.getItem('userInfo');

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex h-20 w-full items-center justify-between overflow-hidden bg-main sm:px-11 xl:px-64">
      <div className="flex items-center">
        <Link to={'/'}>
          <img src="/favicon.png" alt="logo" className="mr-1" style={{ height: '60px', minWidth: '60px' }} />
        </Link>
        <p className="min-w-10 text-2xl font-bold text-blue-950">칠리칠리 소품랜드</p>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 transform text-blue-950" />
          <input
            placeholder="지역을 검색해 주세요..."
            className="h-10 w-80 rounded-3xl pl-10 pr-4 focus:outline-active"
          />
        </div>
        {storedUserInfo ? (
          <div className="flex items-center">
            <Link to="/mypage" className="ml-4 text-blue-950">
              <p className="text-xl font-bold">My Page</p>
            </Link>
            <p className="ml-4 cursor-pointer text-xl font-bold text-blue-950" onClick={handleLogout}>
              Log Out
            </p>
          </div>
        ) : (
          <Link to="/login" className="ml-4 flex items-center text-blue-950">
            <LuArrowRightToLine className="h-28 text-3xl" />
            <p className="ml-3 text-xl font-bold">Log In</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
