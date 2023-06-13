FROM nginx:1.25.0-alpine

WORKDIR /usr/src/app

COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/

RUN ls
RUN pwd

RUN rm /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
