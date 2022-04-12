import { useSelector } from 'react-redux';
import './mainpage.scss';

export default function MainPage() {
  const { auth } = useSelector((state) => state);

  return (
    <div className='main_wrapper'>
      <h1> Hi, {auth.user.first_name}</h1>
      <div>
        <h2>I know, that your surname is {auth.user.last_name}</h2>
      </div>
      <div>
        <h2>Maybe your email is {auth.user.email}?</h2>
      </div>
      <div>
        <h2>Anyway, nice to meet you!</h2>
      </div>
    </div>
  );
}
