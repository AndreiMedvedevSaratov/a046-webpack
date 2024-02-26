import { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import About from '@/pages/About/About';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Calendar from '@/assets/calendar.svg';
import Image from '@/assets/app-image.svg';

// Tree Shaking
function TODO(a: number) {
  console.log('TODOFUNCTION');
}

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(prev => prev + 1);
  TODO(51234);

  if (__PLATFORM__ === 'desktop') {
    return <div>ISDESKTOPPLATFORM</div>
  }

  if (__PLATFORM__ === 'mobile') {
    return <div>ISMOBILEPLATFORM</div>
  }

  return (
    <div>
      <h1>PLATFORM: {__PLATFORM__}</h1>
      <div>
        <img width={100} height={100} src={avatarPng} alt="" />
        <img width={100} height={100} src={avatarJpg} alt="" />
      </div>
      <div>
        <Calendar style={{ color: 'green' }} width={100} height={100} />
        <Image style={{ color: 'red' }} width={100} height={100} />
      </div>
      <Link to={'/about'}>About</Link>
      <br />
      <Link to={'/shop'}>Shop</Link>
      <br />
      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={increment}>
        <span>Increment + 1</span>
      </button>
      <Outlet />
      <About />
    </div>
  )
}