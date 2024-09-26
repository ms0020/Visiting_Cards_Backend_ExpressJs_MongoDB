FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY model ./model

COPY . .

EXPOSE 8080

CMD ["npm", "start"]