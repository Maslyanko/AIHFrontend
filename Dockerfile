# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_OIDC_AUTHORITY
ARG VITE_OIDC_CLIENT_ID
ARG VITE_OIDC_REDIRECT_URI
ARG VITE_OIDC_SCOPE
ARG VITE_BACKEND_API

ENV VITE_OIDC_AUTHORITY=$VITE_OIDC_AUTHORITY
ENV VITE_OIDC_CLIENT_ID=$VITE_OIDC_CLIENT_ID
ENV VITE_OIDC_REDIRECT_URI=$VITE_OIDC_REDIRECT_URI
ENV VITE_OIDC_SCOPE=$VITE_OIDC_SCOPE
ENV VITE_BACKEND_API=$VITE_BACKEND_API

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- runtime stage ---
FROM nginx:alpine AS runtime
ENV BACKEND_API="http://backend:8080"
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.d/99-envsubst.sh
RUN chmod +x /docker-entrypoint.d/99-envsubst.sh
EXPOSE 80
CMD ["/docker-entrypoint.sh", "nginx", "-g", "daemon off;"]
