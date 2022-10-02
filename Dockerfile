FROM node:14-alpine

# Setup app directory
WORKDIR /home/node/app/backend
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .

RUN npm run build
ENTRYPOINT ["npm", "start", "--"]

EXPOSE 3000
CMD ["node", "."]