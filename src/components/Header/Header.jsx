import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LuArrowRightToLine } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../api/auth';

function Header() {
  const navigate = useNavigate();

  const storedUserInfo = localStorage.getItem('userInfo');

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="bg-main">
      <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-4 md:px-12">
        <div className="flex items-center">
          <Link to={'/'}>
            <img src="src\assets\mainIcon.png" alt="logo" className="mr-2" style={{ height: '50px' }} />
          </Link>
          <p className="text-xl font-bold text-blue-950">칠리칠리 소품랜드</p>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 transform text-blue-950" />
            <input
              placeholder="지역을 검색해 주세요..."
              className="h-8 w-64 rounded-3xl pl-10 pr-4 focus:outline-active"
            />
          </div>
          {storedUserInfo ? (
            <div className="flex items-center">
              <Link to="/mypage" className="ml-3 text-blue-950">
                <p className="text-lg font-bold">My Page</p>
              </Link>
              <p className="ml-3 cursor-pointer text-lg font-bold text-blue-950" onClick={handleLogout}>
                Log Out
              </p>
            </div>
          ) : (
            <Link to="/login" className="ml-3 flex items-center text-blue-950">
              <LuArrowRightToLine className="h-5 w-5 text-2xl" />
              <p className="ml-3 text-lg font-bold">Log In</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
