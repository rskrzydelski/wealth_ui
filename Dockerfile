# base image
FROM node:alpine

# create and set working directory
RUN mkdir /wealthy_ui
WORKDIR /wealthy_ui

ENV PATH /wealthy_ui/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /wealthy_ui
COPY yarn.lock /wealthy_ui

RUN yarn install

# copy current directory code to working directory
COPY . /wealthy_ui

# start app
CMD ["yarn", "run", "start"]
