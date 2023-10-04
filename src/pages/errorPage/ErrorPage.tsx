import React, { useCallback, useState } from 'react';
// import style from './errorPage.module.scss';
// import { Link } from 'react-router-dom';

// interface ChildComponentProps {
//   onClick: () => void;
// }

// const ErrorPage: React.FC = () => {
//   console.log('--------------------------------------ErrorPage render');
//   const [count, setCount] = useState(0);
//   const [isReRender, setReRender] = useState(false);

//   const handleClick = useCallback(() => {
//     console.log('ChildHandler', count);
//   }, [count]);

//   return (
//     <section className={style.container}>
//       <div className={style.message}>
//         <p>404 page not found (</p>
//       </div>
//       <Link to="/">
//         <div className={style.linkButton}>Go back</div>
//       </Link>

//       <div>
//         <button onClick={() => setCount(prevVal => ++prevVal)}>INCREMENT VALUE</button>
//         <ChildComponent onClick={handleClick} />
//       </div>
//       <div>
//         <button
//           onClick={() => {
//             setReRender(prevV => !prevV);
//           }}
//         >
//           ReRender {`<${isReRender}>`} Error Page
//         </button>
//       </div>
//     </section>
//   );
// };

// const ChildComponent: React.FC<ChildComponentProps> = ({ onClick }) => {
//   console.log('ChildComponent render');
//   // onClick();
//   return <button onClick={onClick}>This is child button</button>;
// };

// export default ErrorPage;




interface MyCompProps {
  handleClick: () => void;
}

const ErrorPage = () => {
  const [count, setCount] = useState(0);
  const [fatherCount, setFatherCount] = useState(0);
  console.log('----------------------------------Father render');

  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
    console.log('Button Clicked! New count:', count);
  }, [count]);

  const fatherHandler = () => {
    setFatherCount(prevFatherCount => prevFatherCount + 1);
  };

  return (
    <div>
      <button onClick={fatherHandler}>Re-render Father {fatherCount}</button>
      <p>Value: {count}</p>
      <MyComp handleClick={handleClick} />
    </div>
  );
};

const MyComp: React.FC<MyCompProps> = React.memo(({ handleClick }) => {
  console.log('MyComp render');
  return <button onClick={handleClick}>Click me</button>;
});
MyComp.displayName = 'MyComp';

export default ErrorPage;
