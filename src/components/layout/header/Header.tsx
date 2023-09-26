import style from './header.module.scss';

function Header() {
  return (
    <header>
      <div className={style.container}>
        <div className={style.blok1}>
          <div className={style.blok1_item}></div>
        </div>
        <div className={style.blok2}></div>
        <div className={style.container_smallGreen}></div>
        <div className={style.blok3}></div>
      </div>
    </header>
  );
}

export default Header;
