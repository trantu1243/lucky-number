FROM node:alpine

RUN mkdir -p /usr/src/lucky-number && chown -R node:node /usr/src/lucky-number

WORKDIR /usr/src/lucky-number

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

# Set the timezone to the UK (GMT or BST)
ENV TZ=Europe/London

# Install tzdata to set the timezone
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Europe/London /etc/localtime \
    && echo "Europe/London" > /etc/timezone \
    && apk del tzdata

EXPOSE 80

CMD ["yarn", "start"]