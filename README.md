프로젝트 제목:의료 대동여지도 

이 웹사이트는 전국에 있는 10만개의 모든 약국,병원의 데이터를 추출하여 몽고디비에 저장 한 뒤  그것을 서버에서 받아온 뒤, 마커로 변환하여 위치 정보 및 여러가지 데이터를 보여주는 웹 사이트입니다.

사용 기술:react,express,mongoDB,카카오 지도 api,node.js,html,css,javascript,공공데이터(CSV 파일),jquery cdn(url을 통해서 제이쿼리를 쓸 수 있게 하는 기능),chat GPT(모르는 코드를 물어볼 때),styled-components,react-spinner
프록시,cors,nodemon(서버 부분 수정 시 서버를 다시 실행하지 않아도 되는 기능을 가짐.) 등 여러가지 리엑트,노드 관련 플러그인들


프로젝트 구현 방법


1.리엑트를 통해 프로젝트를 진행.

2.npm install을 통해 기본적인 것을 설치하고 npm run start를 통해 localhost:3000번에서 시작.
그런 다음 npm run build를 통해 나중에 운영체제에 배포를 위한 설계를 마침.

3.kakao api를 통해 지도 데이터 불러옴.

4.LOCALDATA에서 데이터를 가져와서 CSV로 저장. 그런 다음 그 CSV 파일을 몽고디비 COMPASS를 이용해 저장.(이 때, 데이터를 csv,utf-8 형식으로 저장해야 한다.)
저장 시 이름,경도,위도,주소,전화번호,웹 사이트 등 필수적인 정보를 제외하고는 다 저장하지 않는다.

5.저장된 데이터들을 불러옴.(이 때 데이터를 중간과정에서 잘 처리하기 위해 body-parser를 활용한다.)
(이 때, nodejs를 react와 연동한다.)
서버에 데이터를 불러온 다음 프론트엔드에서 데이터를 사용하고 보여준다. 이 때, 동기/비동기를 잘 설정해야 논리 오류를 줄일 수 있다.
그런 다음, 서버와 프론트를 동시에 켤 수 있도록 설정해준다.(npm run dev 명령어 사용.)

6.마커를 위한 CSS를 설정함.(인포윈도우 등)
7.현재 위치, 검색 기능(제이쿼리의 keydown, 카카오맵 api), 데이터 종류들을 켜고 끄는 기능 등을 구현.
8.길찾기 기능 등 여러가지 부가 기능을 삽입.(교통상황 등)

9.웹 로고 디자인.
10.로딩 화면(STYLED-COMPONENTS,리엑트 로딩 기능 이용),상단 아이콘 꾸미고 고치기
11.github,netlify를 이용해서 효율적으로 배포하기.
12.프로젝트 도중,구현하고 싶은 코드가 있는데 구글링을 통해서도 해결하기 어려우면 chatGPT의 힘을 빌림.


오류 해결기

1.err_connection_refused

-원소켓을 리셋하고 아이피 캐시 플러시를 하면 된다.

그런 다음 dns를 변경하면 된다.

2.데이터를 가져 오는데 엄청나게 오랜 시간이 걸림

-몽고디비의 collection을 16개로 나누고, 그것을 한꺼번에 가져오는 식으로 하니 시간이 대폭 절약됨.(원래 6분->)

3.지도를 확대,축소할 때만 마커가 보이고, 그렇지 않을 때는 마커가 보이지 않는 문제

-마커 데이터를 다 불러온 다음 지도 객체를 선언하여 문제 해결.

이렇게 문제를 해결했을 때, 로딩 시간이 약간 길어지는 문제는 리엑트 로딩 화면 기능을 통해 해결.

프로젝트 기간:2023년 5월 초~6월 초

