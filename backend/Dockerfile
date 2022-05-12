# syntax=docker/dockerfile:1
FROM python:3.9.12-slim

WORKDIR /usr/src/app
# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update && apt-get install -y netcat

# install dependencies
COPY ./requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt


COPY . /usr/src/app/

# EXPOSE 5000
