import React from 'react';
import style from './messages.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectInformMessage, setInformMessage } from '@/containers/reducers/userSlice';

const Messages: React.FC = () => {
  const showInform = useSelector(selectInformMessage);
  const dispatch = useDispatch();
  const messageStyle = showInform
    ? `${style.container} ${style.container_active}`
    : style.container;

  if (showInform) {
    setTimeout(() => {
      dispatch(setInformMessage(undefined));
    }, 3000);
  }

  return <div className={messageStyle}>{showInform}</div>;
};

export default Messages;
