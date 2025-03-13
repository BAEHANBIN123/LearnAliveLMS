# LearnAliveLMS 프로젝트

## 프로젝트 소개
LearnAliveLMS는 역할별 권한 부여, 공지사항 관리, 교수자 관리 등을 구현한 학습 관리 시스템(LMS)입니다. 아래와 같은 기능들을 제공합니다.

### 주요 기능
- **로그인 관리**: 관리자, 교수자, 학습자 역할에 따른 권한 부여
- **관리자 권한**:
  - 교수자 생성, 수정, 삭제
  - 공지사항 생성, 수정, 삭제
- **교수자 권한**:
  - 강의실 추가
  - 수강생 관리 (타 팀원 담당 부분 매핑까지 구현)

---

## 첫 화면 (Admin 계정으로 로그인 후)
- **Header**: `교수자 관리` 버튼이 표시됩니다.
- **Body**: 공지사항 박스에 `공지사항 관리` 버튼이 표시됩니다.
- 공지사항 관리 버튼을 클릭하면, 공지사항을 관리할 수 있는 페이지로 이동합니다.

![Admin 로그인 후 공지사항 관리 버튼](https://github.com/user-attachments/assets/60d93799-a120-404e-b34d-5f6ede53a3b1)

---

## 공지사항 관리
### 공지사항 생성
공지사항 관리 페이지에서 새로운 공지사항을 생성할 수 있습니다. 생성한 공지사항은 메인 화면에 즉시 반영됩니다.

![공지사항 생성](https://github.com/user-attachments/assets/4ce28336-da10-4ee3-8d9e-b490759388ec)

---

### 공지사항 수정
공지사항을 수정하고 `수정` 버튼을 클릭하면 웹에 바로 수정된 내용이 적용됩니다.

![공지사항 수정](https://github.com/user-attachments/assets/efa4d3bd-9630-45de-a8aa-6e46cbc79cfc)

---

### 공지사항 삭제
공지사항을 삭제하고 `삭제` 버튼을 클릭하면 웹에서 바로 삭제됩니다.

![공지사항 삭제](https://github.com/user-attachments/assets/b37141d9-c03e-47f5-bfba-3b61d9fb96fe)

---

## 공지사항 보기
메인화면에서 원하는 공지사항을 클릭하면, 해당 공지사항의 내용을 확인할 수 있는 페이지로 이동합니다.

![공지사항 클릭](https://github.com/user-attachments/assets/a0715a6b-cfe6-4c72-bf89-a03b6fcfcc49)

---

## 설치 및 실행
1. **프로젝트 클론**
   ```bash
   git clone <repository-url>
