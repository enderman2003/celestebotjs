FROM node:18
WORKDIR /bot/
COPY . /bot/
RUN npm run build
CMD npm run start
