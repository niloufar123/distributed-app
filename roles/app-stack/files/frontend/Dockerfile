FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install -D tailwindcss postcss autoprefixer
RUN npx tailwindcss init -p
COPY . ./
RUN npm start