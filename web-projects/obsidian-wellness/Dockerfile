FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

FROM node:20-alpine AS runner
LABEL org.opencontainers.image.title="obsidian-wellness"
LABEL org.opencontainers.image.description="app project from Joffre AI OS workspace"
LABEL org.opencontainers.image.authors="Joffre Elpre <techstylebyjoffre@gmail.com>"
LABEL org.opencontainers.image.source="local:/Users/user/Documents/New project/obsidian-wellness"
LABEL com.joffre.project.category="app"
LABEL com.joffre.project.labels="javascript,netlify,joffre-ai-os"
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["sh", "-lc", "npm run preview -- --host 0.0.0.0 --port 4173"]
