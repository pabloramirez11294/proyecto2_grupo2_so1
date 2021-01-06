FROM node:15

WORKDIR /home/carlos/Proyecto2_Sopes1/src-fe/

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package-lock.json ./
COPY package.json ./

RUN npm install --only=production

# Copy the local code to the container
COPY . .

# Build production app
# RUN npm run Build

# Start the service
CMD npm start