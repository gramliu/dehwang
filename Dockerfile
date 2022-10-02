FROM node:14-alpine

# Setup app directory
WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm install
COPY ./backend .

RUN npm run build
ENTRYPOINT ["npm", "start", "--"]

EXPOSE 3000
CMD ["node", "."]