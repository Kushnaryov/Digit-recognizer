Docker:
    build:
        docker build -t react-frontend .
    run:
        docker run --env-file ./.env -v $(pwd)/src:/frontend/src -d -p 3000:3000 --name react-app react-frontend
    kill:
        docker rm react-frontend -f