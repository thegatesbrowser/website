#!/bin/bash

export PORT=8002

pkill next-server
nohup npm start &
