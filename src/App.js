import React,{useEffect,useState} from 'react';
import './App.css';
import $ from 'jquery';
import axios from 'axios';
import Loading from './loading';
import logo from './webbanner.jpg';
const {kakao} = window;






function App() {

  const [isLoading,setIsLoading] = React.useState(true);
  //이건 1번하고 말아야 한다. 그래서 숫자 변수를 통해 거시기를 한다..
  var fetchtime = 0;
 

  //데이터를 담을 배열이다.
  

//useEffect를 사용해야 한다고 한다잉.
  useEffect(()=>{

    
    

    //각각의 데이터와 마커,마커를 켜고 끄는 데에 필요한 boolean 변수를 생성한다.
    //boolean의 기본값을 false로 해주고, true로 바뀔 시에는 마커가 보이는 식이다. 
     //1.병원
     let Hospital_arr =[];
     let Hospital_arr_marker=[];
     let HospitalBoolean = false;
     //2.보건
     let Public_Health_arr=[];
     let Public_Health_arr_marker=[];
     let PublicBoolean = false;
     //3.상급종합
     let Tertiary_General_Hospital_arr=[];
     let Tertiary_General_Hospital_arr_marker=[];
     let TertiaryBoolean = false;
     //4.요양병원
     let Nursing_Hospital_arr=[];
     let Nursing_Hospital_arr_marker=[];
     let NursingBoolean = false;
     //5.의원
     let Clinic_arr=[];
     let Clinic_arr_marker=[];
     let ClinicBoolean = false;
     //6.정신병원
     let Mental_Hospital_arr=[];
     let Mental_Hospital_arr_marker=[];
     let MentalBoolean = false;
     //7.조산원
     let Newborn_arr=[];
     let Newborn_arr_marker=[];
     let NewbornBoolean = false;
     //8.종합병원
     let General_hospital_arr=[];
     let General_hospital_arr_marker=[];
     let GeneralBoolean = false;
     //9.치과
     let Dentist_arr=[];
     let Dentist_arr_marker=[];
     let DentistBoolean = false;
     //10.한방병원
     let Korean_Medicine_Hospital_arr=[];
     let Korean_Medicine_Hospital_arr_marker=[];
     let Korean_Medicine_Hospital_Boolean = false;
     //11.한의원
     let Korean_Medicine_arr=[];
     let Korean_Medicine_arr_marker=[];
     let Korean_Medicine_Boolean = false;
     //12.약국
     let Pharmacy_arr=[];
     let Pharmacy_arr_marker=[];
     let PharmacyBoolean = false;

    const fetchData = async () => {
      try {

        setIsLoading(true);//api호출 전에 true로 변경해 로딩화면 띄우기
        const response = await axios.get('http://localhost:5000/api');
        const jsonData = await response.data;
        const data = [jsonData];
      
        //flat을 해줘야 우리가 원하는 형태의 데이터가 된다.
        let Data = data.flat();
        
        
   


        //배열들을 복사하는 코드. 
        Hospital_arr=[...Data[0].collection1];
        Public_Health_arr=[...Data[0].collection2,...Data[0].collection3,...Data[0].collection4,...Data[0].collection15];
        Tertiary_General_Hospital_arr=[...Data[0].collection5];
        Nursing_Hospital_arr=[...Data[0].collection6];
        Clinic_arr=[...Data[0].collection7];
        Mental_Hospital_arr=[...Data[0].collection8];
        Newborn_arr=[...Data[0].collection9];
        General_hospital_arr=[...Data[0].collection10];
        Dentist_arr=[...Data[0].collection11,...Data[0].collection12];
        Korean_Medicine_Hospital_arr=[...Data[0].collection13];
        Korean_Medicine_arr=[...Data[0].collection14];
        Pharmacy_arr=[...Data[0].collection16];
    

 
     var container = document.getElementById('map');
     var options = {
       center: new kakao.maps.LatLng(37.566826, 126.9786567),
       level: 5,
     };
     var map = new kakao.maps.Map(container, options);

     //로딩화면 숨기기
     setIsLoading(false);
      
     
  //마커를 생성하고, 그것을 제어하는 코드.
  //연짱으로 12개가 있으니 코드가 길긴 하다.
  //1.병원
      for (var i = 0; i < Hospital_arr.length; i++) {
        var lat1 = Hospital_arr[i].lat;
        var lng1= Hospital_arr[i].lng;
        var position1 = new kakao.maps.LatLng(lat1, lng1);

        var imageSize1 = new kakao.maps.Size(24, 35);
        var imageSrc1 =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        var markerImage1 = new kakao.maps.MarkerImage(imageSrc1, imageSize1);

        var marker1 = new kakao.maps.Marker({
          position: position1,
          image: markerImage1,
          clickable:true,
        });

        Hospital_arr_marker.push(marker1);
                
      }

      function setHospitalMarkers(map) {
        for (let i = 0; i < Hospital_arr_marker.length; i++) {
          //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
          //Hospital_arr_marker[i].setClickable(true);
          Hospital_arr_marker[i].setMap(map);
        //인포윈도우도 같이 생성한다.
        //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
        var iwContent1 = 
        `<div style="padding:5px;height:220px;width:220px;">
        병원분류:${Hospital_arr[i].code_name}<br>
        이름:${Hospital_arr[i].name}<br>
        주소:${Hospital_arr[i].address}<br>
        전화번호:${Hospital_arr[i].phonenumber}<br>
        위도:${Hospital_arr[i].lat}<br>
        경도:${Hospital_arr[i].lng}<br>
        <button onClick="window.open('https://map.kakao.com/link/to/${Hospital_arr[i].name},${Hospital_arr[i].lat},${Hospital_arr[i].lng}');">길찾기</button>
        </div>`,
        iwRemoveable1 = true;

        let infowindow1 = new kakao.maps.InfoWindow({
          content : iwContent1,
          removable : iwRemoveable1
      })
      // 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener( Hospital_arr_marker[i], 'click', function() {
// 마커 위에 인포윈도우를 표시합니다
infowindow1.open(map,  Hospital_arr_marker[i]);  
});


        }
      }

      //길찾기 버튼을 누를 시 작동하는 함수.
  
      //초기에는 마커가 안보이게 나눠야 한다.
      setHospitalMarkers(null);

      //마커를 켜고 끌 수 있는 함수이다.

      //켜는거

       function HospitalShowMarkers(){
        setHospitalMarkers(map);
  ;


       }

       //끄는거

       function HospitalOffMarkers(){
        setHospitalMarkers(null);
       }

      //여기서 boolean으로 정의했던 변수들이 필요하다.
      //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.


      //버튼을 누르면 상태에 따라 버튼의 text가 바뀐다.
      function OnText1(){
        const element1 = document.getElementById('HospitalarrButton');
        element1.innerText="일반병원 켜기"
        
      }
      function OffText1(){
        const element1 = document.getElementById('HospitalarrButton');
        element1.innerText="일반병원 끄기"
      }

      //제이쿼리를 이용한다.
      $('#HospitalarrButton').on("click",function(){

        if(HospitalBoolean===false)
        {
          
          HospitalShowMarkers();
          //마커를 보여주고, 상태값을 true로 바꾼다.
          HospitalBoolean=true;
          OffText1();
          return;
        }
        if(HospitalBoolean===true)
        {
          HospitalOffMarkers();
          //마커를 끄고, 상태값을 false로 바꾼다.
          //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
          HospitalBoolean=false;
          OnText1();
          return;
        }
        
        
      })



       //2.보건
       for (var i = 0; i < Public_Health_arr.length; i++) {
        var lat2 = Public_Health_arr[i].lat;
        var lng2 = Public_Health_arr[i].lng;
        var position2 = new kakao.maps.LatLng(lat2, lng2);

        var imageSize2 = new kakao.maps.Size(24, 35);
        var imageSrc2 =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        var markerImage2 = new kakao.maps.MarkerImage(imageSrc2, imageSize2);

        var marker2 = new kakao.maps.Marker({
          position: position2,
          image: markerImage2,
          clickable:true,
        });

        Public_Health_arr_marker.push(marker2);
      }

      function setPublic_HealthMarkers(map) {
        for (let i = 0; i < Public_Health_arr_marker.length; i++) {
          //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
          //Hospital_arr_marker[i].setClickable(true);
          Public_Health_arr_marker[i].setMap(map);
        //인포윈도우도 같이 생성한다.
        //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
        var iwContent2 = 
        `<div style="padding:5px;height:220px;width:220px;">
        병원분류:${Public_Health_arr[i].code_name}<br>
        이름:${Public_Health_arr[i].name}<br>
        주소:${Public_Health_arr[i].address}<br>
        전화번호:${Public_Health_arr[i].phonenumber}<br>
        위도:${Public_Health_arr[i].lat}<br>
        경도:${Public_Health_arr[i].lng}<br>
        <button onClick="window.open('https://map.kakao.com/link/to/${Public_Health_arr[i].name},${Public_Health_arr[i].lat},${Public_Health_arr[i].lng}');">길찾기</button>
        </div>`,
        iwRemoveable2 = true;

        let infowindow2 = new kakao.maps.InfoWindow({
          content : iwContent2,
          removable : iwRemoveable2
      })
      // 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener( Public_Health_arr_marker[i], 'click', function() {
// 마커 위에 인포윈도우를 표시합니다
infowindow2.open(map,  Public_Health_arr_marker[i]);  
});
        }
      }

      //초기에는 마커가 안보이게 나눠야 한다.
      setPublic_HealthMarkers(null);

      //마커를 켜고 끌 수 있는 함수이다.

      //켜는거
       function Public_HealthShowMarkers(){
        setPublic_HealthMarkers(map);
       }

       //끄는거

       function Public_HealthOffMarkers(){
        setPublic_HealthMarkers(null);
       }
       function OnText2(){
        const element1 = document.getElementById('PublicHealtharrButton');
        element1.innerText="보건소 켜기"
      }
      function OffText2(){
        const element1 = document.getElementById('PublicHealtharrButton');
        element1.innerText="보건소 끄기"
      }
      //여기서 boolean으로 정의했던 변수들이 필요하다.
      //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.


      //제이쿼리를 이용한다.
      $('#PublicHealtharrButton').on("click",function(){

        if(PublicBoolean===false)
        {
          Public_HealthShowMarkers();
          //마커를 보여주고, 상태값을 true로 바꾼다.
          PublicBoolean=true;
          OffText2();
          return;
        }
        if(PublicBoolean===true)
        {
          Public_HealthOffMarkers();
          //마커를 끄고, 상태값을 false로 바꾼다.
          //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
          PublicBoolean=false;
          OnText2();
          return;
        }
        
        
      })
       //3.상급종합
       for (var i = 0; i < Tertiary_General_Hospital_arr.length; i++) {
        var lat3 = Tertiary_General_Hospital_arr[i].lat;
        var lng3= Tertiary_General_Hospital_arr[i].lng;
        var position3 = new kakao.maps.LatLng(lat3, lng3);

        var imageSize3 = new kakao.maps.Size(24, 35);
        var imageSrc3 =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        var markerImage3 = new kakao.maps.MarkerImage(imageSrc3, imageSize3);

        var marker3 = new kakao.maps.Marker({
          position: position3,
          image: markerImage3,
          clickable:true,
        });

        Tertiary_General_Hospital_arr_marker.push(marker3);
      }

      function setTertiary_General_HospitalMarkers(map) {
        for (let i = 0; i < Tertiary_General_Hospital_arr_marker.length; i++) {
          //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
          //Hospital_arr_marker[i].setClickable(true);
          Tertiary_General_Hospital_arr_marker[i].setMap(map);
        //인포윈도우도 같이 생성한다.
        //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
        var iwContent3 = 
        `<div style="padding:5px;height:220px;width:220px;">
        병원분류:${Tertiary_General_Hospital_arr[i].code_name}<br>
        이름:${Tertiary_General_Hospital_arr[i].name}<br>
        주소:${Tertiary_General_Hospital_arr[i].address}<br>
        전화번호:${Tertiary_General_Hospital_arr[i].phonenumber}<br>
        위도:${Tertiary_General_Hospital_arr[i].lat}<br>
        경도:${Tertiary_General_Hospital_arr[i].lng}<br>
        <button onClick="window.open('https://map.kakao.com/link/to/${Tertiary_General_Hospital_arr[i].name},${Tertiary_General_Hospital_arr[i].lat},${Tertiary_General_Hospital_arr[i].lng}');">길찾기</button>
        </div>`,
        iwRemoveable3 = true;

        let infowindow3 = new kakao.maps.InfoWindow({
          content : iwContent3,
          removable : iwRemoveable3
      })
      // 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener( Tertiary_General_Hospital_arr_marker[i], 'click', function() {
// 마커 위에 인포윈도우를 표시합니다
infowindow3.open(map,  Tertiary_General_Hospital_arr_marker[i]);  
});
        }
      }

      //초기에는 마커가 안보이게 나눠야 한다.
      setTertiary_General_HospitalMarkers(null);

      //마커를 켜고 끌 수 있는 함수이다.

      //켜는거
       function Tertiary_General_HospitalShowMarkers(){
        setTertiary_General_HospitalMarkers(map);
       }

       //끄는거

       function Tertiary_General_HospitalOffMarkers(){
        setTertiary_General_HospitalMarkers(null);
       }

       function OnText3(){
        const element1 = document.getElementById('TertiaryarrButton');
        element1.innerText="상급종합 켜기"
      }
      function OffText3(){
        const element1 = document.getElementById('TertiaryarrButton');
        element1.innerText="상급종합 끄기"
      }

      //여기서 boolean으로 정의했던 변수들이 필요하다.
      //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.


      //제이쿼리를 이용한다.
      $('#TertiaryarrButton').on("click",function(){

        if(TertiaryBoolean===false)
        {
          Tertiary_General_HospitalShowMarkers();
          //마커를 보여주고, 상태값을 true로 바꾼다.
          TertiaryBoolean=true;
          OffText3();
          return;
        }
        if(TertiaryBoolean===true)
        {
          Tertiary_General_HospitalOffMarkers();
          //마커를 끄고, 상태값을 false로 바꾼다.
          //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
          TertiaryBoolean=false;
          OnText3();
          return;
        }
        
        
      })
      
         //4.요양병원
         for (var i = 0; i <  Nursing_Hospital_arr.length; i++) {
          var lat4 =  Nursing_Hospital_arr[i].lat;
          var lng4 =  Nursing_Hospital_arr[i].lng;
          var position4 = new kakao.maps.LatLng(lat4, lng4);
  
          var imageSize4 = new kakao.maps.Size(24, 35);
          var imageSrc4 =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
          var markerImage4 = new kakao.maps.MarkerImage(imageSrc4, imageSize4);
  
          var marker4 = new kakao.maps.Marker({
            position: position4,
            image: markerImage4,
            clickable:true,
          });
  
          Nursing_Hospital_arr_marker.push(marker4);
        }
  
        function setNursing_HospitalMarkers(map) {
          for (let i = 0; i < Nursing_Hospital_arr_marker.length; i++) {
            //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
            //Hospital_arr_marker[i].setClickable(true);
            Nursing_Hospital_arr_marker[i].setMap(map);
          //인포윈도우도 같이 생성한다.
          //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
          var iwContent4 = 
          `<div style="padding:5px;height:220px;width:220px;">
          병원분류:${Nursing_Hospital_arr[i].code_name}<br>
          이름:${Nursing_Hospital_arr[i].name}<br>
          주소:${Nursing_Hospital_arr[i].address}<br>
          전화번호:${Nursing_Hospital_arr[i].phonenumber}<br>
          위도:${Nursing_Hospital_arr[i].lat}<br>
          경도:${Nursing_Hospital_arr[i].lng}<br>
          <button onClick="window.open('https://map.kakao.com/link/to/${Nursing_Hospital_arr[i].name},${Nursing_Hospital_arr[i].lat},${Nursing_Hospital_arr[i].lng}');">길찾기</button>
          </div>`,
          iwRemoveable4 = true;
  
          let infowindow4 = new kakao.maps.InfoWindow({
            content : iwContent4,
            removable : iwRemoveable4
        })
        // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener( Nursing_Hospital_arr_marker[i], 'click', function() {
  // 마커 위에 인포윈도우를 표시합니다
  infowindow4.open(map,  Nursing_Hospital_arr_marker[i]);  
  });
          }
        }
  
        //초기에는 마커가 안보이게 나눠야 한다.
        setNursing_HospitalMarkers(null);
  
        //마커를 켜고 끌 수 있는 함수이다.
  
        //켜는거
         function Nursing_HospitalShowMarkers(){
          setNursing_HospitalMarkers(map);
         }
  
         //끄는거
  
         function Nursing_HospitalOffMarkers(){
          setNursing_HospitalMarkers(null);
         }
  
         function OnText4(){
          const element1 = document.getElementById('NursingarrButton');
          element1.innerText="요양병원 켜기"
        }
        function OffText4(){
          const element1 = document.getElementById('NursingarrButton');
          element1.innerText="요양병원 끄기"
        }
        //여기서 boolean으로 정의했던 변수들이 필요하다.
        //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.
  
  
        //제이쿼리를 이용한다.
        $('#NursingarrButton').on("click",function(){
  
          if(NursingBoolean===false)
          {
            Nursing_HospitalShowMarkers();
            //마커를 보여주고, 상태값을 true로 바꾼다.
            NursingBoolean=true;
            OffText4();
            return;
          }
          if(NursingBoolean===true)
          {
            Nursing_HospitalOffMarkers();
            //마커를 끄고, 상태값을 false로 바꾼다.
            //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
            NursingBoolean=false;
            OnText4();
            return;
          }
          
          
        })

         //5.의원
         for (var i = 0; i <  Clinic_arr.length; i++) {
          var lat5 =  Clinic_arr[i].lat;
          var lng5 =  Clinic_arr[i].lng;
          var position5 = new kakao.maps.LatLng(lat5, lng5);
  
          var imageSize5 = new kakao.maps.Size(24, 35);
          var imageSrc5 =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
          var markerImage5 = new kakao.maps.MarkerImage(imageSrc5, imageSize5);
  
          var marker5 = new kakao.maps.Marker({
            position: position5,
            image: markerImage5,
            clickable:true,
          });
  
          Clinic_arr_marker.push(marker5);
        }
  
        function setClinicMarkers(map) {
          for (let i = 0; i < Clinic_arr_marker.length; i++) {
            //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
            //Hospital_arr_marker[i].setClickable(true);
            Clinic_arr_marker[i].setMap(map);
          //인포윈도우도 같이 생성한다.
          //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
          var iwContent5 = 
          `<div style="padding:5px;height:220px;width:220px;">
          병원분류:${Clinic_arr[i].code_name}<br>
          이름:${Clinic_arr[i].name}<br>
          주소:${Clinic_arr[i].address}<br>
          전화번호:${Clinic_arr[i].phonenumber}<br>
          위도:${Clinic_arr[i].lat}<br>
          경도:${Clinic_arr[i].lng}<br>
          <button onClick="window.open('https://map.kakao.com/link/to/${Clinic_arr[i].name},${Clinic_arr[i].lat},${Clinic_arr[i].lng}');">길찾기</button>
          </div>`,
          iwRemoveable5 = true;
  
          let infowindow5 = new kakao.maps.InfoWindow({
            content : iwContent5,
            removable : iwRemoveable5
        })
        // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener( Clinic_arr_marker[i], 'click', function() {
  // 마커 위에 인포윈도우를 표시합니다
  infowindow5.open(map,  Clinic_arr_marker[i]);  
  });
          }
        }
        //초기에는 마커가 안보이게 나눠야 한다.
        setClinicMarkers(null);
  
        //마커를 켜고 끌 수 있는 함수이다.
  
        //켜는거
         function ClinicShowMarkers(){
          setClinicMarkers(map);
         }
  
         //끄는거
  
         function ClinicOffMarkers(){
          setClinicMarkers(null);
         }
  
         function OnText5(){
          const element1 = document.getElementById('ClinicarrButton');
          element1.innerText="의원 켜기"
        }
        function OffText5(){
          const element1 = document.getElementById('ClinicarrButton');
          element1.innerText="의원 끄기"
        }
        //여기서 boolean으로 정의했던 변수들이 필요하다.
        //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.
  
  
        //제이쿼리를 이용한다.
        $('#ClinicarrButton').on("click",function(){
  
          if(ClinicBoolean===false)
          {
            ClinicShowMarkers();
            //마커를 보여주고, 상태값을 true로 바꾼다.
            ClinicBoolean=true;
            OffText5();
            return;
          }
          if(ClinicBoolean===true)
          {
            ClinicOffMarkers();
            //마커를 끄고, 상태값을 false로 바꾼다.
            //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
            ClinicBoolean=false;
            OnText5();
            return;
          }
          
          
        })

      
         //6.정신병원
         for (var i = 0; i <  Mental_Hospital_arr.length; i++) {
          var lat6 =  Mental_Hospital_arr[i].lat;
          var lng6 =  Mental_Hospital_arr[i].lng;
          var position6 = new kakao.maps.LatLng(lat6, lng6);
  
          var imageSize6 = new kakao.maps.Size(24, 35);
          var imageSrc6 =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
          var markerImage6 = new kakao.maps.MarkerImage(imageSrc6, imageSize6);
  
          var marker6 = new kakao.maps.Marker({
            position: position6,
            image: markerImage6,
            clickable:true,
          });
  
          Mental_Hospital_arr_marker.push(marker6);
        }
  
        function setMental_HospitalMarkers(map) {
          for (let i = 0; i < Mental_Hospital_arr_marker.length; i++) {
            //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
            //Hospital_arr_marker[i].setClickable(true);
            Mental_Hospital_arr_marker[i].setMap(map);
          //인포윈도우도 같이 생성한다.
          //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
          var iwContent6 = 
          `<div style="padding:5px;height:220px;width:220px;">
          병원분류:${Mental_Hospital_arr[i].code_name}<br>
          이름:${Mental_Hospital_arr[i].name}<br>
          주소:${Mental_Hospital_arr[i].address}<br>
          전화번호:${Mental_Hospital_arr[i].phonenumber}<br>
          위도:${Mental_Hospital_arr[i].lat}<br>
          경도:${Mental_Hospital_arr[i].lng}<br>
          <button onClick="window.open('https://map.kakao.com/link/to/${Mental_Hospital_arr[i].name},${Mental_Hospital_arr[i].lat},${Mental_Hospital_arr[i].lng}');">길찾기</button>
          </div>`,
          iwRemoveable6 = true;
  
          let infowindow6 = new kakao.maps.InfoWindow({
            content : iwContent6,
            removable : iwRemoveable6
        })
        // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener( Mental_Hospital_arr_marker[i], 'click', function() {
  // 마커 위에 인포윈도우를 표시합니다
  infowindow6.open(map,  Mental_Hospital_arr_marker[i]);  
  });
          }
        }
  
        //초기에는 마커가 안보이게 나눠야 한다.
        setMental_HospitalMarkers(null);
  
        //마커를 켜고 끌 수 있는 함수이다.
  
        //켜는거
         function Mental_HospitalShowMarkers(){
          setMental_HospitalMarkers(map);
         }
  
         //끄는거
  
         function Mental_HospitalOffMarkers(){
          setMental_HospitalMarkers(null);
         }
  
         function OnText6(){
          const element1 = document.getElementById('MentalHospitalarrButton');
          element1.innerText="정신병원 켜기"
        }
        function OffText6(){
          const element1 = document.getElementById('MentalHospitalarrButton');
          element1.innerText="정신병원 끄기"
        }
        //여기서 boolean으로 정의했던 변수들이 필요하다.
        //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.
  
  
        //제이쿼리를 이용한다.
        $('#MentalHospitalarrButton').on("click",function(){
  
          if(MentalBoolean===false)
          {
            Mental_HospitalShowMarkers();
            //마커를 보여주고, 상태값을 true로 바꾼다.
            MentalBoolean=true;
            OffText6()
            return;
          }
          if(MentalBoolean===true)
          {
            Mental_HospitalOffMarkers();
            //마커를 끄고, 상태값을 false로 바꾼다.
            //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
            MentalBoolean=false;
            OnText6()
            return;
          }
          
          
        })

        
          //7.조산원
          for (var i = 0; i <  Newborn_arr.length; i++) {
            var lat7 =  Newborn_arr[i].lat;
            var lng7 =  Newborn_arr[i].lng;
            var position7 = new kakao.maps.LatLng(lat7, lng7);
    
            var imageSize7 = new kakao.maps.Size(24, 35);
            var imageSrc7 =
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
            var markerImage7 = new kakao.maps.MarkerImage(imageSrc7, imageSize7);
    
            var marker7 = new kakao.maps.Marker({
              position: position7,
              image: markerImage7,
              clickable:true,
            });
    
            Newborn_arr_marker.push(marker7);
          }
    
          function setNewbornMarkers(map) {
            for (let i = 0; i < Newborn_arr_marker.length; i++) {
              //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
              //Hospital_arr_marker[i].setClickable(true);
              Newborn_arr_marker[i].setMap(map);
            //인포윈도우도 같이 생성한다.
            //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
            var iwContent7 = 
            `<div style="padding:5px;height:220px;width:220px;">
            병원분류:${Newborn_arr[i].code_name}<br>
            이름:${Newborn_arr[i].name}<br>
            주소:${Newborn_arr[i].address}<br>
            전화번호:${Newborn_arr[i].phonenumber}<br>
            위도:${Newborn_arr[i].lat}<br>
            경도:${Newborn_arr[i].lng}<br>
            <button onClick="window.open('https://map.kakao.com/link/to/${Newborn_arr[i].name},${Newborn_arr[i].lat},${Newborn_arr[i].lng}');">길찾기</button>
            </div>`,
            iwRemoveable7 = true;
    
            let infowindow7 = new kakao.maps.InfoWindow({
              content : iwContent7,
              removable : iwRemoveable7
          })
          // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener( Newborn_arr_marker[i], 'click', function() {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow7.open(map,  Newborn_arr_marker[i]);  
    });
            }
          }
    
          //초기에는 마커가 안보이게 나눠야 한다.
          setNewbornMarkers(null);
    
          //마커를 켜고 끌 수 있는 함수이다.
    
          //켜는거
           function NewbornShowMarkers(){
            setNewbornMarkers(map);
           }
    
           //끄는거
    
           function NewbornOffMarkers(){
            setNewbornMarkers(null);
           }
           function OnText7(){
            const element1 = document.getElementById('NewbornarrButton');
            element1.innerText="조산원 켜기"
          }
          function OffText7(){
            const element1 = document.getElementById('NewbornarrButton');
            element1.innerText="조산원 끄기"
          }
          //여기서 boolean으로 정의했던 변수들이 필요하다.
          //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.
    
    
          //제이쿼리를 이용한다.
          $('#NewbornarrButton').on("click",function(){
    
            if(NewbornBoolean===false)
            {
              NewbornShowMarkers();
              //마커를 보여주고, 상태값을 true로 바꾼다.
              NewbornBoolean=true;
              OffText7();
              return;
            }
            if(NewbornBoolean===true)
            {
              NewbornOffMarkers();
              //마커를 끄고, 상태값을 false로 바꾼다.
              //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
              NewbornBoolean=false;
              OnText7();
              return;
            }
            
            
          })

          //8.종합병원

          for (var i = 0; i <  General_hospital_arr.length; i++) {
            var lat8 =  General_hospital_arr[i].lat;
            var lng8 =  General_hospital_arr[i].lng;
            var position8 = new kakao.maps.LatLng(lat8, lng8);
    
            var imageSize8 = new kakao.maps.Size(24, 35);
            var imageSrc8 =
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
            var markerImage8 = new kakao.maps.MarkerImage(imageSrc8, imageSize8);
    
            var marker8 = new kakao.maps.Marker({
              position: position8,
              image: markerImage8,
              clickable:true,
            });
    
            General_hospital_arr_marker.push(marker8);
          }
    
          function setGeneral_hospitalMarkers(map) {
            for (let i = 0; i < General_hospital_arr_marker.length; i++) {
              //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
              //Hospital_arr_marker[i].setClickable(true);
              General_hospital_arr_marker[i].setMap(map);
            //인포윈도우도 같이 생성한다.
            //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
            var iwContent8 = 
            `<div style="padding:5px;height:220px;width:220px;">
            병원분류:${General_hospital_arr[i].code_name}<br>
            이름:${General_hospital_arr[i].name}<br>
            주소:${General_hospital_arr[i].address}<br>
            전화번호:${General_hospital_arr[i].phonenumber}<br>
            위도:${General_hospital_arr[i].lat}<br>
            경도:${General_hospital_arr[i].lng}<br>
            <button onClick="window.open('https://map.kakao.com/link/to/${General_hospital_arr[i].name},${General_hospital_arr[i].lat},${General_hospital_arr[i].lng}');">길찾기</button>
            </div>`,
            iwRemoveable8 = true;
    
            let infowindow8 = new kakao.maps.InfoWindow({
              content : iwContent8,
              removable : iwRemoveable8
          })
          // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener( General_hospital_arr_marker[i], 'click', function() {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow8.open(map,  General_hospital_arr_marker[i]);  
    });
            }
          }
          //초기에는 마커가 안보이게 나눠야 한다.
          setGeneral_hospitalMarkers(null);
    
          //마커를 켜고 끌 수 있는 함수이다.
    
          //켜는거
           function General_hospitalShowMarkers(){
            setGeneral_hospitalMarkers(map);
           }
    
           //끄는거
    
           function General_hospitalOffMarkers(){
            setGeneral_hospitalMarkers(null);
           }
           function OnText8(){
            const element1 = document.getElementById('GeneralhospitalarrButton');
            element1.innerText="종합병원 켜기"
          }
          function OffText8(){
            const element1 = document.getElementById('GeneralhospitalarrButton');
            element1.innerText="종합병원 끄기"
          }
          //여기서 boolean으로 정의했던 변수들이 필요하다.
          //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.
    
    
          //제이쿼리를 이용한다.
          $('#GeneralhospitalarrButton').on("click",function(){
    
            if(GeneralBoolean===false)
            {
              General_hospitalShowMarkers();
              //마커를 보여주고, 상태값을 true로 바꾼다.
              GeneralBoolean=true;
              OffText8();
              return;
            }
            if(GeneralBoolean===true)
            {
              General_hospitalOffMarkers();
              //마커를 끄고, 상태값을 false로 바꾼다.
              //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
              GeneralBoolean=false;
              OnText8();
              return;
            }
            
            
          })

          //9.치과

          for (var i = 0; i <  Dentist_arr.length; i++) {
            var lat9 =  Dentist_arr[i].lat;
            var lng9 =  Dentist_arr[i].lng;
            var position9 = new kakao.maps.LatLng(lat9, lng9);
    
            var imageSize9 = new kakao.maps.Size(24, 35);
            var imageSrc9 =
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
            var markerImage9 = new kakao.maps.MarkerImage(imageSrc9, imageSize9);
    
            var marker9 = new kakao.maps.Marker({
              position: position9,
              image: markerImage9,
              clickable:true,
            });
    
            Dentist_arr_marker.push(marker9);
          }
    
          function setDentistMarkers(map) {
            for (let i = 0; i < Dentist_arr_marker.length; i++) {
              //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
              //Hospital_arr_marker[i].setClickable(true);
              Dentist_arr_marker[i].setMap(map);
            //인포윈도우도 같이 생성한다.
            //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
            var iwContent9 = 
            `<div style="padding:5px;height:220px;width:220px;">
            병원분류:${Dentist_arr[i].code_name}<br>
            이름:${Dentist_arr[i].name}<br>
            주소:${Dentist_arr[i].address}<br>
            전화번호:${Dentist_arr[i].phonenumber}<br>
            위도:${Dentist_arr[i].lat}<br>
            경도:${Dentist_arr[i].lng}<br>
            <button onClick="window.open('https://map.kakao.com/link/to/${Dentist_arr[i].name},${Dentist_arr[i].lat},${Dentist_arr[i].lng}');">길찾기</button>
            </div>`,
            iwRemoveable9 = true;
    
            let infowindow9 = new kakao.maps.InfoWindow({
              content : iwContent9,
              removable : iwRemoveable9
          })
          // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener( Dentist_arr_marker[i], 'click', function() {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow9.open(map,  Dentist_arr_marker[i]);  
    });
            }
          }
    
          //초기에는 마커가 안보이게 나눠야 한다.
          setDentistMarkers(null);
    
          //마커를 켜고 끌 수 있는 함수이다.
    
          //켜는거
           function DentistShowMarkers(){
            setDentistMarkers(map);
           }
    
           //끄는거
    
           function DentistOffMarkers(){
            setDentistMarkers(null);
           }
    
           function OnText9(){
            const element1 = document.getElementById('DentistarrButton');
            element1.innerText="치과 켜기"
          }
          function OffText9(){
            const element1 = document.getElementById('DentistarrButton');
            element1.innerText="치과 끄기"
          }
          //여기서 boolean으로 정의했던 변수들이 필요하다.
          //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.
    
    
          //제이쿼리를 이용한다.
          $('#DentistarrButton').on("click",function(){
    
            if(DentistBoolean===false)
            {
              DentistShowMarkers();
              //마커를 보여주고, 상태값을 true로 바꾼다.
              DentistBoolean=true;
              OffText9();
              return;
            }
            if(DentistBoolean===true)
            {
              DentistOffMarkers();
              //마커를 끄고, 상태값을 false로 바꾼다.
              //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
              DentistBoolean=false;
              OnText9();
              return;
            }
            
            
          })

     //10.한방병원

     for (var i = 0; i <  Korean_Medicine_Hospital_arr.length; i++) {
      var lat10 =  Korean_Medicine_Hospital_arr[i].lat;
      var lng10 =  Korean_Medicine_Hospital_arr[i].lng;
      var position10 = new kakao.maps.LatLng(lat10, lng10);

      var imageSize10 = new kakao.maps.Size(24, 35);
      var imageSrc10 =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      var markerImage10 = new kakao.maps.MarkerImage(imageSrc10, imageSize10);

      var marker10 = new kakao.maps.Marker({
        position: position10,
        image: markerImage10,
        clickable:true,
      });

      Korean_Medicine_Hospital_arr_marker.push(marker10);
    }

    function setKorean_Medicine_HospitalMarkers(map) {
      for (let i = 0; i < Korean_Medicine_Hospital_arr_marker.length; i++) {
        //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
        //Hospital_arr_marker[i].setClickable(true);
        Korean_Medicine_Hospital_arr_marker[i].setMap(map);
      //인포윈도우도 같이 생성한다.
      //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
      var iwContent10 = 
      `<div style="padding:5px;height:220px;width:220px;">
      병원분류:${Korean_Medicine_Hospital_arr[i].code_name}<br>
      이름:${Korean_Medicine_Hospital_arr[i].name}<br>
      주소:${Korean_Medicine_Hospital_arr[i].address}<br>
      전화번호:${Korean_Medicine_Hospital_arr[i].phonenumber}<br>
      위도:${Korean_Medicine_Hospital_arr[i].lat}<br>
      경도:${Korean_Medicine_Hospital_arr[i].lng}<br>
      <button onClick="window.open('https://map.kakao.com/link/to/${Korean_Medicine_Hospital_arr[i].name},${Korean_Medicine_Hospital_arr[i].lat},${Korean_Medicine_Hospital_arr[i].lng}');">길찾기</button>
      </div>`,
      iwRemoveable10 = true;

      let infowindow10 = new kakao.maps.InfoWindow({
        content : iwContent10,
        removable : iwRemoveable10
    })
    // 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener( Korean_Medicine_Hospital_arr_marker[i], 'click', function() {
// 마커 위에 인포윈도우를 표시합니다
infowindow10.open(map,  Korean_Medicine_Hospital_arr_marker[i]);  
});
      }
    }

    //초기에는 마커가 안보이게 나눠야 한다.
    setKorean_Medicine_HospitalMarkers(null);

    //마커를 켜고 끌 수 있는 함수이다.

    //켜는거
     function Korean_Medicine_HospitalShowMarkers(){
      setKorean_Medicine_HospitalMarkers(map);
     }

     //끄는거

     function Korean_Medicine_HospitalOffMarkers(){
      setKorean_Medicine_HospitalMarkers(null);
     }

     function OnText10(){
      const element1 = document.getElementById('KoreanMedicinearrButton');
      element1.innerText="한방병원 켜기"
    }
    function OffText10(){
      const element1 = document.getElementById('KoreanMedicinearrButton');
      element1.innerText="힌방병원 끄기"
    }

    //여기서 boolean으로 정의했던 변수들이 필요하다.
    //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.


    //제이쿼리를 이용한다.
    $('#KoreanMedicinearrButton').on("click",function(){

      if(Korean_Medicine_Hospital_Boolean===false)
      {
        Korean_Medicine_HospitalShowMarkers();
        //마커를 보여주고, 상태값을 true로 바꾼다.
        Korean_Medicine_Hospital_Boolean=true;
        OffText10();
        return;
      }
      if(Korean_Medicine_Hospital_Boolean===true)
      {
        Korean_Medicine_HospitalOffMarkers();
        //마커를 끄고, 상태값을 false로 바꾼다.
        //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
        Korean_Medicine_Hospital_Boolean=false;
        OnText10();
        return;
      }
      
      
    })


     //11.한의원

     for (var i = 0; i <  Korean_Medicine_arr.length; i++) {
      var lat11 =  Korean_Medicine_arr[i].lat;
      var lng11 =  Korean_Medicine_arr[i].lng;
      var position11 = new kakao.maps.LatLng(lat11, lng11);

      var imageSize11 = new kakao.maps.Size(24, 35);
      var imageSrc11 =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      var markerImage11 = new kakao.maps.MarkerImage(imageSrc11, imageSize11);

      var marker11 = new kakao.maps.Marker({
        position: position11,
        image: markerImage11,
        clickable:true,
      });

      Korean_Medicine_arr_marker.push(marker11);
    }

    function setKorean_MedicineMarkers(map) {
      for (let i = 0; i < Korean_Medicine_arr_marker.length; i++) {
        //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
        //Hospital_arr_marker[i].setClickable(true);
        Korean_Medicine_arr_marker[i].setMap(map);
      //인포윈도우도 같이 생성한다.
      //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
      var iwContent11 = 
      `<div style="padding:5px;height:220px;width:220px;">
      병원분류:${Korean_Medicine_arr[i].code_name}<br>
      이름:${Korean_Medicine_arr[i].name}<br>
      주소:${Korean_Medicine_arr[i].address}<br>
      전화번호:${Korean_Medicine_arr[i].phonenumber}<br>
      위도:${Korean_Medicine_arr[i].lat}<br>
      경도:${Korean_Medicine_arr[i].lng}<br>
      <button onClick="window.open('https://map.kakao.com/link/to/${Korean_Medicine_arr[i].name},${Korean_Medicine_arr[i].lat},${Korean_Medicine_arr[i].lng}');">길찾기</button>

      </div>`,
      iwRemoveable11 = true;

      let infowindow11 = new kakao.maps.InfoWindow({
        content : iwContent11,
        removable : iwRemoveable11
    })
    // 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener( Korean_Medicine_arr_marker[i], 'click', function() {
// 마커 위에 인포윈도우를 표시합니다
infowindow11.open(map,  Korean_Medicine_arr_marker[i]);  
});
      }
    }

    //초기에는 마커가 안보이게 나눠야 한다.
    setKorean_MedicineMarkers(null);

    //마커를 켜고 끌 수 있는 함수이다.

    //켜는거
     function Korean_MedicineShowMarkers(){
      setKorean_MedicineMarkers(map);
     }

     //끄는거
     function Korean_MedicineOffMarkers(){
      setKorean_MedicineMarkers(null);
     }
     function OnText11(){
      const element1 = document.getElementById('KoreanMedicineArrayButton');
      element1.innerText="한의원 켜기"
    }
    function OffText11(){
      const element1 = document.getElementById('KoreanMedicineArrayButton');
      element1.innerText="한의원 끄기"
    }

    //여기서 boolean으로 정의했던 변수들이 필요하다.
    //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.


    //제이쿼리를 이용한다.
    $('#KoreanMedicineArrayButton').on("click",function(){

      
      if(Korean_Medicine_Boolean===false)
      {
        
        Korean_MedicineShowMarkers();
        //마커를 보여주고, 상태값을 true로 바꾼다.
        Korean_Medicine_Boolean=true;
        OffText11();
        return;
      }
      if(Korean_Medicine_Boolean===true)
      {
        
        Korean_MedicineOffMarkers();
        //마커를 끄고, 상태값을 false로 바꾼다.
        //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
        Korean_Medicine_Boolean=false;
        OnText11();
        return;
      }
      
      
    })

     //12.약국

     
     for (var i = 0; i <  Pharmacy_arr.length; i++) {
      var lat12 =  Pharmacy_arr[i].lat;
      var lng12 =  Pharmacy_arr[i].lng;
      var position12 = new kakao.maps.LatLng(lat12, lng12);

      var imageSize12 = new kakao.maps.Size(24, 35);
      var imageSrc12 =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      var markerImage12 = new kakao.maps.MarkerImage(imageSrc12, imageSize12);

      var marker12 = new kakao.maps.Marker({
        position: position12,
        image: markerImage12,
        clickable:true,
      });

      Pharmacy_arr_marker.push(marker12);
    }

    function setPharmacyMarkers(map) {
      for (let i = 0; i < Pharmacy_arr_marker.length; i++) {
        //마커 클릭 시 다른 지도로 가지 않게 하는 이벤트
        //Hospital_arr_marker[i].setClickable(true);
        Pharmacy_arr_marker[i].setMap(map);
      //인포윈도우도 같이 생성한다.
      //벡틱 내에서 줄이 바뀌면 자동으로 줄이 바뀌여서 표시된다!
      var iwContent12 = 
      `<div style="padding:5px;height:220px;width:220px;">
      병원분류:${Pharmacy_arr[i].code_name}<br>
      이름:${Pharmacy_arr[i].name}<br>
      주소:${Pharmacy_arr[i].address}<br>
      전화번호:${Pharmacy_arr[i].phonenumber}<br>
      위도:${Pharmacy_arr[i].lat}<br>
      경도:${Pharmacy_arr[i].lng}<br>
      <button onClick="window.open('https://map.kakao.com/link/to/${Pharmacy_arr[i].name},${Pharmacy_arr[i].lat},${Pharmacy_arr[i].lng}');">길찾기</button>

      </div>`,
      iwRemoveable12 = true;

      let infowindow12 = new kakao.maps.InfoWindow({
        content : iwContent12,
        removable : iwRemoveable12
    })
    // 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener( Pharmacy_arr_marker[i], 'click', function() {
// 마커 위에 인포윈도우를 표시합니다
infowindow12.open(map,  Pharmacy_arr_marker[i]);  
});
      }
    }

    //초기에는 마커가 안보이게 나눠야 한다.
    setPharmacyMarkers(null);

    //마커를 켜고 끌 수 있는 함수이다.

    //켜는거
     function PharmacyShowMarkers(){
      setPharmacyMarkers(map);
     }

     //끄는거

     function PharmacyOffMarkers(){
      setPharmacyMarkers(null);
     }
     function OnText12(){
      const element1 = document.getElementById('PharmacyarrButton');
      element1.innerText="약국 켜기"
    }
    function OffText12(){
      const element1 = document.getElementById('PharmacyarrButton');
      element1.innerText="약국 끄기"
    }


    //여기서 boolean으로 정의했던 변수들이 필요하다.
    //버튼을 누르면, boolean 값에 따라 버튼이 켜지고 꺼지고 부분이 필요하다.


    //제이쿼리를 이용한다.
    $('#PharmacyarrButton').on("click",function(){

     
      if(PharmacyBoolean===false)
      {
        PharmacyShowMarkers();
        //마커를 보여주고, 상태값을 true로 바꾼다.
        PharmacyBoolean=true;
        OffText12();
        return;
      }
      if(PharmacyBoolean===true)
      {
        PharmacyOffMarkers();
        //마커를 끄고, 상태값을 false로 바꾼다.
        //조금만 잘 생각하면 왜 이렇게 되는지 알것이다.
        PharmacyBoolean=false;
        OnText12();
        return;
      }
      
      
    })

        //카카오의 장소 검색 서비스를 불러온다.
    var ps = new kakao.maps.services.Places();
    //마커 전체를 보관하는 배열을 만든다. 
    //버튼을 눌렀을 때 마커를 지울 수 있다.
    let search_marker=[];
 
 
   
   

    //검색 버튼을 눌렀을 때 장소가 나오게 하는 코드. 제이쿼리를 이용한다.
    
    // 마커를 클릭하면 장소명을 표출할 인포윈도우.
    let infowindow = new kakao.maps.InfoWindow({zIndex:1,removable:true});

    $("#search_input").on("keydown",function(e){
      
      //엔터를 누를 때
      //리엑트는 코드가 node.js와 약간 다르다.
      if(e.key === 'Enter'){
          //현재 검색창에 입력된 값을 content에 담는다.
          let content =$(this).val();
    
          //목적지를 찾는다.
          ps.keywordSearch(content,placeSearchCB);
      }
    })
    
    $("#search_button").on("click",function(e){
     
      let content = $("#search_input").val();
      ps.keywordSearch(content,placeSearchCB);
    })
    
    function placeSearchCB(data,status){
    
     if (status === kakao.maps.services.Status.OK) {

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      var bounds = new kakao.maps.LatLngBounds();

      for (var i=0; i<data.length; i++) {
          displayMarker(data[i]);    
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }       

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
  } 
     
    }

    function displayMarker(place) {
    
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
         map:map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });
      search_marker.push(marker);
     
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          infowindow.open(map, marker);
      });
  }


  //지도에 있는 마커들을 삭제할 제이쿼리.
  $("#delete_marker").on("click",function(e){
      
    for(let i=0;i<search_marker.length;i++){

      search_marker[i].setMap(null);
    }
    
  })
    
    
    
    
    
    /*
    이 부분은 현재 위치를 표시하는 부분이다.
    */ 
    // 지도에 표시된 마커 객체를 가지고 있을 배열이다. 자세히는 현재 위치 마커.
    const markers = [];
      //currentLocation을 클릭 시 동작하는 것을 제이쿼리를 이용해 구현했다.
    
    $("#currentLocation").click(()=>{
    
      
    //setMap을 다 삭제한다.
    for(let i=0;i<markers.length;i++){
      markers[i].setMap(null);
    }
    
    //마커의 배열을 초기화한다. 초기화하지 않으면 마커가 2개 이상이 된다.
    markers.splice(0,markers.length);
    
      if("geolocation" in navigator){
    
        
          navigator.geolocation.getCurrentPosition(function(position){
            //position에 위치 정보가 담겨져 있다.
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
    
    
    
          //이 부분은 현재 위치 마커의 아이콘을 바꾸기 위한 코드.
          var imageSrc = 'https://myfirstmap.s3.ap-northeast-2.amazonaws.com/circle.png'
    var imageSize = new kakao.maps.Size(20,20);
    var imageOption = {offset: new kakao.maps.Point(27, 69)};
    
    //마커의 이미지 정보를 가지고 있는 이미지 생성
    var markerImage = new kakao.maps.MarkerImage(imageSrc,imageSize,imageOption);
    
          //카카오 지도에 쓸 수 있도록 변수를 담아준다.
          const latlng = new kakao.maps.LatLng(lat,lng);
    
         
    
        
          function addMarker(position){
            var marker = new kakao.maps.Marker({
              position: position,
              image:markerImage
            });
    
         
    
    
            //생성된 마커를 배열에 추가한다.
            markers.push(marker);
          };
    
          //마커를 추가한다.
          addMarker(new kakao.maps.LatLng(lat,lng))
    
         
    
          // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수.
    function setMarkers(map) {
    
      for (var i = 0; i < markers.length; i++) {
        //이 부분이 없으면 마커가 추가가 안됨.  
        markers[i].setMap(map);
      }            
    }
    //마커를 맵에 보여준다.
          setMarkers(map);
          //현재 위치로 이동하는 함수
         
          //현재 위치로 이동하는 함수
          //panTo를 쓰면 지도를 부드럽게 이동시킬 수 있다.
        map.setLevel(4);
        //setLevel을 통해 버튼을 눌렀을 때의 일관성을 유지시킨다.
          map.panTo(latlng);
          
          
          });

        
      
          
      }
      else{
          alert("위치 정보를 불러올 수 없습니다.");
      }
        //교통상황 버튼에 쓰는 boolean 함수.
        let TrafficBoolean = false;
        //현재 교통 상황을 확인할 수 있는 버튼.
        $("#currentTraffic").on("click",function(){
          if(TrafficBoolean===false){
            TrafficBoolean=true;
            map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
            
            return;
          }
          if(TrafficBoolean===true){
            TrafficBoolean=false;
            map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);     
            
            return;
          }
        })
    });
    

   


 } catch (error) {
        console.log(error);
      }
    };
    if (fetchtime === 0) {
      fetchData();
      fetchtime++;
    }
   
 
  
  

    

  





  

    },[fetchtime]);


    

  return (
    
 
  <div>
 {isLoading ? <Loading /> : null} 

 

    <div id="map" style={{
      width:"100%",
       height:"100vh",
     
     }}
     >
 

  
   <div id="search">
    <input id="search_input" placeholder="검색어를 입력해주세요"/>
    <button id="delete_marker">검색 마커 삭제</button>
  <button id="search_button">검색</button>
   </div>
   
   <div className="grid-container">
   
   <div id="HospitalarrButton">일반병원 켜기</div>
   <div id="PublicHealtharrButton">보건소 켜기</div>
   <div id="TertiaryarrButton">상급종합 켜기</div>
   <div id="NursingarrButton">요양병원 켜기</div>
   <div id="ClinicarrButton">의원 켜기</div>
   <div id="MentalHospitalarrButton">정신병원 켜기</div>
   <div id="NewbornarrButton">조산원 켜기</div>
   <div id="GeneralhospitalarrButton">종합병원 켜기</div>
   <div id="DentistarrButton">치과 켜기</div>
   <div id="KoreanMedicinearrButton">한방병원 켜기</div>
   <div id="KoreanMedicineArrayButton">한의원 켜기</div>
   <div id="PharmacyarrButton">약국 켜기</div>
   <div id="currentLocation">현재 위치 켜기</div>
   <div id="currentTraffic">교통 상황 켜기/끄기</div>
   </div>
   
  
  

    
     </div>
  
     </div>
   
  );
}

export default App;
