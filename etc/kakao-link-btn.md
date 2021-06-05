# 카카오톡 연동 방법

1. 업체 카톡 계정(아이디, 이메일, 비밀번호)을 받는다.
2. https://developers.kakao.com 접속한다.
3. 받은 계정으로 로그인한다.
4. 약관 동의와 개발자 등록을 한다.
    - 이름과 회사는 업체이름으로 작성
5. 내 애플리케이션 -> 애플리케이션 추가하기
6. 앱설정 -> 플랫폼에서 web 등록
　  
　  
## 공유버튼 추가하기
[카카오링크 샘플코드](https://developers.kakao.com/tool/demo/message/kakaolink)  
구현 방법 부분에서 옵션 선택 후 하단에 코드 사용  

[메세지 템플릿 샘플보기](https://developers.kakao.com/docs/latest/ko/message/message-template#content)  
피드, 리스트, 위치, 커머스, 텍스트 중 사용할 템플릿 선택하기

1. 템플릿 선택
2. 템플릿에 맞는 샘플코드 가져오기
3. 업체 내용에 맞게 코드 수정
4. **script코드 시작부분**에 `Kakao.init('JavaScript 키');` 추가하기  
    - https://developers.kakao.com 로그인 후 내 애플리케이션 앱설정 요약정보에서 앱 키 확인
5. `<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>` 추가하기