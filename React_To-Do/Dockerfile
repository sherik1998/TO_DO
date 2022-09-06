FROM node:16.14.0-alpine
# PLATFORM: linux/arm64
WORKDIR /frontApp

COPY . .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]
