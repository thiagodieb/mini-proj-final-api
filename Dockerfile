FROM node

RUN mkdir -p /opt/project/

WORKDIR /opt/project/

COPY app/dist /opt/project/
COPY app/node_modules /opt/project/node_modules

RUN npm i -g pm2@latest

CMD ["pm2", "start", "main.js","--no-daemon"]
