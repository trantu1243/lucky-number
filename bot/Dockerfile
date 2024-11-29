FROM node:alpine

RUN mkdir -p /usr/src/lucky-number && chown -R node:node /usr/src/lucky-number

WORKDIR /usr/src/lucky-number

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 80

CMD ["yarn", "start"]