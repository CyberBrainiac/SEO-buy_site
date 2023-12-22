import React, { FormEvent } from 'react';
import style from './linkInsertion.module.scss';
// import { ButtonCommon } from '@/components/buttons/Buttons';

const LinkInsertion: React.FC = () => {
  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    let inputKeyword = formData.get('request') as string;
    inputKeyword = inputKeyword.trim();

    if (!inputKeyword) {
      alert('Empty request detected');
      return;
    }

    //Note: The limit on the length of the search request should be within 2048 characters.
    if (inputKeyword.length > 2000) {
      alert('too many words');
      return null;
    }
    // const request = `intitle:"${inputKeyword}"`;
    // dispatch(setRequestIndexThematicity(request));
  }

  return (
    <section className='linkInsertion'>
      <div className={style.container}>
      <form onSubmit={formHandler} className={style.form}>
          <div className={style.formContainer}>
            <label htmlFor="ThemIndRequest">Write keyword or theme</label>
            <input
              id="ThemIndRequest"
              name="request"
              type="text"
              className={style.formInput}
              placeholder="koala"
              required
            />
            <button type='submit'>Submit</button>
            {/* <ButtonCommon
              className={toolStatus === toolStatusValues.Working ? style.formBtn_active : ''}
              type="submit"
              text={
                toolStatus === toolStatusValues.Working
                  ? 'Index Is Calculated'
                  : 'Get Thematicity Index'
              }
            /> */}
          </div>
        </form>

        <div className={style.showTopResult}>

        </div>
      </div>
    </section>
  );
};

export default LinkInsertion;
