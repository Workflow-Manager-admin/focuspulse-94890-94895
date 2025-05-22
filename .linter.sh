#!/bin/bash
cd /home/kavia/workspace/code-generation/focuspulse-94890-94895/focuspulse
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

