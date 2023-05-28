FROM node:20-bullseye-slim
WORKDIR /data_api
COPY . .
RUN npm i && npm install -g mongoose
EXPOSE 7001 
CMD npm start