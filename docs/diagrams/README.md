# 구성도 생성

네이버 클라우드 심화 과정 회고 4편에 들어가는 SVG 구성도를 만드는 스크립트.

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
