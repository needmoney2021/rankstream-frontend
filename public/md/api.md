# RankStream API 문서

RankStream API를 통해 회원 트리, 주문 데이터, 실적 정보 등을 연동할 수 있습니다.

## 인증

모든 API 요청에는 인증이 필요합니다. HTTP 헤더에 API 키를 포함해야 합니다:

```
Authorization: Bearer YOUR_API_KEY
```

## 베이스 URL

모든 API 요청의 기본 URL은 다음과 같습니다:

```
https://api.rankstream.com/v1
```

## 회원 트리 API

### 회원 목록 조회

```
GET /members
```

#### 응답 예시

```json
{
  "members": [
    {
      "id": "12345",
      "name": "홍길동",
      "email": "hong@example.com",
      "joinDate": "2023-01-15",
      "rank": "플래티넘",
      "parentId": null,
      "children": [
        "67890",
        "13579"
      ]
    },
    ...
  ]
}
```

### 특정 회원 정보 조회

```
GET /members/{memberId}
```

## 주문 및 실적 API

### 주문 목록 조회

```
GET /orders
```

#### 매개변수

| 이름        | 타입     | 설명                    |
|-----------|--------|-----------------------|
| startDate | string | 조회 시작 날짜 (YYYY-MM-DD) |
| endDate   | string | 조회 종료 날짜 (YYYY-MM-DD) |
| memberId  | string | 특정 회원의 주문만 조회 (선택)    |

### 실적 요약 조회

```
GET /performance
```

#### 매개변수

| 이름       | 타입     | 설명                                  |
|----------|--------|-------------------------------------|
| period   | string | 기간 (daily, weekly, monthly, yearly) |
| memberId | string | 특정 회원의 실적만 조회 (선택)                  |

## 포인트 및 보상 API

### 포인트 잔액 조회

```
GET /points/{memberId}
```

### 포인트 이력 조회

```
GET /points/{memberId}/history
```

## 웹훅 (Webhook)

주문, 회원가입, 등급 변경 등의 이벤트가 발생할 때 알림을 받을 수 있습니다:

```
POST /webhooks
```

## 에러 코드

| 코드  | 설명           |
|-----|--------------|
| 400 | 잘못된 요청       |
| 401 | 인증 실패        |
| 403 | 권한 부족        |
| 404 | 리소스를 찾을 수 없음 |
| 429 | 요청 한도 초과     |
| 500 | 서버 오류        |

자세한 구현 방법은 [GitHub 예제 저장소](https://github.com/rankstream/api-examples)를 참조하세요. 
