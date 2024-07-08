# LikeLion12th_FE_SessionServer
멋쟁이 사자처럼 12기 프론트엔드 세션용 API 서버

#### BASE_URL : https://gominzipsession.o-r.kr/
- 24.05.23
   - `AWS EC2 연결 및 무중단 배포` 
- 24.05.24
   - `Cerbot + Let's Encrypt로 TLS 인증서 발급`
   - `https로 변경`
- 24.07.03
  - `AWS 프리티어 만료 전 배포 중단`

### /lionlist `GET`

#### Query Parameters
파라미터 없을 시 전체 리스트 반환함

| Name | Description |
| --- | --- |
| page (number, query) | 페이지네이션 (0: 모든 아기사자, 1~6: 아기사자 5명씩) |
| gender (string, query) | 아기사자의 성별 (male / female) |
| part (string, query) | 아기사자의 파트 (pm / design / frontend / backend) |

ex) `/lionlist?part=frontend&gender=male`

#### Response

```json
[
    {
        "name": "김ㅇㅇ",
        "gender": "male",
        "part": "frontend",
        "major": "소프트웨어학부"
    },
    {
        "name": "변ㅇㅇ",
        "gender": "male",
        "part": "frontend",
        "major": "소프트웨어학부"
    },
    {
        "name": "이ㅇㅇ",
        "gender": "male",
        "part": "frontend",
        "major": "소프트웨어학부"
    }
]
```

### /liontest/question `GET`

#### Response

```json
{
    "questions": [
        {
            "id": 1,
            "question": "멋쟁이 사자처럼의 (전)대표는 누구일까요?",
            "choices": [
                "1. 이두희",
                "2. 이두목",
                "3. 레인보우 지숙"
            ]
        },
        {
            "id": 2,
            "question": "12기 회장 최재영님의 인스타 아이디는 무엇일까요?",
            "choices": [
                "1. zza_1ng",
                "2. zza_lng",
                "3. zza_Ing"
            ]
        },
    ...
  ]
}
```



### /liontest/result `POST`

#### Request Body
사용자가 선택한 선지의 번호 (1~3)를 순서대로 담은 배열

첫 번째 선지의 번호가 0이 아닌 1임에 주의해주세요
```json
{
    "answers": [2, 2, 2, 3, 2]
}
```

#### Response

```json
{
    "correctCount": 3,
}
```

### /liontest/result/{correctCount} `GET`

#### URL Parameter
채점 결과로 나온 정답 개수(correctCount)를 넣어주세요.

ex) `/liontest/result/2`

#### Response

```json
{
    "resultImg": "https://gominzipsession.o-r.kr/images/result1.png",
    "resultTitle": "아직 응애사자 🐱"
}
```

#### Response Fail `400`
불가능한 정답 개수로 요청을 보냈을 시 반환됩니다

```json
{
	"message":"잘못된 번호입니다."
}
```
