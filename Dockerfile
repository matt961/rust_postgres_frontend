FROM alpine

RUN apk update
RUN apk add nodejs npm

RUN npm install -g serve

WORKDIR /var/www/
COPY app/ .

EXPOSE 80

CMD serve -l tcp://0.0.0.0:80
