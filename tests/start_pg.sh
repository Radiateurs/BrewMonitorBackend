#!/bin/bash

if grep -q Microsoft /proc/version; then
  echo "Windows Subsystem for Linux"
  docker.exe stop db
  docker.exe rm db
  docker.exe run --name db -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -e POSTGRES_DB=beer-monitor -d -p 5432:5432 postgres:11.8
else
  echo "Native Linux"
  docker stop db
  docker rm db
  docker run --name db -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -e POSTGRES_DB=beer-monitor -d -p 5432:5432 postgres:11.8
fi
