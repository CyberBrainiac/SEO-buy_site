import style from './header.module.scss';

function Header() {
  function handleClick() {
    console.log('Click event');
    return null;
  }

  return (
    <header className={style.container}>
      <div className={style.blok1}>
        <div className={style.blok1_item}></div>
      </div>
      <div className={style.blok2}></div>
      <div className={style.container_smallGreen}></div>
      <div className={style.blok3}></div>
      <button onClick={handleClick}>Click</button>
    </header>
  );
}

export default Header;
