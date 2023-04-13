# Base image used  
FROM node:alpine 
COPY ./ ./
# Install project dependencies
RUN npm install 
RUN npm install express -- save
RUN npm install pg -- save
EXPOSE 8000
# Running default command
CMD ["npm", "start"]