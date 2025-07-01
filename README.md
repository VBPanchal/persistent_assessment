# Assessment: AI-Powered Payment Gateway & Subscription Service

## 👤 Author
**VB Panchal**  
📧 mr.vb.panchal@gmail.com

---

## 🚀 Project Overview

**Assessment** is a TypeScript-based backend service built with Node.js, Express, and Prisma ORM. It integrates:

- 💳 **Stripe** for payment processing
- 🧠 **OpenAI GPT-3.5** for fraud explanations & campaign summaries
- 🛠 **PostgreSQL** as the database
- 🐳 **Docker** & `docker-compose` for easy local setup

---

## 🧠 Key Features

- **/charge** endpoint that:
  - Evaluates fraud score using heuristics
  - Blocks high-risk transactions (risk ≥ 0.5)
  - Uses OpenAI to generate human-readable explanations
  - Routes payment to Stripe if safe

- **/subscriptions** endpoint that:
  - Creates donation subscriptions
  - Summarizes campaign description with LLM
  - Schedules monthly billing jobs
  - Cancels subscriptions by donor ID

---

## 📦 Tech Stack

| Layer        | Technology                     |
|--------------|---------------------------------|
| Language     | TypeScript                     |
| Server       | Node.js + Express              |
| Database     | PostgreSQL + Prisma ORM        |
| AI/LLM       | OpenAI GPT-3.5                 |
| Payments     | Stripe                         |
| Infrastructure | Docker + Docker Compose     |

---

## 📁 Project Structure

```
.
├── prisma/               # Prisma DB schema
├── src/
│   ├── api/              # REST endpoints
│   ├── services/         # LLM, fraud, payment, Prisma
│   ├── jobs/             # Recurring billing job
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

## ⚙️ Setup Guide

### 🔧 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Node.js v18+ (for development use)
- OpenAI API Key (from https://platform.openai.com/)
- Stripe Test API Key (from https://dashboard.stripe.com/test/apikeys)

---

### 📥 Clone and Configure

```bash
git clone <your-repo-url> assessment
cd assessment
cp .env.example .env
```

---

### 🐳 Start the Project

```bash
docker-compose up --build
```

Once up, access:
- API: http://localhost:3000

---

## 🔌 API Endpoints

### `POST /charge`

```json
{
  "amount": 1500,
  "email": "test@example.ru",
  "source": "tok_visa"
}
```

Returns a transaction or blocks with explanation from GPT.

---

### `POST /subscriptions`

```json
{
  "donorId": "abc123",
  "email": "john@example.com",
  "amount": 500,
  "currency": "USD",
  "interval": "monthly",
  "campaignDescription": "Help build clean water access in remote areas"
}
```

Returns a new subscription with GPT-generated summary and tags.

---

### `DELETE /subscriptions/:donorId`

Deletes the user's active subscription.

---

## 🧠 OpenAI LLM Integration

Used for:
- Explaining fraud detection logic
- Summarizing donation campaigns
- Generating tags from campaign text

---

## 💳 Stripe Integration (Test)

Use test card: `4242 4242 4242 4242`, any future expiry, any 3-digit CVC

Test token (direct): `tok_visa`

---

## 🧪 Prisma CLI

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

---

## 🧾 Sample `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/mydb"
OPENAI_API_KEY=sk-demo-xxxxx
OPENAI_MODEL=gpt-3.5-turbo
STRIPE_SECRET_KEY=
```

---

## 🛑 .gitignore (Recommended)

```gitignore
node_modules/
dist/
.env
*.log
.prisma/
dev.db
dev.db-journal
.vscode/
.idea/
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋 Support

For queries, contact **mr.vb.panchal@gmail.com**
