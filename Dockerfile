# FROM node:18-alpine

# WORKDIR /usr/src/app

# # Copy all files from the current directory to the container
# COPY . .

# # Install project dependencies
# RUN yarn install

# # Build the project
# RUN yarn build

# # Expose the app port
# EXPOSE 5173

# RUN ["chmod", "+x", "./entrypoint.sh"]

# ENTRYPOINT [ "sh", "./entrypoint.sh" ]

#new 

FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the files
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Make entrypoint executable
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["sh", "./entrypoint.sh"]
