#!/bin/bash
echo "=== Testing /plain ==="
curl -s http://localhost:3333/plain
echo -e "\n"

echo "=== Testing /unhandled-false ==="
curl -s http://localhost:3333/unhandled-false
echo -e "\n"

echo "=== Testing /create-error ==="
curl -s http://localhost:3333/create-error
echo -e "\n"

echo "Check server terminal for [h3] [unhandled] logs"
