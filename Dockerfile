FROM node:16

WORKDIR ./bot

COPY ./ ./bot/

RUN npm run build
CMD npm run start
