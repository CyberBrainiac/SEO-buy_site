import React from 'react';
import style from './home.module.scss';
import Hero from './hero/Hero';
import Tools from './tools/Tools';
import { useDispatch } from 'react-redux';
import { setUserProfl } from '@/containers/reducers/userSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(
      setUserProfl({
        displayName: `${Math.random()}`,
        uid: '11111111',
        freeRequest: '1',
        walletBalance: '0.1',
        lastLogIn: 1702450256459,
        photoURL: 'D:/Projects/site_indexThematicity/src/assets/image/heroAbstrractBackground.svg',
      })
    );
  }

  return (
    <section className="home">
      <div className={style.container}>
        <div className={style.content}>
          <Hero />
          <Tools />
          <button style={{ padding: '5px', backgroundColor: 'beige' }} onClick={handleClick}>
            Change USer Profile
          </button>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h2 id="target1">
            This is target <br /> This is target
          </h2>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h2 id="target2">
            This is target <br /> This is target
          </h2>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
        </div>
      </div>
    </section>
  );
};

export default Home;
