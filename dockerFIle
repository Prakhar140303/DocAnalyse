
FROM node:20

RUN apt-get update && apt-get install -y poppler-utils

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY backend ./backend
COPY frontend ./frontend

RUN npm install --prefix backend

RUN npm install --prefix frontend
RUN npm run build --prefix frontend

EXPOSE 5000

CMD ["npm", "run", "start", "--prefix", "backend"]
