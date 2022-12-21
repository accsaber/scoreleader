FROM jarredsumner/bun:edge as build
WORKDIR /app
COPY ["package.json", "bun.lockb", "./"]
COPY src /app/src
RUN bun install
# RUN bun bun src/entry.ts

# FROM jarredsumner/bun:edge
# WORKDIR /app
# COPY --from=build /app/src /app/src
# COPY --from=build /app/node_modules.bun /app

# ENV NODE_ENV=production

CMD [ "bun", "/app/src/entry.ts" ]