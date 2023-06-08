FROM node:lts-alpine

# RUN apk add --update nodejs npm

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci

ARG TEST1
ARG TEST2
ARG TEST3
ENV REACT_APP_MAPBOX_TOKEN=$TEST1
ENV REACT_APP_OTM_KEY=$TEST2
ENV REACT_APP_SERVER_URI=$TEST3

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
