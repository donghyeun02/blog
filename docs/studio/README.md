# 스튜디오 도면

`/studio`는 네이버 클라우드 아이콘으로 구성도·ERD·흐름도를 그리는 편집기다. 블로그 글의 도면도
같은 렌더러를 읽기 전용으로 써서, 글 안에서 흐름·단계 재생이 움직인다.

## 아이콘

```bash
python3 docs/studio/build_icons.py "<서비스 아이콘 및 활용예시 PPTX 경로>"
npx prettier --write src/components/studio/icons.ts
```

PPTX(zip)의 슬라이드 XML에서 그림 좌표와 그 아래 글상자 좌표를 대조해 이름을, 슬라이드 제목을
카테고리로 삼는다. 뒤쪽 활용예시 슬라이드는 같은 아이콘이 반복돼 뺀다. 카탈로그에 없는 인터넷
구름은 옛 아이콘 폴더(`NCP_ICONS` → `~/Desktop/ncp-icons` → `~/Downloads/ncp-icons`)에서 보충한다.

- 결과: `public/studio/icons/*.png`, `src/components/studio/icons.ts`
- 출처: 네이버 클라우드 「서비스 아이콘 및 활용 예시」(2025.02.17), © NAVER Cloud Corp. 편집기 팔레트와
  아이콘을 쓴 글 속 도면의 왼쪽 아래에 출처를 표시한다.

## 새 도면 예시

```bash
python3 docs/studio/build_examples.py
```

「서비스 아이콘 및 활용 예시」 PPTX 20~23쪽의 활용 예시 네 장(Auto Scaling 가용성 확보,
E-Commerce 소규모, Hybrid Cloud Hosting, IoT Analysis Platform)을 편집기의 '새 도면' 예시로 옮긴다.
슬라이드 좌표를 2.5배로 키워 쓰고, 슬라이드 그림은 스튜디오 아이콘과 모양으로 대조해 골랐다.
카탈로그에 없는 것(Users, IDS·IPS·WAF, Kafka, Spark, Cassandra, 결제 대행 등)은 상자로 둔다.

- 결과: `src/components/studio/examples/*.json` (`templates.ts`가 불러온다)

## 글에 들어가는 도면

```bash
python3 docs/studio/build_docs.py
```

도면은 코드로 만든다. 편집기에서 끌어다 만들면 좌표와 id가 매번 바뀌어 diff를 읽을 수 없어서다.
스크립트가 `public/studio/docs/<id>.json`을 쓰고, 도형 크기를 어림해 가로÷세로 비율을 출력한다.
글에는 그 비율을 넣는다.

```mdx
import StudioDiagram from '@/components/studio/StudioDiagram';

<StudioDiagram doc="day1" ratio={1.709} caption="1일차 구성도 — …" />
```

- 비율 상자로 자리를 먼저 잡아 불러와도 글이 밀리지 않는다.
- 화면 600px 앞에 왔을 때 React Flow 청크를 받고, 화면 밖이면 재생을 멈춘다.
- 휠·드래그·핀치는 페이지 스크롤에 양보한다.
- 단계 번호가 있는 도면은 `단계` 재생으로, 없으면 `흐름`으로 시작한다.
- `스튜디오에서 열기`는 `/studio?open=<id>`로 가서 이 브라우저에 사본을 만든다.

### 선 표현

| data | 뜻 |
| --- | --- |
| `step` | 단계 재생 순서. 같은 번호는 함께 흐른다 |
| `animated` | 흐름 재생 때 패킷이 지나간다 |
| `blocked` | 도중에 막힌다. 빨간 점선 + ✕, 패킷이 가운데서 사라진다 |
| `dashed` | 점선 (응답, 복제 같은 보조 경로) |
| `cardinality` | ERD 관계 `1:1` `1:N` `N:M`. 화살촉 대신 끝에 표기 |

핸들은 네 변에 `source`로만 두고 `ConnectionMode.Loose`로 target처럼 쓴다. 편집기와 뷰어가 둘 다
느슨한 모드여야 선이 이어진다.
