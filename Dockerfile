# Dockerfile (tag: v3)
FROM node:latest

# Install dependencies from package.json
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

# Deploy app in /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN npm run build

# Start the server
ENV NODE_ENV=production
ENV PORT=3030
CMD npm run start
EXPOSE 3030