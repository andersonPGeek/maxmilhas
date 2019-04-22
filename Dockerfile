FROM node:8.11.3

ENV HOME=/usr/src/app

COPY package*.json ${HOME}/node_docker/

WORKDIR ${HOME}/node_docker

RUN npm install --silent --progress=false

COPY . ${HOME}/node_docker

EXPOSE 3000

CMD [ "npm", "start" ]
