FROM node:16.14.0-alpine
# PLATFORM: linux/arm64
WORKDIR /backApp

COPY . .

RUN yarn global add nestjs

RUN yarn 

VOLUME [ "/backApp" ]

EXPOSE 8000

CMD [ "yarn", "start" ]
