FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

FROM node:20-alpine AS runner
LABEL org.opencontainers.image.title="lumina-client-portal"
LABEL org.opencontainers.image.description="creative-web project from Joffre AI OS workspace"
LABEL org.opencontainers.image.authors="Joffre Elpre <techstylebyjoffre@gmail.com>"
LABEL org.opencontainers.image.source="local:/Users/user/lumina-portal"
LABEL com.joffre.project.category="creative-web"
LABEL com.joffre.project.labels="creative-tech,portfolio,website,javascript,netlify,joffre-ai-os"
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 8888
CMD ["sh", "-lc", "npm run start"]
