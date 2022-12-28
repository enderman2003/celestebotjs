FROM node:16

WORKDIR ./bot

COPY ./ ./bot/

RUN npm install
CMD npm run start
