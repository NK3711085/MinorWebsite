FROM node:18


RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt || true

COPY . .

EXPOSE 3000


CMD ["node", "server.js"]
