# Node.js를 기반으로 하는 기본 이미지 선택
FROM node:14

# 작업 디렉토리 설정
WORKDIR /app

# package.json 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY .. .

# 애플리케이션을 빌드
RUN npm run build

# Nginx 웹 서버 이미지를 기반으로 생성
FROM nginx:1.21

# 빌드된 React 애플리케이션을 Nginx로 복사
COPY --from=0 /app/build /usr/share/nginx/html