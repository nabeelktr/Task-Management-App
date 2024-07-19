FROM node:alpine

WORKDIR /usr/src/app

COPY ./client/package*.json ./

RUN npm install

COPY ./client ./

RUN npm run build

COPY ./client/.next ./.next

EXPOSE 4000

CMD ["npm", "start"]
