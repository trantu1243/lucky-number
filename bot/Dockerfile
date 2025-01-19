FROM node:alpine

RUN mkdir -p /usr/src/lucky-number && chown -R node:node /usr/src/lucky-number

WORKDIR /usr/src/lucky-number

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

# Set the timezone to the UK (GMT or BST)
ENV TZ=Europe/London

USER root
RUN sed -i 's|http://mirror.cs.uchicago.edu/alpine|https://dl-cdn.alpinelinux.org/alpine|g' /etc/apk/repositories \
    && apk update
RUN apk add --no-cache tzdata \
    && ln -sf /usr/share/zoneinfo/Europe/London /etc/localtime \
    && echo "Europe/London" > /etc/timezone \
    && apk del --purge tzdata

USER node

EXPOSE 80

CMD ["yarn", "start"]