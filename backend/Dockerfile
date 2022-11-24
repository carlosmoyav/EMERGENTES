FROM node
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install --only=production
RUN npm install -g nodemon 
ENV PORT 3000
ENV MONGO_URI mongodb://dbmongo:27017/biblioteca
ENV SECRET_KEY RgUkXp2s5v8y/B?EH+KbPeShVmYq3t6
ENV NODE_ENV production
ENTRYPOINT ["npm","start"]