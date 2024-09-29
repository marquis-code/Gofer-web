FROM node:20-alpine as node-base
# FROM node:18.17.1-alpine3.17 as node-base

RUN apk add --no-cache git

#USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm
ENV PATH=$PATH:/home/node/.npm/bin

RUN mkdir -p  "${HOME}/app" \
              "${NPM_CONFIG_PREFIX}/bin"

RUN printf  "Node version %s, npm version %s, yarn version %s\n\n" \
            "$(node -v)" "$(npm -v)" "$(yarn -v)"

WORKDIR /app
#COPY --chown=node:node . .
COPY . .
RUN yarn install
RUN yarn run build

#FROM dependencies as development
#USER node
EXPOSE 3000
CMD ["yarn", "start"]
