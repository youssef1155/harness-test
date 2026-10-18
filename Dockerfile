FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY app.js ./
COPY test.js ./
EXPOSE 3000
CMD ["npm", "start"]
