FROM node:16

ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

WORKDIR /.

COPY ["package.json", "."]
COPY ["package-lock.json*", "."]

RUN npm install --production

COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]