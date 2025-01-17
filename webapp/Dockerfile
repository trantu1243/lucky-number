FROM node:alpine as builder

RUN mkdir -p /usr/src/lucky-number && chown -R node:node /usr/src/lucky-number

WORKDIR /usr/src/lucky-number

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

# Set the timezone to the UK (GMT or BST)
ENV TZ=Europe/London

# Install tzdata to set the timezone
USER root
RUN apk add --no-cache tzdata \
    && ln -sf /usr/share/zoneinfo/Europe/London /etc/localtime \
    && echo "Europe/London" > /etc/timezone \
    && apk del --purge tzdata

USER node

RUN yarn build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/src/lucky-number/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]