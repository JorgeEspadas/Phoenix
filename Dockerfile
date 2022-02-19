FROM node:14-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm install -g serve
RUN npm run build
EXPOSE 8080
CMD serve -s build -l 8080