FROM node:16
ENV NODE_ENV=production

WORKDIR .

COPY ["package.json", "."]
COPY ["package-lock.json*", "."]

RUN npm install --production

COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]