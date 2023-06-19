# WeatherApp
날씨 앱 개발을 위한 공유 저장소

2조
오태호: 2019243117
최효신: 2019243018
황창희: 2021243043

<오픈소스 프로젝트 작업일지>
1. 날씨정보 받아오기
- OpenWeather API이용.
- 회원가입후 API키 생성.
- API키를 이용하여 현재위치의 날씨정보 호출하여 화면상에 출력하는 기능 -> 구현

2. 로컬맵 
- expo-location 라이브러리 이용하여 사용자의 현재위치 좌표데이터 수신
- 로컬맵 상에 지역별로 마커 생성.
- 마커 내에 그 지역의 현재 날씨상태 출력 -> 구현

3. 알람설정
- react-native-modal-datetime-picker 컴포넌트 이용하여 캘린더나 시계를 통해 원하는 날짜와 시간을 설정가능
- 설정한 알람 삭제 또는 수정 기능 추가
- 설정한 알람시간에 알림메시지 -> 현재 미구현

4. 탭바 구현
- 탭바를 통해 화면전환 가능
- 홈 화면 하단에 탭바 구현 -> 구현

5. 지역 검색 기능
- 검색창 구현
- 검색창에 지역이름 입력시 해당 지역의 지도를 통한 시각정보와 함께 날씨정보 제공 -> 구현

6. UI 디자인 
- 이미지 추가를 통한 날씨정보 시각화 -> 구현
- 스크롤바 구현 -> 구현
- 로컬맵 상단에 검색창 추가 -> 코드병합 완료
- 앱 실행 시 시작화면 추가
