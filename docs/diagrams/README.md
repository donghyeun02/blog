# 구성도 생성

네이버 클라우드 심화 과정 회고 4편에 들어가는 SVG 구성도를 만드는 스크립트.

## 스타일

일차별 4장(day1~4)은 네이버 클라우드 공식 레퍼런스 아키텍처의 시각 언어를 따른다 —
아이콘 위 라벨 아래, 개별 테두리 없음, VPC는 파란 점선, 그룹은 얇은 회색 상자.
공용 좌표와 프리미티브는 `ncpstyle.py`에 있다.

제목과 각주는 그리되 viewBox에서 잘라내 화면에 안 보이게 한다(`top_cut`·`bot_cut`).
글에 이미 제목과 본문이 있어서 도면이 그걸 반복할 이유가 없다.

설명용 8장(net-*, ssh-hang, scrape-path, docker-isolated, k3s-split, stack*)은
`narrow.py`의 단순한 상자 스타일을 쓴다.

## 크기

글 폭(752px)에 맞춰 그린다. 확대·축소하지 않고 그대로 들어가야 도면 안 글씨가
읽히기 때문이다. 세로는 필요한 만큼 길어져도 된다.
공용 좌표와 헬퍼는 `narrow.py`에 있다.

## 쓰는 법

```bash
python3 day1.py          # public/diagrams용 SVG를 이 폴더에 생성
./shot.sh day1.svg day1.png   # 눈으로 확인 (Chrome 헤드리스)
cp day*.svg ../../public/diagrams/
```

## 아이콘

네이버 클라우드 공식 "서비스 아이콘 및 활용예시" PPTX에서 뽑아
`~/Downloads/ncp-icons/`에 이름을 붙여 둔 PNG를 base64로 SVG 안에 넣는다.
PPTX는 zip이라 `ppt/media`에 PNG가 들어 있고, 슬라이드 XML의 아이콘 좌표와
라벨 좌표를 대조해 이름을 알아냈다.

`lib.py`가 아이콘 경로를 참조하므로 폴더가 없으면 생성이 실패한다.

## 값의 출처

리소스 이름·대역·포트는 강의 자료(P02·P07·P08·P12·P27~P29)에서 대조한 값이다.
