FROM mysql:8.0

# Copy initialization scripts
COPY ./scripts /docker-entrypoint-initdb.d/

# Expose MySQL default port
EXPOSE 3306