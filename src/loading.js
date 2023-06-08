// Loading.js
import React from 'react';
import {Background, LoadingText} from './Styles';
import Spinner from './Spinner-1s-200px.gif'

export default () => {
  return (
    <Background>
      <LoadingText>10만개의 데이터가 로딩중입니다. 잠시만 기다려주세요!</LoadingText>
      <img src={Spinner} alt="의료대동여지도가 로딩중입니다!" width="5%" />
      </Background>
  );
};

