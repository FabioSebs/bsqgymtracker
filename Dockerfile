FROM node:alpine

WORKDIR /frontend

COPY ./package.json /frontend/

RUN yarn

COPY . /frontend/

EXPOSE 3000

CMD ["yarn", "dev"]