import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LuArrowRightToLine } from 'react-icons/lu';
import { signOut } from '../../api/auth';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //localStorage에서 키 값을 가져와 사용자 정보 확인 후 user 상태 업데이트
   useEffect(() => {
    const checkUser = () => {
      const currentUser = JSON.parse(localStorage.getItem('sb-qqfwyfugvnciounpkmfi-auth-token'));
      if (currentUser && currentUser.user) {
        setUser(currentUser.user);
      } else {
        setUser(null);
      }
    };

    // 컴포넌트가 마운트될 때 사용자 상태 확인
    checkUser();

    // localStorage 변화를 감지하여 사용자 상태를 업데이트
    window.addEventListener('storage', checkUser);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 클린 업
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem('sb-qqfwyfugvnciounpkmfi-auth-token');
    setUser(null);
    navigate('/');
  };

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
        {user ? (
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
