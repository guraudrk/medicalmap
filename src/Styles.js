import styled from 'styled-components';
import img from './map3icon.jpg'

export const Background = styled.div`
  img src={img} alt="의료대동여지도"
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #FFFFFF;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;