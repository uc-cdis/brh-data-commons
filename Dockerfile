# docker build -t brhff .
# docker run -p 3000:3000 -it brhff
# Build stage
FROM node:20-slim AS builder

ARG NEXT_PUBLIC_PORTAL_BASENAME

WORKDIR /gen3

COPY ./package.json ./package-lock.json ./next.config.js ./tsconfig.json ./.env.development  ./tailwind.config.js ./postcss.config.js ./start.sh ./
RUN npm ci
COPY ./src ./src
COPY ./public ./public
COPY ./config ./config
RUN npm install @swc/core @napi-rs/magic-string && \
    npm run build

# Production stage
FROM node:20-slim AS runner

WORKDIR /gen3

RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=builder --chown=nextjs:nextjs /gen3/start.sh ./
COPY --from=builder --chown=nextjs:nextjs /gen3/config ./config
COPY --from=builder --chown=nextjs:nextjs /gen3/public ./public
COPY --from=builder --chown=nextjs:nextjs /gen3/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /gen3/.next/static ./.next/static

ENV PORT=3000
CMD bash ./start.sh
