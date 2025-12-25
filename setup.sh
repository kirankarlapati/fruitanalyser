#!/bin/bash

# FoodFresh - Setup Script for macOS/Linux
# Make this file executable: chmod +x setup.sh
# Run: ./setup.sh

echo "================================================"
echo "    FoodFresh - Setup Script"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Checking prerequisites...${NC}"

# Check Node.js
if command -v node &> /dev/null
then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js is not installed. Please install from https://nodejs.org/${NC}"
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null
then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓ Python installed: $PYTHON_VERSION${NC}"
else
    echo -e "${RED}✗ Python is not installed. Please install from https://python.org/${NC}"
    exit 1
fi

# Check MongoDB
if pgrep -x "mongod" > /dev/null
then
    echo -e "${GREEN}✓ MongoDB is running${NC}"
else
    echo -e "${YELLOW}! MongoDB is not running. Please start it:${NC}"
    echo -e "${CYAN}  sudo systemctl start mongod${NC}"
fi

echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"

# Install root dependencies
echo -e "${CYAN}Installing root dependencies...${NC}"
npm install

# Install backend dependencies
echo -e "${CYAN}Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

# Install frontend dependencies
echo -e "${CYAN}Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

# Install ML service dependencies
echo -e "${CYAN}Installing ML service dependencies...${NC}"
cd ml-service
python3 -m pip install -r requirements.txt
cd ..

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}    Setup Complete!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${YELLOW}To start the application, run:${NC}"
echo -e "${CYAN}  npm run dev${NC}"
echo ""
echo -e "${YELLOW}Or start services individually:${NC}"
echo -e "${CYAN}  Terminal 1: cd ml-service && python3 app.py${NC}"
echo -e "${CYAN}  Terminal 2: cd backend && npm run dev${NC}"
echo -e "${CYAN}  Terminal 3: cd frontend && npm start${NC}"
echo ""
echo -e "${YELLOW}Access the application at:${NC}"
echo -e "${CYAN}  Frontend:  http://localhost:3000${NC}"
echo -e "${CYAN}  Backend:   http://localhost:5000${NC}"
echo -e "${CYAN}  ML Service: http://localhost:5001${NC}"
echo ""
