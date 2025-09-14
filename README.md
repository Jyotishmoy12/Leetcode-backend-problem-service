# LeetCode Clone

A full-stack coding platform that allows users to solve algorithmic problems and get real-time code evaluation in multiple programming languages.

![System Architecture]
<img width="1078" height="796" alt="design" src="https://github.com/user-attachments/assets/ce239267-63c5-412b-92d2-bfaca3ade153" />


Here's a better way to write that for GitHub:

## System Architecture

This system consists of three main services that work together to handle code problem creation, submission, and evaluation:

### Service Flow

1. **Problem Service** - Creates and manages coding problems
2. **Submission Service** - Handles code submissions from users
3. **Evaluation Service** - Processes and evaluates submitted code

### Evaluation Pipeline

When a code submission is made, the following process occurs:

1. The **Submission Service** queues the submission using **Redis** for asynchronous processing
2. The **Evaluation Service** pulls the submission from the Redis queue
3. Based on the programming language (for our case it's C++ and Python) , the appropriate **Docker image** is pulled
4. A new **Docker container** is created from the pulled image
5. The submitted code is executed inside the isolated container environment
6. Results are processed with proper input output correctness and then returned

### Technology Stack

- **Redis**: Message queue for handling submission requests
- **Docker**: Containerization for secure code execution
- **Multi-language support**: Dynamic Docker image selection based on programming language

## ✨ Features

### Problem Management

- ✅ Create, read, update, and delete coding problems
- ✅ Support for multiple difficulty levels (Easy, Medium, Hard)
- ✅ Rich problem descriptions with Markdown support
- ✅ Custom test cases for each problem
- ✅ Search problems by title and filter by difficulty

### Code Submission & Evaluation

- ✅ Multi-language support (Python, C++)
- ✅ Real-time code execution in secure Docker containers
- ✅ Automatic test case evaluation with detailed results
- ✅ Submission status tracking (Pending → Completed)
- ✅ Test case results: AC (Accepted), WA (Wrong Answer), TLE (Time Limit Exceeded)

### Infrastructure

- ✅ Scalable microservices architecture
- ✅ Asynchronous processing with Redis queues using bullmq
- ✅ Container-based code execution for security
- ✅ Comprehensive logging using winston and proper error handling
- ✅ Request correlation tracking across services

## 🚀 Quick Start

### Prerequisites

- Docker
- Node.js 18+
- MongoDB
- Redis

## 📡 API Endpoints

### Problem Service (Port 3000)

- `POST /api/v1/problems` - Create a new problem
- `GET /api/v1/problems` - Get all problems
- `GET /api/v1/problems/:id` - Get problem by ID
- `PUT /api/v1/problems/:id` - Update problem
- `DELETE /api/v1/problems/:id` - Delete problem

### Submission Service (Port 3001)

- `POST /api/v1/submissions` - Submit code for evaluation
- `GET /api/v1/submissions/:id` - Get submission details
- `GET /api/v1/submissions/problem/:id` - Get submissions for a problem

### Evaluation Service (Port 3002)

- Background worker service that processes submission queue
- Communicates with Submission Service for status updates

## 🛠️ Technology Stack

**Backend:**

- Node.js with Express.js
- TypeScript for type safety
- MongoDB with Mongoose ODM
- Redis for message queuing
- Docker for containerized code execution
- Winston for logging
- Zod for validation

**Infrastructure:**

- Docker & Docker Compose
- BullMQ for job processing
- Microservices architecture

## 📊 Supported Languages

- **Python** - 2 second timeout
- **C++** - 1 second timeout

## 📝 Example Usage

1. **Create a Problem:**

   ```bash
   curl -X POST http://localhost:3000/api/v1/problems \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Two Sum",
       "description": "Find two numbers that add up to target",
       "difficulty": "easy",
       "testCases": [
         {"input": "[2,7,11,15]\n9", "output": "[0,1]"}
       ]
     }'
   ```

2. **Submit Code:**

   ```bash
   curl -X POST http://localhost:3001/api/v1/submissions \
     -H "Content-Type: application/json" \
     -d '{
       "problemId": "problem_id_here",
       "code": "def two_sum(nums, target): ...",
       "language": "python"
     }'
   ```

## 🏁 Development

- Each service follows clean architecture principles
- Comprehensive error handling and validation
- Structured logging with correlation IDs
- Type-safe development with TypeScript

---

