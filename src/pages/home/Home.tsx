import React from 'react';
import style from './home.module.scss';
import Hero from './hero/Hero';
import Tools from './tools/Tools';
import { useDispatch } from 'react-redux';
import { deleteUserProfl, setUserProfl } from '@/containers/reducers/userSlice';
import { addInputData, removeInputData } from '@/containers/reducers/inputDataSlice';

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

  function handleDelete() {
    
    dispatch(deleteUserProfl());
  }

  function addDataHandler() {
    const singleData = { id: 0, name: 'single' };
    const manyData = [
      { id: 1, url: 'test1' },
      { id: 2, url: 'test2' },
      { id: 3, url: 'test3' },
    ];
    dispatch(addInputData(manyData));
  }

  function removeDataHandler() {
    dispatch(removeInputData());
  }

  return (
    <section className="home">
      <div className={style.container}>
        <div className={style.content}>
          <Hero />
          <Tools />
          <button
            style={{ padding: '5px', margin: '5px', backgroundColor: 'beige' }}
            onClick={handleClick}
          >
            Change User Profile
          </button>
          <button
            style={{ padding: '5px', margin: '5px', backgroundColor: 'beige' }}
            onClick={handleDelete}
          >
            Delete User Profile
          </button>
          <button
            style={{ padding: '5px', margin: '5px', backgroundColor: 'beige' }}
            onClick={addDataHandler}
          >
            Add Data
          </button>
          <button
            style={{ padding: '5px', margin: '5px', backgroundColor: 'beige' }}
            onClick={removeDataHandler}
          >
            Remove Data
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
