import { Link, useNavigate } from 'react-router-dom';
import { RiAccountBoxLine } from 'react-icons/ri';
import { HiLogout, HiLogin } from 'react-icons/hi';
import { signOut } from '../../api/auth';
import mainIcon from '../../assets/mainIcon.png';
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
            <img src={mainIcon} alt="logo" className="mr-2" style={{ height: '50px' }} />
          </Link>
          <p className="text-xl font-bold text-blue-950">칠리칠리 소품랜드</p>
        </div>
        <div className="flex items-center">
          {storedUserInfo ? (
            <div className="flex items-center space-x-4">
              <Link to="/mypage" className="flex items-center text-blue-950">
                <RiAccountBoxLine className="mr-1 text-xl" />
                <p className="text-lg font-bold">My Page</p>
              </Link>
              <button
                className="flex cursor-pointer items-center text-lg font-bold text-blue-950"
                onClick={handleLogout}
              >
                <HiLogout className="mr-1 text-xl" />
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center text-blue-950">
              <HiLogin className="mr-1 text-xl" />
              <p className="text-lg font-bold">Log In</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
