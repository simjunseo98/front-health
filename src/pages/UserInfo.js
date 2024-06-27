import React from 'react';

const UserInfo = ({ onEditClick }) => {
    return (
        <div>
            <h2>사용자 정보</h2>
            <p>여기에 사용자의 정보를 보여줍니다. 예를 들어:</p>
            {/* 사용자 정보를 출력하는 부분 */}
            <p>이름: 홍길동</p>
            <p>이메일: hong@example.com</p>
            <p>주소: 서울시 강남구</p>
            <p>나이: 30세</p>
            <p>전화번호: 010-1234-5678</p>

            <button onClick={onEditClick}>정보 수정</button>
        </div>
    );
};

export default UserInfo;
