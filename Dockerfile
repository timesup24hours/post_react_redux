FROM node

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# Cache npm dependencies
COPY package.json /app/
RUN npm install --global node-gyp node-pre-gyp
RUN npm install --verbose

# Copy application files
COPY . /app

# build bundle
CMD ["npm", "run", "build"]

# set evn var
ENV NODE_ENV production

# Precompile javascript
RUN node_modules/.bin/babel server --out-dir lib

EXPOSE 4000

# run
CMD ["node", "lib/index.js"]
