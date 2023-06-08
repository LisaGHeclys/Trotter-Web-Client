FROM node:lts-alpine

# RUN apk add --update nodejs npm

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
