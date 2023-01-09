FROM node:18

WORKDIR /bot

COPY . /bot/

RUN npm install
CMD ["npm", "run", "start"]
