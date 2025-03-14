# LearnAliveLMS 프로젝트

## 📌 프로젝트 소개
LearnAliveLMS는 역할별 권한 부여, 공지사항 관리, 교수자 관리 등을 구현한 학습 관리 시스템(LMS)입니다. 사용자의 역할에 따라 접근 권한을 다르게 설정하며, 관리자 기능을 포함하여 강의 및 공지사항을 효과적으로 관리할 수 있도록 설계되었습니다.

---

## 🔑 주요 기능
### ✅ 로그인 및 세션 관리
- 관리자, 교수자, 학습자 역할별 로그인 및 세션 관리
- **BCrypt를 이용한 ID/PW 찾기 기능 (구현 중)**

### **🛠 관리자 기능**
- **교수자 관리**: 교수자 추가, 수정, 삭제 기능 구현 (Front-End, Back-End, Database)
- **공지사항 관리**: 공지사항 생성, 수정, 삭제 기능 구현 (Front-End, Back-End, Database)

### ✅ 교수자 권한
- 강의실 추가
- 수강생 관리 (타 팀원 담당 부분 매핑까지 구현)

---

## **💻 프로젝트 주요 화면**

### 📌 첫 화면 (Admin 계정으로 로그인 후)
- **Header**: `교수자 관리` 버튼이 표시됨
- **Body**: 공지사항 박스에 `공지사항 관리` 버튼 표시
- 공지사항 관리 버튼 클릭 시, 공지사항 관리 페이지로 이동

![Admin 로그인 후 공지사항](https://github.com/user-attachments/assets/60d93799-a120-404e-b34d-5f6ede53a3b1)

---
## 📢 공지사항 관리

### 📝 공지사항 생성
공지사항 관리 페이지에서 새로운 공지사항을 생성할 수 있습니다. 생성된 공지사항은 메인 화면에 즉시 반영됩니다.

![공지사항 생성](https://github.com/user-attachments/assets/c6c85066-13ce-4641-9432-b7829a2a6cea)


### 🛠 공지사항 수정
공지사항을 수정하고 `수정` 버튼 클릭 시 변경 사항이 반영됩니다.

![공지사항 수정](https://github.com/user-attachments/assets/efa4d3bd-9630-45de-a8aa-6e46cbc79cfc)

### 🗑 공지사항 삭제
공지사항을 선택 후 `삭제` 버튼 클릭 시 해당 공지사항이 삭제됩니다.
![공지사항 삭제](https://github.com/user-attachments/assets/7b879266-ac91-4b4e-ad63-1523d3ce5bc3)


## 👨‍🏫 교수자 관리

### 교수자 추가
- 교수자 정보를 입력 후 `생성` 버튼을 클릭하면 교수자가 추가됩니다.
![교수자 생성](https://github.com/user-attachments/assets/4024452a-38cc-4c63-ba45-f5252efc2d10)


### 교수자 정보 수정
- 선택한 교수자의 정보를 수정하고 `수정` 버튼을 클릭하면 정보가 업데이트됩니다.

![교수자 수정](https://github.com/user-attachments/assets/51298bbe-f377-4321-ac6c-1abeb6376f98)

### 교수자 삭제
- 특정 교수자를 선택한 후 `삭제` 버튼을 클릭하면 교수자 정보가 삭제됩니다.

![교수자 삭제](https://github.com/user-attachments/assets/dbfec7ad-aff6-47a3-a325-ca8ab66b50bd)

---

## 메인 기술 스택
- **Frontend**: React, Vite
- **Backend**: Spring Boot, Spring Framework
- **Database**: MySQL
- **Authentication**: BCrypt를 이용한 ID/PW 찾기 및 보안

## 담당 역할
- **로그인/로그아웃 세션 관리**: 관리자, 교수자, 학습자 역할별 관리
- **관리자 기능**:
  - 교수자 추가/수정/삭제 (Front-End, Back-End, Database)
  - 공지사항 생성, 수정, 삭제 기능 (Front-End, Back-End, Database)
- **회원 정보 찾기**: BCrypt를 활용한 아이디 및 비밀번호 찾기 기능 (구현 중)


## 📌 기타
- **팀원 역할 분배**: 관리자, 교수자, 학생별 역할 구분 및 기능 개발
- **프로젝트 일정**: 지속 업데이트 예정
